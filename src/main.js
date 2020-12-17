import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
Vue.config.productionTip = false

// 此处只能用window.require
// import electron from 'electron'
const electron = window.require('electron');
Vue.prototype.$ipcRenderer = electron.ipcRenderer //全局挂载发送消息
Vue.prototype.$remote  = electron.remote  //全局挂载remote模块

// 配置落地
const Store = window.require('electron-store');
Vue.prototype.$electronStore = new Store();



import './permission' //挂载权限路由守卫

import dictionaries from '@/utils/dictionaries/dictionaries.js' //字典项
import commonUtils from '@/utils/commonUtils.js'
Vue.prototype.$dictionaries = dictionaries //全局挂载工具字典项
Vue.prototype.$commonUtils = commonUtils //全局挂载工具类

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';// 默认主题
import './style/theme/index.css' // 导入自定义主题
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
