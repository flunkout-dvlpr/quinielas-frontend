
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
            path: '/:poolId?/:round?/:matchId?',
            name: 'Home',
            components: {
              Member: () => import('components/Single/Member.vue'),
              Pools: () => import('components/Multiple/Pools.vue'),
              Rounds: () => import('components/Multiple/Rounds.vue'),
              Fixtures: () => import('components/Multiple/Fixtures.vue')
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
