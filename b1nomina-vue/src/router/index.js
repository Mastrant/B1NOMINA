import { createRouter, createWebHashHistory } from 'vue-router'

//creacion del router
const router = createRouter({
  //creacion del historial de navegacion
  history: createWebHashHistory(import.meta.env.BASE_URL),
  
  // Lista de las Rutas
  routes: [
    //Redirige al logIn
    {
      path: '/',
      redirect: '/Login',
      meta: {
        requiereToken: false,
      }

    },
    //Pagina de logIn
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/LoginView.vue'),
        meta: {
          requiereToken: false,
        }
    },
    //Selecionar la sociedad posterior al logIn
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
      
      // rutas derivadas de la seleccion de la sociedad
      children: [
        //panel Dashboard
        {
          path: '/sociedad/:sociedadId/dashboard',
          name: 'dashboard',
          component: () => import('../views/DashboardView.vue'),
          alias: ['dashboard']
        },
        //panel gestion de nomina
        {
          path: '/sociedad/:sociedadId/gestionNomina',
          name: 'gestionNomina',
          component: () => import('../views/GestionNominaView.vue'),
        },
        //panel empleados
        {
          path: '/sociedad/:sociedadId/empleados',
          name: 'empleados',
          component: () => import('../views/EmpleadosView.vue'),
        },
        //panel informes
        {
          path: '/sociedad/:sociedadId/informes',
          name: 'informes',
          component: () => import('../views/InformesView.vue'),
        },
        //panel configuracion
        {
          path: '/sociedad/:sociedadId/configuracion',
          name: 'configuracion',
          component: () => import('../views/ConfiguracionView.vue'),
        },
        //panel eventos
        {
          path: '/sociedad/:sociedadId/eventos',
          name: 'eventos',
          component: () => import('../views/EventosView.vue'),
        },
        //panel notificaciones
        {
          path: '/sociedad/:sociedadId/notificaciones',
          name: 'notificaciones',
          component: () => import('../views/NotificacionesView.vue'),
        },
      ]       
    },
    //panel de ayuda general
    {
      path: '/help',
      name: 'help',
      component: () => import('../views/HelpView.vue'),
    },
  ]
})

//antes de acceder a cada ruta //en construccion

/*
router.beforeEach((to, from, next) => {
  const localStorage = ''
})

*/

export default router
