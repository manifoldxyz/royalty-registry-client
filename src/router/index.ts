import Vue from 'vue'
import VueRouter from 'vue-router'
import LookupView from "@/views/LookupView.vue"

if (!process || process.env.NODE_ENV !== 'test') {
  Vue.use(VueRouter)
}

export const routes = [
  {
    path: '/',
    name: 'HomePage',
    redirect: '/lookup'
  },
  {
    path: '/lookup',
    name: 'Lookup',
    component: LookupView,
  },
  {
    path:'/lookup/:address/:id/',
    name: 'Lookup-Results',
    component: LookupView
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

/**
 * Route Navigation Guards
 *
 *   LOGGED OUT
 *     - locked out of every route except '/'
 *
 *   LOGGED IN
 *     - locked out of '/' and redirect it to '/contracts'
 *
 *   TOKENS PAGE
 *     - cannot be accessed manually via URL
 *
 * Ref: https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards
 */
// router.beforeEach((to, from, next) => {
//   const loggedIn = store.jwt && store.walletAddress
//   if (loggedIn && to.path === '/') {
//     return next()
//   } else if ((!loggedIn) && to.path !== '/') {
//     return next()
//   } else {
//     return next()
//   }
// })

export default router
