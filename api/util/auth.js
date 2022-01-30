const createError = require('http-errors')
const _ = require('lodash')
const axios = require('axios')
const util = require('./util')
const dayjs = require('dayjs')
// const cookie = require('cookie')
const utc = require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone')
// const encryptor = require('simple-encryptor')(process.env.AUTH_COOKIE_ENCRYPT_SECRET_KEY)

const DEFAULT_TIMEZONE = 'America/New_York'

// TODO: This file is adapted form Sacrificing Liberty and is a WIP

// Need to normalize timezones
dayjs.extend(utc)
dayjs.extend(timezone)

const {
  STRAPI_API_BASE_URL,
  ZYPE_API_BASE_URL,
  ZYPE_AUTH_API_BASE_URL,
  // ZYPE_CLIENT_ID,
  // ZYPE_CLIENT_SECRET,
  ZYPE_PRIVATE_ADMIN_KEY,
  ZYPE_PRIVATE_APP_KEY
} = process.env

const strapiAxios = axios.create({
  baseURL: STRAPI_API_BASE_URL
})

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

// const zypeAuthAxios = axios.create({
//   baseURL: ZYPE_AUTH_API_BASE_URL
// })

// Stores the token details use after verifyZypeOAuth has been called.
// let accessTokenDetails = null

