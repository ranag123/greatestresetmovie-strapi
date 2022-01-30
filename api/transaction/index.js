const authUtil = require('../util/auth')
const util = require('../util/util')
const axios = require('axios')
const _ = require('lodash')
const createError = require('http-errors')
const intercept = require('azure-function-log-intercept')
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

// TODO: This file is adapted form Sacrificing Liberty and is a WIP. Remove any unused dependencies when its finished.

const {
  ZYPE_API_BASE_URL,
  ZYPE_PRIVATE_ADMIN_KEY,
  ZYPE_PRIVATE_APP_KEY
} = process.env

const zypeAxios = axios.create({
  baseURL: ZYPE_API_BASE_URL,
  params: {
    app_key: ZYPE_PRIVATE_APP_KEY
  }
})

const zypeAdminAxios = axios.create({
  baseURL: ZYPE_API_BASE_URL,
  params: {
    api_key: ZYPE_PRIVATE_ADMIN_KEY
  }
})

async function createSubscription ({
  coupon = '',
  paymentToken,
  planId,
  uid
}) {
  let subscriptionResponse
  try {
    // https://docs.zype.com/reference#createsubscription-1
    const postData = {
      subscription: {
        consumer_id: uid,
        plan_id: planId,
        stripe_card_token: paymentToken
      }
    }
    // If a coupon code is provided, send it along.
    if (coupon && coupon.length > 0) {
      postData.subscription.coupon_code = coupon
    }
    subscriptionResponse = await zypeAdminAxios.post('/subscriptions', postData, {
      validateStatus: status => {
        // allow a error messages to come back
        return (status >= 200 && status < 300) || status === 422
      }
    })
  } catch (err) {
    console.log('failed to create the zype subscription')
    console.log('ERR:', err.message)
  }

  if (subscriptionResponse.status === 201) {
    const subscription = _.get(subscriptionResponse, 'data.response')
    const subscriptionId = _.get(subscription, '_id', '(MISSING SUBSCRIPTION ID!)')
    console.log(`zype subscription created! Subscription id: ${subscriptionId}`)
    return subscription
  } else {
    throw util.createZypeError(subscriptionResponse)
  }
}

async function createTransaction ({
  paymentToken,
  product,
  productType,
  transactionType,
  uid
}) {
  // the api response does not use the same property
  // for each product type, so use a look-up.
  const pricePropertyOptions = {
    pass: 'amount',
    purchase: 'purchase_price',
    rental: 'rental_price'
  }
  const price = product[pricePropertyOptions[transactionType]]
  const stripePrice = parseFloat(price)
  if (!stripePrice || stripePrice < 1) {
    throw new Error('Price missing or too low.')
  }
  let chargeResponse = null

  try {
    let chargeDescription = 'Sacrificing Liberty Transaction'

    if (_.has(product, 'name')) {
      // only plans have a name and it should be short enough to add to the charge description
      chargeDescription = `${chargeDescription}: ${product.name}`
    }
    console.log('creating the stripe charge...')
    // https://stripe.com/docs/api/charges/create?lang=node
    chargeResponse = await stripe.charges.create({
      amount: stripePrice * 100, // https://stripe.com/docs/api/charges/create?lang=node#create_charge-amount
      currency: 'usd',
      source: paymentToken,
      description: chargeDescription
    })
    // console.log('chargeResponse:', chargeResponse)
  } catch (err) {
    console.log('unable to create the stripe charge!')
    console.log('ERR CODE:', err.code)
    console.log('ERR:', err.message)
    // https://stripe.com/docs/error-codes
    throw new createError.UnprocessableEntity(`Charge failed: code: ${err.code}`)
  }

  if (chargeResponse) {
    console.log('stripe charge created..')
    // create the transaction on zype
    let zypeResponse

    try {
      // https://docs.zype.com/reference#createtransaction-1
      const postData = {
        transaction: {
          stripe_id: chargeResponse.id,
          consumer_id: uid,
          amount: price,
          transaction_type: transactionType
        },
        provider: 'stripe'
      }
      const transactionTypePropertyOptions = {
        pass: 'pass_plan_id',
        playlist: 'playlist_id',
        video: 'video_id'
      }
      // add the product id, for example: postData.transaction.video_id = product._id
      postData.transaction[transactionTypePropertyOptions[productType]] = product._id
      zypeResponse = await zypeAxios.post('/transactions', postData, {
        validateStatus: status => {
          // allow a error messages to come back
          return (status >= 200 && status < 300) || status === 422
        }
      })
    } catch (err) {
      console.log('failed to create the zype transaction')
      console.log('ERR:', err.message)
    }

    if (_.get(zypeResponse, 'status') === 201) {
      const transaction = _.get(zypeResponse, 'data.response')
      const transactionId = _.get(transaction, '_id', '(MISSING TRANSACTION ID!)')
      console.log(`zype transaction created! Transaction id: ${transactionId}`)
      return transaction
    } else {
      // Saw an unexpected response that is not for the user, so not using the createZypeError
      // throw util.createZypeError(zypeResponse)
      console.log('zypeResponse message: ', _.get(zypeResponse, 'data.message'))
      throw new createError.UnprocessableEntity()
    }
  } else {
    console.log('ERR: stripe charge response missing')
    throw new createError.UnprocessableEntity()
  }
}

