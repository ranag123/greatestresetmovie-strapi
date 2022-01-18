<template>
  <div>
    <q-card flat class="bg-white">
      <q-card-section :class="showError ? 'stripeFieldError' : ''">
<!--        <div class="q-gutter-y-sm">-->
          <div ref="StripeCardElement" class="py-1" data-cy="stripeCreditCard">
            <!-- A Stripe Element will be inserted here. -->
          </div>
<!--        </div>-->
      </q-card-section>

      <q-inner-loading :showing="showLoading"/>
    </q-card>
  </div>
</template>

<script setup>
// NOTE: Test credit card number: 4111111111111111

import { onBeforeUnmount, computed, onMounted, nextTick, ref } from 'vue'
import { get, set } from '@vueuse/core'
import * as util from 'src/util/util'
import { useQuasar } from 'quasar'

const props = defineProps({
  showError: {
    type: Boolean,
    default: false
  }
})

// Let the parent component call getToken()
defineExpose({
  getToken
})

const $q = useQuasar()

// https://stripe.com/docs/js/appendix/style
const STRIPE_CARD_FIELD_STYLING = {
  iconStyle: 'solid',
  style: {
    base: {
      // iconColor: '#304895',
      color: 'rgba(0, 0, 0, 0.87)',
      iconColor: 'rgba(0, 0, 0, 0.87)',
      // color: '#000',
      // iconColor: '#000',
      // iconColor: '#fff',
      // color: '#fff',
      // fontWeight: 500,
      fontFamily: '\'Open Sans\', sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      // ':focus': {
      //   color: 'green'
      // },
      ':-webkit-autofill': {
        color: 'rgba(0, 0, 0, 0.87)'
        // The below was trying to set the bg color on the cc field, but was not showing up in the iframe.
        // '-webkit-box-shadow': '0 0 0px 1000px #000 inset;',
        // transition: 'background-color 5000s ease-in-out 0s;'
        // color: 'rgba(255, 255, 255, 0.87)',
      },
      '::placeholder': {
        color: 'rgba(0, 0, 0, 0.87)'
        // color: 'rgba(255, 255, 255, 0.87)'
      }
    },
    invalid: {
      // iconColor: '',
      color: '#000'
      // color: '#fff'
    }
  }
}

// Comes from the stripe js added to index.template.html
// eslint-disable-next-line no-undef
const stripe = Stripe(process.env.STRIPE_PUBLIC_KEY),
  elements = stripe.elements()

// template refs
const StripeCardElement = ref(null)

const showLoading = ref(true)

// flags if the stripe component is ready for use.
const cardInputReady = ref(false)

// flags if the stripe component told us its complete.
const cardInfoReady = ref(false)
const gettingToken = ref(false)
const showStripeFieldError = ref(false)

// this will hold the created card field.
const card = ref(null)

onMounted(async () => {
  // create the stripe field and style it a bit.
  const c = elements.create('card', STRIPE_CARD_FIELD_STYLING)
  set(card, c)
  c.on('ready', event => {
    set(cardInputReady, true)
    set(showLoading, false)
    // console.log('INPUT IS READY!!!')
  })
  c.on('change', event => {
    set(cardInfoReady, event.complete)
    // console.log(event)
  })
  if (!get(StripeCardElement)) {
    await nextTick()
    await nextTick()
  }
  if (get(StripeCardElement)) {
    get(card).mount(get(StripeCardElement))
  }
})

onBeforeUnmount(() => {
  set(cardInfoReady, false)
  set(showStripeFieldError, false)

  if (get(card)) {
    // clean up the stripe card element.
    get(card).clear()
    get(card).destroy()
    set(cardInputReady, false)
    set(card, null)
  }
})

async function getToken (name) {
  let paymentToken = false
  try {
    set(gettingToken, true)
    const response = await stripe.createToken(get(card), { name })

    if (response.error) {
      util.devlog(response.error)
      $q.notify({
        color: 'warning',
        message: response.error.message
      })
    } else {
      paymentToken = response.token.id
      util.devlog('token:', paymentToken)
    }
  } catch (err) {
    util.devlog(err)
  } finally {
    set(gettingToken, false)
  }

  return paymentToken
}
</script>

<style lang="scss" scoped>
.stripeFieldError {
  border: 2px solid $negative !important;
}
</style>
