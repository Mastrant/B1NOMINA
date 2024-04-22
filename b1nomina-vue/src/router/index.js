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
      },
      children: [

      ]

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
      },
    },
    //sociedad selecionada
    {
      path: '/sociedad/:sociedadId',
      component: () => import('@/views/TemplateView.vue'), 
      meta: {
        requiereToken: true, //establece si es requerido autorizacion para acceder
      },
      
      // rutas derivadas de la seleccion de la sociedad
      children: [
        //panel Dashboard
        {
          path: '',
          name: 'dashboard',
          component: () => import('@/views/DashboardView.vue'),
          alias: ['dashboard']
        },
        //panel gestion de nomina
        {
          path: 'gestionNomina',
          component: () => import('@/views/GestionNominaView.vue'),
          alias: ['gestiosNomina', 'nomina']
        },
        //panel empleados
        {
          path: 'empleados',
          name: 'empleados',
          alias: ['empleados'],
          component: () => import('@/views/EmpleadosView.vue'),
          props: true,
         
          //componentes hijos de la ruta empleados
          children:[
            {
              path: "",
              component: () => import('@/components/panel/Panel-empleados.vue'),
              name: 'listar',
              alias: 'listar',
              props: true,
               //toma los parametros de la url con el mismo nombre que los recibe
            },
            {
              path: 'enContratacion',
              name: 'enContratacion',
              component: () => import('@/components/panel/Panel-EnContratacion.vue'),   
              alias: 'enContratacion'         
            },
            {
              path: 'inactivos',
              name: 'inactivos',
              component: () => import('@/components/panel/Panel-Inactivos.vue'),   
              alias: 'inactivos'         
            },
          ]
        },
       // Asegúrate de que el alias para 'panelEmpleado/:empleadoId' esté correctamente definido
        {
          path: 'panelEmpleado/:empleadoId',
          name: 'panel-empleado',
          component: () => import('@/views/PerfilEmpleado.vue'),
          props: true,
          // Asegúrate de que el alias coincida con la estructura de rutas esperada
          alias: ['/sociedad/:sociedadId/panelEmpleado/:empleadoId'],
          beforeEnter: (to, from, next) => {
            // Aquí puedes definir la lógica para redirigir a una ruta específica
            next();
          }
        },
         
        //panel informes
        {
          path: 'informes',
          name: 'informes',
          component: () => import('@/views/InformesView.vue'),
          alias: ['informes']
        },
        //panel configuracion
        {
          path: 'configuracion',
          name: 'configuracion',
          component: () => import('@/views/ConfiguracionView.vue'),
          alias: 'configuracion',
          children: [
            {
              path: "",
              component: () => import('@/components/panel/Panel-Configuraciones.vue'),
              name: 'opciones',
              alias: 'opciones',              
              props: true,
               
            },
            {
              path: "datos-de-la-empresa",
              component: () => import('@/components/panel/configuracion/Panel-Datos-Empresa.vue'),
              name: 'datos-de-la-empresa',
              alias: ['datos-de-la-empresa',],              
               
            },
            {
              path: "datos-previsionales",
              component: () => import('@/components/panel/configuracion/Panel-DatosProvisionales.vue'),
              name: 'datos-previsionales',
              alias: ['datos-previsionales',],              
               
            },
            {
              path: "periodos",
              component: () => import('@/components/panel/Panel-EnDesarrollo.vue'),
              name: 'periodos',
              alias: ['periodos',],              
               
            },
            {
              path: "centralizacion",
              component: () => import('@/components/panel/configuracion/Panel-Centralizacion.vue'),
              name: 'centralizacion',
              alias: ['centralizacion',],              
               
            },
            {
              path: "gestion-usuarios",
              component: () => import('@/components/panel/Panel-EnDesarrollo.vue'),
              name: 'gestion-usuarios',
              alias: ['gestion-usuarios',],              
               
            },
            {
              path: "parametros-conexion",
              component: () => import('@/components/panel/configuracion/Panel-ParametrosConexion.vue'),
              name: 'parametros-conexion',
              alias: ['parametros-conexion',],              
               
            },
            {
              path: "base-eventos",
              component: () => import('@/components/panel/configuracion/Panel-Base-Eventos.vue'),
              name: 'base-eventos',
              alias: ['base-eventos',],              
               
            },
            {
              path: "historial-acciones",
              component: () => import('@/components/panel/Panel-EnDesarrollo.vue'),
              name: 'historial-acciones',
              alias: ['historial-acciones',],              
               
            },
            {
              path: "alertas",
              component: () => import('@/components/panel/Panel-EnDesarrollo.vue'),
              name: 'alertas',
              alias: ['alertas',],              
               
            },
          ]
        },
        //panel eventos
        {
          path: 'eventos',
          name: 'eventos',
          component: () => import('@/views/EventosView.vue'),
          alias: ['eventos']
        },
        //panel notificaciones
        {
          path: 'notificaciones',
          name: 'notificaciones',
          component: () => import('@/views/NotificacionesView.vue'),
          alias: ['notificaciones']
        },
        //si la ruta buscada no existe
        {
          path: ':pathMatch(.*)*',
          name: 'not-fount',
          component: () => import('@/components/Not-fount.vue')
        }
      ]       
    },
    //panel de ayuda general
    {
      path: '/help',
      name: 'help',
      component: () => import('@/views/HelpView.vue'),
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
