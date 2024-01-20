import { createRouter, createWebHashHistory } from 'vue-router'

//creacion del router
const router = createRouter({
  //creacion del historial de navegacion
  history: createWebHashHistory(import.meta.env.BASE_URL),
  
  // Lista de las Rutas
  routes: [
    //Login
    {
      path: '/',
      redirect: '/Login',
      meta: {
        requiereToken: false,
      }

    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/LoginView.vue'),
        meta: {
          requiereToken: false,
        }
    },
    //Selecionar la sociedad posterior al login
    {
      path: '/sociedad',
      name: 'sociedad',
      component: () => import('../views/SociedadView.vue'),
      meta: {
        requiereToken: true,
      }
    },
    //sociedad selecionada
    {
      path: '/sociedad/:sociedadId',
      component: () => import('../views/TemplateView.vue'), 
      meta: {
        requiereToken: true,
      },
      
      //panel Dashboard de la sociedad selecionada
      children: [
        {
          path: '/sociedad/:sociedadId/dashboard',
          name: 'dashboard',
          component: () => import('../views/DashboardView.vue'),
          alias: ['dashboard']
        },
        {
          path: '/sociedad/:sociedadId/gestionNomina',
          name: 'gestionNomina',
          component: () => import('../views/GestionNominaView.vue'),
        },
        {
          path: '/sociedad/:sociedadId/empleados',
          name: 'empleados',
          component: () => import('../views/EmpleadosView.vue'),
        },
        {
          path: '/sociedad/:sociedadId/informes',
          name: 'informes',
          component: () => import('../views/InformesView.vue'),
        },
        {
          path: '/sociedad/:sociedadId/configuracion',
          name: 'configuracion',
          component: () => import('../views/ConfiguracionView.vue'),
        },
        {
          path: '/sociedad/:sociedadId/eventos',
          name: 'eventos',
          component: () => import('../views/EventosView.vue'),
        },
        {
          path: '/sociedad/:sociedadId/notificaciones',
          name: 'notificaciones',
          component: () => import('../views/NotificacionesView.vue'),
        },
      ]       
    },
    {
      path: '/help',
      name: 'help',
      component: () => import('../views/HelpView.vue'),
    },
  ]
})

//antes de acceder a cada ruta
router.beforeEach((to, from, next) => {
  const localStora
})

export default router
