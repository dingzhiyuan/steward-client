import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './css/common.css'
import axios from 'axios'
import VueMarkdown from 'vue-markdown'

import { Request_get, Request_post, Request_put, Request_delete,Request_post_headers } from '../utils/utils.js'

import App from './App'
import router from './router'
import store from './store'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

Vue.use(ElementUI);

Vue.prototype.$axios = axios;
Vue.prototype.$Request_get = Request_get
Vue.prototype.$Request_post = Request_post
Vue.prototype.$Request_post_headers = Request_post_headers
Vue.prototype.$Request_put = Request_put
Vue.prototype.$Request_delete = Request_delete

// 拦截请求
axios.interceptors.request.use(function (config) {
  config.headers.common = {
    'Content-Type': "application/x-www-form-urlencoded",
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type',
    'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE',
    // 'x-authentication-token': localStorage.XMDADMINTOKEN==undefined?'':localStorage.XMDADMINTOKEN
  }
  //
  console.log("請求開始!")
  return config
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  console.log("响应开始！")
  if (response.status != 200) {
    alert("服务器繁忙")
  }
  return response
}, function (error) {
  // 这里是返回状态码不为200时候的错误处理
  if (err.toString().indexOf("timeout") != -1) {
    Toast({
      message: '请求超时，请稍后再试'
    });
  }
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '请求错误'
        break

      case 401:
        localStorage.XMDADMINTOKEN = "";
        err.message = '未授权，请登录';
        router.push({ path: '/Login' });

        break

      case 403:
        err.message = '拒绝访问'
        break

      case 404:
        err.message = `请求地址出错: ${err.response.config.url}`
        break
      case 405:
        err.message = `请求地址出错:`
        break
      case 408:
        err.message = '请求超时'
        break

      case 500:
        err.message = '网络错误，请稍后再试'
        break

      case 501:
        err.message = '网络错误，请稍后再试'
        break

      case 502:
        err.message = '网络错误，请稍后再试'
        break

      case 503:
        err.message = '网络错误，请稍后再试'
        break

      case 504:
        err.message = '网络错误，请稍后再试'
        break

      case 505:
        err.message = 'HTTP版本不受支持'
        break

      default:
    }
    if (err.response.data.msg) {
      err.message = err.response.data.msg;
    }
    Toast({
      message: err.message
    });
  }
  return Promise.reject(error)
})

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
