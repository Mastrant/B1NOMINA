import { createRouter, createWebHashHistory } from 'vue-router'; //importa librerias de vue router

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
        requiereToken: false, //establece si es requerido autorizacion para acceder
      }

    },
    //Pagina de logIn
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/LoginView.vue'),
        meta: {
          requiereToken: false, //establece si es requerido autorizacion para acceder
        }
    },
    //Selecionar la sociedad posterior al logIn
    {
      path: '/sociedad',
      name: 'sociedad',
      component: () => import('../views/SociedadView.vue'),
      meta: {
        requiereToken: true, //establece si es requerido autorizacion para acceder
      }
    },
    //sociedad selecionada
    {
      path: '/sociedad/:sociedadId',
      component: () => import('../views/TemplateView.vue'), 
      meta: {
        requiereToken: true, //establece si es requerido autorizacion para acceder
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
          children: [
            {
              path: '',
              components: {
                EMPLEADOS: () => import('../components/formularios/Form-empleados.vue'),
                enContratacion : () => import('')
              }
            },
          ]
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
      meta: {
        requiereToken: false, //establece si es requerido autorizacion para acceder
      },
    },
  ]
})

/*

//antes de acceder a cada ruta //en construccion
router.beforeEach((to, from, next) => {
  
  //verifica que se tenga un token
  const auht = localStorage.getItem('token') != null
  //verifica si la ruta requiere autentificacion
  const needAuth = to.meta.requiereToken

  // compara los resultados
  (needAuth && !auht )? 
  next('Login'): //si la ruta requiere authentificacion y no lo esta redirige al login
  next() //permite el acceso a la ruta
})

*/
//permite mantener el acceso al router
export default router
