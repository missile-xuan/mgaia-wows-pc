import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/public/Login.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/realTimeBattle',
    children: [
      {
        path: 'realTimeBattle',
        name: 'RealTimeBattle',
        component: () => import('@/views/realTimeBattle/RealTimeBattle.vue'),
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
