import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import VueRouter from 'vue-router';
import axios from 'axios';
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

window.axios = axios;
Vue.use(BootstrapVue)
Vue.use(VueRouter);

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
