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
          <q-form ref="AuthForm" @submit.prevent="signIn">
            <q-card-section>
              <div class="q-gutter-y-md">
                <h6 class="mb-6">Sign in with email</h6>

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
                  autocomplete="current-password"
                  placeholder="your password"
                  lazy-rules="ondemand"
                  :rules="requiredInputRules"
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
                />
              </div>
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
                  label="Sign In"
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

const $q = useQuasar()
const userStore = useUserStore()

// template refs.
const AuthForm = ref(null)
const UserEmailInput = ref(null)
const UserPasswordInput = ref(null)

const userEmail = ref('')
const userPassword = ref('')

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
</script>
