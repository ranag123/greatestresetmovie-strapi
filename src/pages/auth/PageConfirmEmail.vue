<template>
  <q-page>
    <!-- nothing -->
  </q-page>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from 'src/stores/user'
import { AUTH_ROUTE_NAME } from 'src/router/routes'

const $q = useQuasar()
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

onMounted(async () => {
  try {
    $q.loading.show({
      message: 'One moment while we confirm your email...'
    })

    const confirmation = route.query?.confirmation
    await userStore.confirmEmail(confirmation)

    $q.notify('Email confirmed! Please sign in.')
  } catch (err) {
    // in case there is an error related to redirect from the api call, say nothing and let the user get
    // an error from the sign-in process.
    // let message = 'An error occurred. Please try again.'
    //
    // if (err?.message) {
    //   message = err.message
    // }
    // $q.notify({
    //   type: 'negative',
    //   textColor: 'white',
    //   message
    // })
  } finally {
    $q.loading.hide()
    router.replace({ name: AUTH_ROUTE_NAME })
  }
})
</script>
