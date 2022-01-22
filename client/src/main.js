import { DEBUG } from './utils/settings'
import router from './router'
import store from './store'
import apolloProvider from './utils/apollo-client'
import Vue from 'vue'
import App from './App.vue'
import "./styles/style.css"

Vue.config.productionTip = DEBUG

new Vue({
  router,
  apolloProvider,
  store,
  render: h => h(App),
}).$mount('#app')
