import { createRouter, createWebHistory } from 'vue-router'

//creacion del router
const router = createRouter({
  //creacion del historial de navegacion
  history: createWebHistory(import.meta.env.BASE_URL),
  
  // Lista de las Rutas
  routes: [
    //Login
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/LoginView.vue')
    },
    //Selecionar la sociedad posterior al login
    {
      path: '/sociedad',
      name: 'sociedad',
      component: () => import('../views/SociedadView.vue'),
    },
    //sociedad selecionada
    {
      path: '/sociedad/:sociedadId',
      component: () => import('../views/TemplateView.vue'), 
      
      //panel Dashboard de la sociedad selecionada
      children: [
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
    },
  ]
})

export default router