const authUtil = {
  /**
   * Gets the signed in strapi end user based on teh Authorization header provided.
   * @param req
   * @return {Promise<null>}
   */
  async getMe (req) {
    const me = null
    try {
      const { data } = await strapiAxios.get('api/users/me', {
        headers: {
          Authorization: req.headers?.Authorization
        },
        params: {
          // Don't refresh the consumer access token as to avoid interfering with the front end state.
          refreshZype: false
        }
      })
      return me
    } catch (err) {
      console.log('getMe: error:', err.message)
    }
    // If we got this far, the user is not authorized.
    throw new createError.Unauthorized()
  },

  /**
   * Looks up the users active playlist entitlements.
   * @param zypeConsumerId The id of the zype consumer to check for.
   * @param type Must be 'playlist' or 'subscription'
   * @return {Promise<*[]>} The latest unexpired entitlement's data.
   */
  async getActiveEntitlements (zypeConsumerId, type) {
    let activeEntitlements = []
    const allowedTypes = ['playlist', 'subscription']
    if (!allowedTypes.includes(type)) {
      throw new Error(`type param missing or invalid type provided: ${type}`)
    }

    let zypeResponse

    if (zypeConsumerId) {
      try {
        // Check pagination just in case.
        let entitlements = []
        let page = 1, totalPages = 1

        // TODO: Refactor this when zype adds the ability to filter by playlist_id an active (ticket url needed here)
        // NOTE:
        // This works for now since we have consumers with only a few
        // entitlements, but if they had many this could be an issue.
        do {
          // console.log(`Fetching page: ${page}`)
          const endpointOptions = {
            playlist: 'playlists',
            subscriptions: 'subscription_entitlements'
          }
          const zypeResponse = await zypeAdminAxios.get(`/consumers/${zypeConsumerId}/${endpointOptions[type]}`, {
            params: {
              page,
              per_page: 100 // Try to avoid multiple calls
            }
          })
          entitlements = entitlements.concat(zypeResponse.data.response)
          page++
          totalPages = _.get(zypeResponse, 'data.pagination.pages', 1)
          // console.log(`Total pages: ${totalPages}`)
        } while (page <= totalPages)

        console.log(`Found ${entitlements.length} entitlements. Checking for actives.`)

        if (entitlements.length > 0) {
          // find the entitlements that are not expired
          activeEntitlements = _.filter(entitlements, function (entitlement) {
            const expiresAt = entitlement.expires_at

            if (expiresAt === null) {
              // this is a purchase, so keep it.
              return true
            }
            // be sure to compare the dates in the same timezone.
            const now = dayjs().tz(DEFAULT_TIMEZONE)

            return dayjs.tz(expiresAt, DEFAULT_TIMEZONE).isAfter(now)
          })
          activeEntitlements = _.orderBy(activeEntitlements, 'expires_at', 'desc')
        }
        console.log(`Found ${activeEntitlements.length} ACTIVE entitlements.`)
      } catch (err) {
        console.log('getActiveEntitlements: error:', err.message)
        throw util.createZypeError(zypeResponse)
      }
    } else {
      // don't error out, but the user won't have the entitlement info.
      console.log('getActiveEntitlements: zypeConsumerId missing...did you provide it on the event object?')
    }
    return activeEntitlements
  },

  // /**
  //  * Looks up the users access token info based on the session cookie in the provided headers.
  //  * @param headers The request headers.
  //  * @param useRefresh If this is true and a refresh_token is found, it will
  //  *                   be used to ask zype to extend the users access time.
  //  *                   This defaults to false.
  //  *                   REMINDER: This creates a new access token and expires the old one!
  //  * @return {Promise<null>} The access token status info from zype.
  //  */
  // async getAuthSessionTokenDetails (headers, useRefresh = false) {
  //   try {
  //     // First grab the refresh_token from the users cookie data.
  //     const cookieHeader = _.get(headers, 'cookie', false)
  //     // console.log('cookieHeader', cookieHeader)
  //
  //     if (cookieHeader) {
  //       // console.log('got the cookie header')
  //       const parsedCookies = cookie.parse(cookieHeader)
  //       // console.log('parsedCookies:', parsedCookies)
  //       const encryptedUserCookie = decodeURIComponent(_.get(parsedCookies, AUTH_COOKIE_NAME, '{}'))
  //       // console.log('encryptedUserCookie:', encryptedUserCookie)
  //       const decryptedTokenDetails = encryptor.decrypt(encryptedUserCookie)
  //       // console.log('details:', decryptedTokenDetails)
  //       if (useRefresh) {
  //         const refreshToken = _.get(decryptedTokenDetails, 'refresh_token', null)
  //         // console.log('refreshToken', refreshToken)
  //         if (refreshToken) {
  //           // Now use the refresh_token to get the access token and its info
  //           // https://docs.zype.com/reference#retrieveaccesstoken-1
  //           const { data: tokenDetails } = await zypeAuthAxios.post('/oauth/token', {}, {
  //             params: {
  //               refresh_token: refreshToken,
  //               client_id: ZYPE_CLIENT_ID,
  //               client_secret: ZYPE_CLIENT_SECRET,
  //               grant_type: 'refresh_token'
  //             }
  //           })
  //           console.log('returning the refreshed token details')
  //           return tokenDetails
  //         }
  //       }
  //       console.log('returning the decrypted token details')
  //       accessTokenDetails = decryptedTokenDetails
  //       return decryptedTokenDetails
  //     } else {
  //       console.log('getAuthSessionTokenDetails: auth cookie not found')
  //     }
  //     return null
  //   } catch (err) {
  //     console.log('getAuthSessionTokenDetails error:', err.message)
  //   }
  // },
  //
  // /**
  //  * Attempts to load the zype consumer data from zype based on current auth info.
  //  * @param req The request
  //  * @param zypeConsumerId Optional zype consumer id. Auth info is checked/used first.
  //  * @return {Promise<Pick<object, never>|null>}
  //  */
  // async getAuthZypeConsumer (req) {
  //   let zypeConsumerId = null
  //   // If no access token details set from a login, attempt to get it from the headers/cookie.
  //   if (!accessTokenDetails) {
  //     accessTokenDetails = await authUtil.getAuthSessionTokenDetails(req.headers)
  //   }
  //
  //   // first try to see if we have token info from a signed in user.
  //   if (accessTokenDetails) {
  //     const accessToken = _.get(accessTokenDetails, 'access_token', false)
  //     console.log('getAuthZypeConsumer: Looking up the zype consumer id...')
  //     const { data: tokenStatus } = await zypeAuthAxios.get('/oauth/token/info', {
  //       params: {
  //         access_token: accessToken
  //       }
  //     })
  //     // console.log('tokenInfo', tokenInfo)
  //     zypeConsumerId = tokenStatus.resource_owner_id
  //   } else {
  //     // If not token info found, the value from the args will be checked.
  //   }
  //
  //   if (zypeConsumerId) {
  //     let zypeConsumer = null
  //     let cleanName = ''
  //     let cleanEmail = ''
  //
  //     try {
  //       console.log('getAuthZypeConsumer: getting the zype consumer data for id: ', zypeConsumerId)
  //       const { data } = await zypeAxios.get(`/consumers/${zypeConsumerId}`)
  //       zypeConsumer = data.response
  //
  //       console.log('getAuthZypeConsumer: found the zype consumer')
  //
  //       // sanitize the display name, just in case.
  //       cleanName = util.cleanupInput(_.get(zypeConsumer, 'name', ''), {
  //         maxLength: 100,
  //         removeBadWords: true
  //       })
  //       cleanEmail = util.cleanupInput(_.get(zypeConsumer, 'email', ''), { maxLength: 254 })
  //     } catch (err) {
  //       console.log('getAuthZypeConsumer: error:', err.message)
  //       // don't error out, but the user won't have the consumer info.
  //     }
  //
  //     try {
  //       if (zypeConsumer) {
  //         // Use the cleaned up name & email.
  //         const user = _.omit(zypeConsumer, ['_id'])
  //         user.id = zypeConsumer._id
  //         user.name = cleanName
  //         user.email = cleanEmail
  //
  //         return user
  //       }
  //     } catch (err) {
  //       console.log('getAuthZypeConsumer: error:', err.message)
  //     }
  //   } else {
  //     // don't error out, but the user won't have the consumer info.
  //     console.log('getAuthZypeConsumer: zypeConsumerId missing...did you provide it on the event object?')
  //   }
  //   return null
  // },
  //
  // /**
  //  * Gets the authed users token info or throws Unauthorized error.
  //  * @param req
  //  * @param config
  //  * @return {Promise<{accessTokenInfo: any, zypeConsumerId: undefined, accessToken: boolean}>}
  //  */
  // verifyZypeOAuth: async function (req, config = { doTokenRefresh: false }) {
  //   accessTokenDetails = await authUtil.getAuthSessionTokenDetails(req.headers, config.doTokenRefresh)
  //   // console.log('verifyZypeOAuth: accessTokenDetails: ', accessTokenDetails)
  //   const accessToken = _.get(accessTokenDetails, 'access_token', false)
  //   // console.log('verifyZypeOAuth: accessToken: ', accessToken)
  //   if (accessToken) {
  //     try {
  //       console.log('verifying the access token with zype.')
  //       // verify the token is still valid with zype.
  //       const { data: tokenInfo } = await zypeAuthAxios.get('/oauth/token/info', {
  //         params: {
  //           access_token: accessToken
  //         }
  //       })
  //       // hand back the access token and its info.
  //       return {
  //         auth: {
  //           accessToken,
  //           accessTokenInfo: tokenInfo
  //         },
  //         zypeConsumerId: _.get(tokenInfo, 'resource_owner_id')
  //       }
  //     } catch (err) {
  //       console.log('verifyZypeOAuth: error:', err.message)
  //     }
  //   } else {
  //     console.log('verifyZypeOAuth: error: accessToken not found')
  //   }
  //   // If we got this far, the user is not authorized.
  //   throw new createError.Unauthorized()
  // }
}

module.exports = authUtil
