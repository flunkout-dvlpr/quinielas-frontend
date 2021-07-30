
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
            path: '/:groupId?/:round?/:matchId?',
            name: 'Home',
            components: {
              Member: () => import('components/Single/Member.vue'),
              Groups: () => import('components/Multiple/Groups.vue'),
              Rounds: () => import('components/Multiple/Rounds.vue'),
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
