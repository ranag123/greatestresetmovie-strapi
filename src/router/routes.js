export const AUTH_ROUTE_NAME = 'Auth'
export const AUTH_AFTER_SIGN_IN_ROUTE_NAME = 'Home'

// NOTE: Remember, names on the routes are important, do not just change them.
//       And be sure you always provide one.
// NOTE: If a route does NOT require auth, set meta.isPublic: true
//       Routes default to auth is required for safety.
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        meta: { isPublic: true, previewTab: 'one' },
        component: () => import('pages/Index.vue')
      },
      {
        path: 'trailer2',
        name: 'Trailer2',
        meta: { isPublic: true, previewTab: 'two' },
        component: () => import('pages/Index.vue')
      },
      {
        path: 'trailer3',
        name: 'Trailer3',
        meta: { isPublic: true, previewTab: 'three' },
        component: () => import('pages/Index.vue')
      },
      { path: 'contact', name: 'Contact', meta: { isPublic: true }, component: () => import('pages/PageContact.vue') },
      // { path: 'policies', name: 'Policies', meta: { isPublic: true }, component: () => import('pages/legal/PagePolicies.vue') },
      {
        path: 'privacy',
        name: 'Privacy',
        meta: { isPublic: true },
        component: () => import('pages/legal/PagePrivacy.vue')
      },
      { path: 'terms', name: 'Terms', meta: { isPublic: true }, component: () => import('pages/legal/PageTerms.vue') }
    ]
  },
  // auth routes
  {
    path: '/auth',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: AUTH_ROUTE_NAME,
        meta: { isPublic: true },
        component: () => import('pages/auth/PageSignIn.vue'),
      },
      { path: 'register', name: 'AuthRegister', component: () => import('pages/auth/PageRegister.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
