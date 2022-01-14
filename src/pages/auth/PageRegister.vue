<template>
  <q-page>
    <section class="center">
      <template v-if="userStore.isAuthenticated">
        <p>You are signed in.</p>
        <div>
          <q-btn :to="{ name: 'Home' }" color="primary" label="Return to the home page"/>
        </div>
      </template>
      <template v-else>
        <q-card class="max-w-screen-sm mx-auto">
          <q-form ref="AuthForm" @submit.prevent="register">
            <q-card-section>
              <div class="q-gutter-y-md">
                <h6 class="mb-6">Register</h6>
                <q-input
                  ref="UserFullNameInput"
                  v-model="userFullName"
                  placeholder="your full name"
                  lazy-rules="ondemand"
                  :rules="requiredInputRules"
                  error-message="Enter your full name to continue"
                />
                <q-input
                  ref="UserEmailInput"
                  v-model="userEmail"
                  type="email"
                  autocomplete="email"
                  placeholder="you@somewhere.com"
                  lazy-rules="ondemand"
                  :rules="emailRequiredInputRules"
                />
                <!-- https://github.com/validatorjs/validator.js -->
                <q-input
                  ref="UserPasswordInput"
                  v-model="userPassword"
                  type="password"
                  placeholder="password"
                  lazy-rules="ondemand"
                  :rules="requiredInputRules"
                  error-message="Enter a valid password to continue"
                />
                <q-input
                  ref="UserPasswordInputAgain"
                  v-model="userPasswordAgain"
                  type="password"
                  placeholder="password again"
                  lazy-rules="ondemand"
                  :rules="[val => val === userPassword]"
                  error-message="Passwords must match to continue"
                />
              </div>
            </q-card-section>
            <q-card-actions align="between">
              <q-btn
                flat no-caps
                label="Already signed up?"
                class="OpenSans"
                :to="{ name: AUTH_ROUTE_NAME }"
              />
              <div class="!flex w-full sm:w-auto justify-end q-gutter-x-sm">
                <q-btn
                  flat
                  label="Cancel"
                  :disable="$q.loading.isActive"
                  :to="{ name: 'Home' }"
                />
                <q-btn
                  type="submit"
                  color="primary"
                  label="Register"
                  :disable="$q.loading.isActive"
                />
              </div>
            </q-card-actions>
            <q-card-actions align="right">
              <q-btn
                flat no-caps
                size="md"
                class="OpenSans"
                label="Terms of Service"
                :to="{ name: 'Terms' }"
              />
              <q-btn
                flat no-caps
                size="md"
                class="OpenSans"
                label="Privacy Policy"
                :to="{ name: 'Privacy' }"
              />
            </q-card-actions>
          </q-form>
        </q-card>
      </template>
    </section>
  </q-page>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, ref } from 'vue'
import { get, set } from '@vueuse/core'
import { emailRequiredInputRules, requiredInputRules } from 'src/util/validation'
import isStrongPassword from 'validator/es/lib/isStrongPassword'
import { useUserStore } from 'src/stores/user'
import { useQuasar } from 'quasar'
import { AUTH_ROUTE_NAME } from 'src/router/routes'

const $q = useQuasar()
const userStore = useUserStore()

// template refs.
const AuthForm = ref(null)
const UserEmailInput = ref(null)
const UserPasswordInput = ref(null)
const UserPasswordInputAgain = ref(null)

const userFullName = ref('John Smith')
const userEmail = ref('shawn.makinson@flowingstreams.com')
const userPassword = ref('123456')
const userPasswordAgain = ref('123456')

function resetForm () {
  set(userFullName, '')
  set(userEmail, '')
  set(userPassword, '')
  set(userPasswordAgain, '')
  get(AuthForm)?.resetValidation()
}

async function reset () {
  resetForm()
  get(UserEmailInput)?.focus()
}

async function formValid () {
  const f = get(AuthForm)
  return f && (await f.validate())
}

async function register() {
  try {
    if (await formValid()) {
      $q.loading.show()

      await userStore.register(get(userFullName), get(userEmail), get(userPassword))
      await reset()
      $q.notify({
        type: 'positive',
        message: 'Registration successful!'
      })
    }
  } catch (err) {
    let message = 'An error occurred. Please check your input & try again.'

    if (err?.message) {
      message = err.message
    }

    $q.dialog({
      title: 'Notice',
      message,
      transitionShow: 'slide-up',
      transitionHide: 'slide-down',
      ok: { color: 'warning' }
    })
  } finally {
    $q.loading.hide()
  }
}
</script>
