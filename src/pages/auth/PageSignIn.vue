<template>
  <q-page class="PageSignIn !flex justify-center items-center">
    <section class="center">
      <template v-if="userStore.isAuthenticated">
        <p>You are signed in.</p>
        <div>
          <q-btn :to="{ name: 'Home' }" color="primary" label="Return to the home page"/>
        </div>
      </template>
      <div v-else class="max-w-screen-sm mx-auto">
        <header>
          <h1>Sign in with email</h1>
        </header>
        <q-card flat class="max-w-screen-sm mx-auto bg-transparent">
          <q-form ref="AuthForm" @submit.prevent="signIn">
            <q-card-section>
              <div class="q-gutter-y-md">
                <q-input
                  ref="UserEmailInput"
                  autofocus
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
                  autocomplete="current-password"
                  placeholder="your password"
                  lazy-rules="ondemand"
                  :rules="requiredInputRules"
                />
                <q-btn
                  type="submit"
                  color="dark"
                  label="Sign In"
                  :disable="$q.loading.isActive"
                  class="w-full"
                  size="lg"
                />
              </div>
            </q-card-section>
            <q-card-actions align="between">
              <div>
                <q-btn
                  flat no-caps
                  label="Need to register?"
                  class="OpenSans"
                  :to="{ name: 'AuthRegister' }"
                />
                <q-btn
                  flat no-caps
                  label="Trouble signing in?"
                  class="OpenSans"
                  @click="showRecoverPassword = !showRecoverPassword"
                />
              </div>
              <div class="!flex justify-end q-gutter-x-sm">
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
              </div>
            </q-card-actions>
          </q-form>
          <q-slide-transition>
            <q-form
              v-if="showRecoverPassword"
              ref="RecoverForm"
              @submit.prevent="recoverPassword"
              class="border-t mt-3 border-white/20"
            >
              <q-card-section>
                <div class="q-gutter-y-md">
                  <h6 class="mb-6">Recover Password</h6>
                  <q-input
                    ref="RecoverPasswordEmailInput"
                    v-model="recoverPasswordEmail"
                    type="email"
                    autocomplete="email"
                    placeholder="you@somewhere.com"
                    lazy-rules="ondemand"
                    :rules="emailRequiredInputRules"
                  />
                </div>
              </q-card-section>
              <q-card-actions align="right">
                <q-btn
                  type="submit"
                  color="dark"
                  label="Recover Password"
                  :disable="$q.loading.isActive"
                  class="w-full"
                  size="lg"
                />
              </q-card-actions>
            </q-form>
          </q-slide-transition>
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

const $q = useQuasar()
const userStore = useUserStore()

// template refs.
const AuthForm = ref(null)
const UserEmailInput = ref(null)
const UserPasswordInput = ref(null)
const RecoverPasswordEmailInput = ref(null)

// TODO: remove these hardcoded refs
const userEmail = ref('shawn.makinson@flowingstreams.com')
const userPassword = ref('123456')

function resetForm () {
  set(userEmail, '')
  set(userPassword, '')
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

async function signIn () {
  try {
    if (await formValid()) {
      $q.loading.show()

      await userStore.signIn(get(userEmail), get(userPassword))
      await reset()
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

    get(UserPasswordInput)?.select()
  } finally {
    $q.loading.hide()
  }
}

const recoverPasswordEmail = ref('shawn.makinson@flowingstreams.com')
const showRecoverPassword = ref(false)

async function recoverFormValid () {
  const f = get(AuthForm)
  return f && (await f.validate())
}

async function recoverPassword () {
  try {
    if (await recoverFormValid()) {
      $q.loading.show()

      await userStore.recoverPassword(get(recoverPasswordEmail))

      set(recoverPasswordEmail, '')
      get(RecoverPasswordEmailInput)?.resetValidation()

      $q.notify({
        type: 'positive',
        message: 'Please check your email.'
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

    get(RecoverPasswordEmailInput)?.select()
  } finally {
    $q.loading.hide()
  }
}
</script>
