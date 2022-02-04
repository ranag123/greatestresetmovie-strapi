<template>
  <q-page class="PagRegister !flex justify-center items-center">
    <section class="center">
      <template v-if="userStore.isAuthenticated">
        <p>You are signed in.</p>
        <div>
          <q-btn :to="{ name: 'Home' }" color="primary" label="Return to the home page"/>
        </div>
      </template>
      <div v-else class="max-w-screen-sm mx-auto">
        <header>
          <h1>Register</h1>
        </header>
        <q-card flat class="bg-transparent">
          <q-form ref="AuthForm" @submit.prevent="register">
            <q-card-section>
              <div class="q-gutter-y-md">
                <q-input
                  ref="UserFullNameInput"
                  autofocus
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
                <q-btn
                  type="submit"
                  color="dark"
                  label="Register"
                  class="w-full"
                  size="lg"
                  :disable="$q.loading.isActive"
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
              <div class="!flex justify-end q-gutter-x-sm">
                <q-btn
                  flat no-caps
                  size="md"
                  class="OpenSans"
                  label="Privacy Policy"
                  :to="{ name: 'Privacy' }"
                />
                <q-btn
                  flat no-caps
                  size="md"
                  class="OpenSans"
                  label="Terms & Conditions"
                  :to="{ name: 'Terms' }"
                />
              </div>
            </q-card-actions>
          </q-form>
        </q-card>
      </div>
    </section>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { get, set } from '@vueuse/core'
import { emailRequiredInputRules, requiredInputRules } from 'src/util/validation'
import { useUserStore } from 'src/stores/user'
import { useQuasar } from 'quasar'
import { AUTH_ROUTE_NAME } from 'src/router/routes'
import { useRouter } from 'vue-router'

const $q = useQuasar()
const userStore = useUserStore()
const router = useRouter()

// template refs.
const AuthForm = ref(null)
const UserEmailInput = ref(null)
const UserPasswordInput = ref(null)
const UserPasswordInputAgain = ref(null)

const userFullName = ref('')
const userEmail = ref('')
const userPassword = ref('')
const userPasswordAgain = ref('')

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

async function register () {
  try {
    if (await formValid()) {
      $q.loading.show()

      await userStore.register(get(userFullName), get(userEmail), get(userPassword))

      await reset()

      $q.dialog({
        title: 'Registration successful!',
        message: 'Please check your email to confirm your account.',
        transitionShow: 'slide-up',
        transitionHide: 'slide-down',
        ok: { color: 'positive' }
      }).onOk(() => {
        router.push({ name: AUTH_ROUTE_NAME })
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
