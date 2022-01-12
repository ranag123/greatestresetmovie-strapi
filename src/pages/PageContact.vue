<template>
  <q-page class="PageContact !flex justify-center items-center">
    <div>
      <header>
        <h1>Contact Us</h1>
      </header>

      <div class="full-width" style="max-width: 800px">
        <p class="mb-12">
          Please complete the contact form below and a team member will get back to you.
        </p>

        <q-form
          ref="contactForm"
          :action="postTo" method="POST"
          @submit.prevent.stop="confirmConsent"
          class="q-gutter-y-md"
        >
          <q-input
            autofocus dark
            v-model.trim="formState.fullName"
            placeholder="name"
            aria-label="name"
            lazy-rules='ondemand'
            :rules="requiredInputRules"
          />
          <q-input
            type="email"
            v-model.trim="formState.email"
            placeholder="email address"
            aria-label="email address"
            lazy-rules='ondemand'
            :rules="emailRequiredInputRules"
          />
          <q-input
            type="textarea"
            v-model.trim="formState.message"
            placeholder="message or question"
            aria-label="message or question"
            rows="5"
            lazy-rules='ondemand'
            :rules="requiredInputRules"
          />
          <input type="hidden" name="hpf" :value="formState.honeypot"/>
          <div class="flex justify-end">
            <q-btn
              type="submit"
              color="dark"
              label="Submit"
              size="lg"
              class="w-full"
            />
          </div>
        </q-form>
      </div>

      <q-inner-loading :showing="formSubmitting"/>

      <!-- This is the confirmation alert -->
      <form-confirm-dialog
        v-model="confirmDialogOpen"
        @ok="submitForm"
      />
    </div>
  </q-page>
</template>

<script setup>
import FormConfirmDialog from 'components/FormConfirmDialog'
import { onMounted, reactive, ref } from 'vue'
import * as $const from 'src/constants'
import { get, set } from '@vueuse/core'
import { useQuasar } from 'quasar'
import axios from 'axios'
import * as util from 'src/util/util'
import { emailRequiredInputRules, requiredInputRules } from 'src/util/validation'

const $q = useQuasar()

// GreatestReset Movie Contact form in usebasin
const postTo = 'https://usebasin.com/f/34caf77b7792'
const formState = reactive({
  honeypot: '',
  fullName: '',
  email: '',
  message: ''
})
const confirmDialogOpen = ref(true)
const formSubmitting = ref(false)

// template refs
const contactForm = ref(null)

onMounted(() => {
  // TODO: attempt to prefill fields we can from the authed user.
})

async function confirmConsent () {
  if (!get(formSubmitting)) {
    const formValid = await get(contactForm).validate()

    if (formValid) {
      set(confirmDialogOpen, true)
    } else {
      $q.notify({
        color: 'warning',
        message: $const.MESSAGES.GENERAL_FORM_ERROR
      })
    }
  }
}

function resetForm () {
  formState.honeypot = ''
  formState.fullName = ''
  formState.email = ''
  formState.message = ''

  if (get(contactForm)) {
    get(contactForm).resetValidation()
  }
}

async function submitForm () {
  try {
    set(formSubmitting, true)

    const response = await axios.post(postTo, {
      full_name: formState.fullName,
      email: formState.email,
      message: formState.message,
      _gotcha: formState.honeypot // this must match the honey pot field settings in usebasin.
    }, {
      headers: {
        Accept: 'application/json'
      }
    })

    if (response.data.success) {
      resetForm()

      $q.dialog({
        title: 'Success',
        message: 'We have received your message. If a response is required a team member will be in touch with you soon.',
        transitionShow: 'slide-up',
        transitionHide: 'slide-down',
        ok: { color: 'positive' }
      })
    } else {
      $q.notify({
        color: 'negative',
        message: 'Unable to send the form. Please try again.'
      })
    }
  } catch (err) {
    util.devlog(err)
    $q.notify({
      color: 'negative',
      message: 'Unable to send the form. Please try again.'
    })
  } finally {
    set(formSubmitting, false)
  }
}
</script>

<!--<style lang="scss" scoped>-->
<!--.PageContact {-->
<!--  // original-->
<!--  //background: linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.7) 35%, rgba(0,0,0,0) 100%), url('~assets/home/bg-home.jpg') no-repeat;-->
<!--  //background-attachment: fixed, fixed;-->
<!--  //background-size: auto, cover;-->
<!--  //background-position: top left, top center;-->
<!--  // solution for iOS based on this:-->
<!--  // https://stackoverflow.com/questions/24154666/background-size-cover-not-working-on-ios-->
<!--  &::after{-->
<!--    content: '';-->
<!--    position: fixed; /* stretch a fixed position to the whole screen */-->
<!--    top: 0;-->
<!--    height: 100vh; /* fix for mobile browser address bar appearing disappearing */-->
<!--    left: 0;-->
<!--    right: 0;-->
<!--    z-index: -1; /* needed to keep in the background */-->
<!--    background: linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.7) 35%, rgba(0,0,0,0) 100%), url('~assets/home/bg-home.jpg') center center no-repeat;-->
<!--    background-size: auto, cover;-->
<!--  }-->
<!--}-->
<!--</style>-->
