import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login-page',
      component: require('@/page/login/LoginPage').default
    },
    {
      path: '/github/login',
      name: 'github-login-page',
      component: require('@/page/github/LoginPage').default
    },
    {
      path: '/main',
      name: 'main-page',
      component: require('@/page/main/MainPage').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
