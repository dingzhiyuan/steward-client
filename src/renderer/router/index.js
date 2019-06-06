import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/main',
      name: 'login-page',
      component: require('@/components/LoginPage/LoginPage').default
    },
    {
      path: '/',
      name: 'main-page',
      component: require('@/components/MainPage/MainPage').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
