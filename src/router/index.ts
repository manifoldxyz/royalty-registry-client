import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from "@/views/HomePage.vue"
import LookupView from "@/views/LookupView.vue"
import ConfigureView from "@/views/ConfigureView.vue"

if (!process || process.env.NODE_ENV !== 'test') {
  Vue.use(VueRouter)
}

export const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/lookup',
    name: 'Lookup',
    component: LookupView,
  },
  {
    path: '/configure',
    name: 'Configure',
    component: ConfigureView,
  },
  {
    path: "*",
    redirect: { name: "HomePage" }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router
