import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/LoginView.vue')
    },
    {
      path: '/sociedad',
      name: 'sociedad',
      component: () => import('../views/SociedadView.vue'),

      children: [
        {
          path: ':sociedadId/dashboard',
          component: () => import('../views/DashboardView.vue'),
        },
      ]
    },
  ]
})

export default router
