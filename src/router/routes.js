import * as $const from 'src/constants'

export const AUTH_ROUTE_NAME = 'Auth'
export const AUTH_AFTER_SIGN_IN_ROUTE_NAME = 'Home'

// NOTE: Remember, names on the routes are important, do not just change them.
//       And be sure you always provide one.
// NOTE: If a route does NOT require auth, set meta.isPublic: true
//       Routes default to auth is required for safety.
const routes = [
  {
    path: '/',
    component: () => import('layouts/LayoutMain.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        meta: { isPublic: true, previewTab: 'one' },
        component: () => import('pages/PageIndex.vue')
      },
      {
        path: 'trailer2',
        name: 'Trailer2',
        meta: { isPublic: true, previewTab: $const.ZYPE_PREVIEW_ALT1_VIDEO_ID ? 'two' : 'one' },
        component: () => import('pages/PageIndex.vue')
      },
      {
        path: 'trailer3',
        name: 'Trailer3',
        meta: { isPublic: true, previewTab: $const.ZYPE_PREVIEW_ALT2_VIDEO_ID ? 'three' : 'one' },
        component: () => import('pages/PageIndex.vue')
      },
      {
        // watch is a private route
        path: 'watch',
        name: 'Watch',
        component: () => import('pages/PageWatch.vue')
      },
      {
        path: 'contact',
        name: 'Contact',
        meta: { isPublic: true },
        component: () => import('pages/PageContact.vue')
      },
      // { path: 'policies', name: 'Policies', meta: { isPublic: true }, component: () => import('pages/legal/PagePolicies.vue') },
      {
        path: 'privacy',
        name: 'Privacy',
        meta: { isPublic: true },
        component: () => import('pages/legal/PagePrivacy.vue')
      },
      {
        path: 'terms',
        name: 'Terms',
        meta: { isPublic: true },
        component: () => import('pages/legal/PageTerms.vue')
      },
      {
        path: 'signin',
        name: AUTH_ROUTE_NAME,
        meta: { isPublic: true },
        component: () => import('pages/auth/PageSignIn.vue'),
      },
      {
        path: 'register',
        name: 'AuthRegister',
        meta: { isPublic: true },
        component: () => import('pages/auth/PageRegister.vue')
      },
      // NOTE: the confirm account email url is a direct api call that is proxied in api/proxies.json
      {
        path: 'reset-password',
        name: 'AuthResetPassword',
        meta: { isPublic: true },
        component: () => import('pages/auth/PageResetPassword.vue')
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    meta: { isPublic: true },
    component: () => import('pages/PageError404.vue')
  }
]

export default routes
