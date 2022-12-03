import Vue from 'vue'
import VueRouter from 'vue-router'
import login from "@/store/LoginData";

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    meta:{layout:'empty'},
    component: ()=> import('../views/Login.vue'),
  },
  {
    path: '/',
    name: 'home',
    meta:{layout:'main', auth:true},
    component: ()=> import('../views/MainTable.vue')
  },
  {
    path: '/drag',
    name: 'DragDrop',
    meta:{layout:'main', auth:true},
    component: ()=> import('../views/DragAndDrop.vue')
  },
  {
    path: '/order-product',
    name: 'OrderProduct',
    meta:{layout:'main', auth:true},
    component: ()=> import('../views/OrderProduct.vue')
  },
  {
    path: '/complate-projects',
    name: 'ComplateProjects',
    meta:{layout:'main', auth:true},
    component: ()=> import('../views/ComplateProjects.vue')
  },
  {
    path: '/salary',
    name: 'SalaryUsers',
    meta:{layout:'main', auth:true},
    component: ()=> import('../views/SalaryUsers.vue')
  },
  {
    path: '/price',
    name: 'CreatePrice',
    meta:{layout:'main', auth:true},
    component: ()=> import('../views/CreatePrice.vue')
  },
  {
    // eslint-disable-next-line
    path: '/position-create',
    name: 'PositionCreate',
    meta:{layout:'main', auth:true},
    component: () => import('../views/PositionCreate.vue')
  },
  {
    // eslint-disable-next-line
    path: '/add-position',
    name: 'AddPosition',
    meta:{layout:'main', auth:true},
    component: () => import('../views/AddPosition.vue')
  },
  {
    // eslint-disable-next-line
    path: '/user-create',
    name: 'UserCreate',
    meta:{layout:'main', auth:true},
    component: () => import( '../views/UserCreate.vue')
  },
  {
    path: '/:catchAll(.*)*',
    meta:{layout: 'empty'},
    component: () => import('../components/FoundErore.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
  router.beforeEach((to,from,next)=>{
    let chekdata=login.state.navbarName.length!==0?login.state.navbarName[0].role ==='admin'||login.state.navbarName[0].role ==='user':false
    let requreAuth= to.matched.some(record=>record.meta.auth)

    if (requreAuth&&!chekdata){
      next('/login')
    }else {
      next()
    }
  })

export default router
