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
    },
    {
      path: '/sociedad/:sociedadId',
      component: () => import('../views/DashboardView.vue'),        
        
    },
    {
      path: '/sociedad/:sociedadId/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
    },
    {
      path: '/sociedad/:sociedadId/gestionNomina',
      name: 'gestionNomina',
      component: () => import('../views/GestionNominaView.vue'),
    },

  ]
})

export default router
