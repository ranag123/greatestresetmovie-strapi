
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'home', meta: { previewTab: 'one' }, component: () => import('pages/Index.vue') },
      { path: '/trailer2', name: 'trailer2', meta: { previewTab: 'two' }, component: () => import('pages/Index.vue') },
      { path: '/trailer3', name: 'trailer3', meta: { previewTab: 'three' }, component: () => import('pages/Index.vue') },
      { path: 'contact', name: 'contact', component: () => import('pages/PageContact.vue') },
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