/**
 * Charges the user based on the provided payment token and creates the entitlement for
 * access to the provided productId.
 *
 * @return {Promise<{headers: *, body: string, status: number}|{headers: {}, body: *, status: *}>}
 *  201: success
 *  404: zype product not found
 *  422: failed
 */
module.exports = async function (context, req) {
  try {
    // TODO: remove this line when we are really using this function.
    throw new createError.NotFound()
    // because: https://github.com/Azure/Azure-Functions/issues/1396
    if (!util.isDev()) intercept(context)

    // =================================================================
    // Make sure the user is authenticated
    // NOTE: this must be in the try block in case Unauthorized is thrown
    // =================================================================

    const me = await authUtil.verifyZypeOAuth(req)

    // =================================================================
    // =================================================================

    const {
      coupon = '',
      paymentToken,
      productId,
      productType,
      transactionType
    } = req.body

    if (!paymentToken || !productId) {
      throw new createError.BadRequest('paymentToken and productId are required.')
    }

    if (coupon && coupon.length > 0 && transactionType !== 'subscription') {
      throw new createError.BadRequest('Coupon codes only allowed with subscriptions.')
    }

    if (!['playlist', 'subscription', 'video'].includes(productType)) {
      throw new createError.BadRequest('Invalid productType.')
    }

    if (!['purchase', 'subscription', 'rental'].includes(transactionType)) {
      throw new createError.BadRequest('Invalid transactionType.')
    }

    const zypeConsumerId = _.get(me, 'zypeConsumerId', false)
    let product = null

    // get the product to verify the price.
    // https://docs.zype.com/reference#getvideo-1
    // https://docs.zype.com/reference#getplan-1
    // https://docs.zype.com/reference#getplaylist
    try {
      const endpointPathOptions = {
        pass: '/plans',
        playlist: '/playlists',
        subscription: '/subscriptions',
        video: '/videos'
      }
      const endpointPath = `${endpointPathOptions[productType]}/${productId}`
      console.log('looking up the zype product to verify its price...')
      const { data } = await zypeAxios.get(endpointPath)
      product = data.response
    } catch (err) {
      console.log('Unable to retrieve the zype product to verify its price!')
      console.log('ERR:', err.message)
      throw new createError.NotFound()
    }

    if (product) {
      let transaction = null

      // only allow the transaction or subscription to occur when the zype product is active.
      if (product.active) {
        if (transactionType === 'subscription') {
          // NOTE: try/catch left off intentionally since createTransaction will throw the response errors as expected.
          transaction = await createSubscription({
            coupon,
            paymentToken,
            planId: productId,
            uid: zypeConsumerId // the signed-in user
          })
        } else {
          // NOTE: try/catch left off intentionally since createTransaction will throw the response errors as expected.
          transaction = await createTransaction({
            paymentToken,
            product,
            productType,
            transactionType,
            uid: zypeConsumerId // the signed-in user
          })
        }

        return {
          status: 201, // created status code
          headers: await util.appendCommonHeaders(req, {}),
          // return info for affiliate tracking.
          body: JSON.stringify({
            transactionType,
            amount: parseFloat(transaction.amount),
            chargeId: transaction.stripe_id
          })
        }
      } else {
        console.log(`ERR: zype product id ${productId} is inactive at this time. Rejecting the transaction.`)
        throw new createError.UnprocessableEntity('Product unavailable at this time.')
      }
    }
  } catch (err) {
    console.log('An error occurred:', err.message)
    return util.getResponseError(err)
  }
}
