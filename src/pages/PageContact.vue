<template>
  <q-page class="PageContact !flex justify-center items-center">
    <section class="center">
      <div class="max-w-screen-sm mx-auto">
        <header>
          <h1>Contact Us</h1>
        </header>

        <q-card flat class="bg-transparent">
          <q-form
            ref="ContactForm"
            :action="postTo" method="POST"
            @submit.prevent.stop="confirmConsent"
          >
            <q-card-section>
              <p class="mb-12">
                Please complete the contact form below and a team member will get back to you.
              </p>

              <div class="q-gutter-y-md">
                <q-input
                  autofocus dark
                  v-model.trim="formState.fullName"
                  placeholder="name"
                  aria-label="name"
                  lazy-rules="ondemand"
                  :rules="requiredInputRules"
                />
                <q-input
                  type="email"
                  v-model.trim="formState.email"
                  placeholder="email address"
                  aria-label="email address"
                  lazy-rules="ondemand"
                  :rules="emailRequiredInputRules"
                />
                <q-input
                  type="textarea"
                  v-model.trim="formState.message"
                  placeholder="message or question"
                  aria-label="message or question"
                  rows="5"
                  lazy-rules="ondemand"
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
              </div>
            </q-card-section>
          </q-form>
        </q-card>

        <q-inner-loading :showing="formSubmitting"/>

        <!-- This is the confirmation alert -->
        <dialog-confirm-form
          v-model="confirmDialogOpen"
          @ok="submitForm"
        />
      </div>
    </section>
  </q-page>
</template>

<script setup>
import DialogConfirmForm from 'components/DialogConfirmForm'
import { reactive, ref } from 'vue'
import * as $const from 'src/constants'
import { get, set } from '@vueuse/core'
import { useQuasar } from 'quasar'
import axios from 'axios'
import * as util from 'src/util/util'
import { emailRequiredInputRules, requiredInputRules } from 'src/util/validation'
import { useUserStore } from 'src/stores/user'

const $q = useQuasar()
const userStore = useUserStore()

// GreatestReset Movie Contact form in usebasin
const postTo = 'https://usebasin.com/f/34caf77b7792'
const formState = reactive({
  honeypot: '',
  fullName: userStore.authUser?.fullName || '',
  email: userStore.authUser?.email || '',
  message: ''
})
const confirmDialogOpen = ref(false)
const formSubmitting = ref(false)

// template refs
const ContactForm = ref(null)

async function confirmConsent () {
  if (!get(formSubmitting)) {
    const formValid = await get(ContactForm).validate()

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

  if (get(ContactForm)) {
    get(ContactForm).resetValidation()
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
