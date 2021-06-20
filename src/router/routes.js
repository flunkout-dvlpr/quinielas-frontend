
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Index.vue'),
        children: [
          {
            path: ':section?/',
            name: 'Home',
            components: {
              User: () => import('components/Single/User.vue'),
              Groups: () => import('components/Multiple/Groups.vue'),
              Fixtures: () => import('components/Multiple/Fixtures.vue'),
              Matches: () => import('components/Multiple/Matches.vue')
            }
          }
        ]
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
