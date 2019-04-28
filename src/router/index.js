import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/home/HelloWorld' // HelloWorld

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    }
  ]
})
