<template>
  <q-page>
    <!-- nothing -->
  </q-page>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { useUserStore } from 'src/stores/user'
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { AUTH_ROUTE_NAME } from 'src/router/routes'

const $q = useQuasar()
const userStore = useUserStore()
const route = useRoute()
const router = useRouter()

onMounted(() => {
  const userStore = useUserStore()
  const code = route.query?.code

  if (code?.length > 0) {
    $q.dialog({
      title: 'Reset Password',
      message: 'Please provide a new password.',
      prompt: {
        model: '',
        isValid: val => val.length > 2,
        type: 'password'
      },
      cancel: true,
      persistent: true
    }).onOk(password => {
      $q.dialog({
        title: 'Reset Password Confirmation',
        message: 'Please type your new password again.',
        prompt: {
          model: '',
          isValid: val => val === password, // make sure the confirmation matches.
          type: 'password'
        },
        cancel: true,
        persistent: true
      }).onOk(async (passwordConfirmation) => {
        try {
          $q.loading.show()
          // console.log('pw:', password)
          // console.log('pw confirm:', passwordConfirmation)
          await userStore.resetPassword(code, password, passwordConfirmation)

          $q.notify({
            type: 'positive',
            message: 'Your password has been reset.'
          })

          $q.loading.hide()
          redirect()
        } catch (err) {
          let message = 'An error occurred. Unable to reset your password.'

          if (err?.message) {
            message = err.message
          }

          $q.loading.hide()

          $q.dialog({
            title: 'Notice',
            message,
            transitionShow: 'slide-up',
            transitionHide: 'slide-down',
            ok: { color: 'warning' }
          }).onDismiss(() => {
            redirect()
          })
        }
      }).onCancel(() => {
        cancelPasswordReset()
      }).onDismiss(() => {
        $q.loading.hide()
      })
    }).onCancel(() => {
      cancelPasswordReset()
    })
  } else {
    redirect()
  }
})

function cancelPasswordReset () {
  $q.notify({
    type: 'warning',
    textColor: 'white',
    message: 'Password reset cancelled.'
  })
  redirect()
}

function redirect () {
  router.replace({ name: AUTH_ROUTE_NAME })
}

</script>
