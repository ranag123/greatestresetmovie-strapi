import { boot } from 'quasar/wrappers'
import { computed, watch } from 'vue'
import { useUserStore } from 'src/stores/user'
import { AUTH_AFTER_SIGN_IN_ROUTE_NAME, AUTH_ROUTE_NAME } from 'src/router/routes'

const ONE_DAY_IN_MILLISECONDS = 60 * 60 * 24 * 1000

/**
 * The purpose of this boot file is to monitor if the user is authenticated as they navigate around
 * or if the user's session expires.
 */
export default boot(({ router }) => {
  const userStore = useUserStore()

  // Verify the user is authed before allowing on a route, unless it is marked as publicRoute.
  router.beforeEach((to, from, next) => {
    const toIsPublic = to?.meta?.isPublic
    const okToProceed = toIsPublic || userStore.isAuthenticated
    console.log('toIsPublic', toIsPublic)
    console.log('userStore.isAuthenticated', userStore.isAuthenticated)
    if (okToProceed) {
      next()
    } else {
      next({ name: AUTH_ROUTE_NAME })
    }
  })

  // Watch for the user's session to expire.
  watch(computed(() => userStore.isAuthenticated), async (authedVal) => {
    if (authedVal) {
      if (router.currentRoute.value.name === AUTH_ROUTE_NAME) {
        const redirectedFrom = router.currentRoute.value?.redirectedFrom
        if (redirectedFrom) {
          // go back to the page where you came from
          await router.replace(redirectedFrom.fullPath)
        } else {
          // go to the default you just signed in page
          await router.replace({ name: AUTH_AFTER_SIGN_IN_ROUTE_NAME })
        }
      }
    } else {
      // not authed
      await router.replace({ name: AUTH_ROUTE_NAME })
    }
  })

  // reload the auth user on a schedule.
  function reloadMe () {
    userStore.me()
    setTimeout(reloadMe, ONE_DAY_IN_MILLISECONDS)
  }
  setTimeout(reloadMe, ONE_DAY_IN_MILLISECONDS)
})
