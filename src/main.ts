import Vue from 'vue'
import App from './App.vue'
import MConnection from "@manifoldxyz/connect-widget"
import { NETWORK, FALLBACK_PROVIDER } from "@/constants"
import store from "@/store"
import router from './router'

const options: any = {
  network: NETWORK,
  fallbackProvider: FALLBACK_PROVIDER,
}

Vue.use(MConnection.SimpleConnect, options)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
