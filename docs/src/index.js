import Vue from 'vue'
import veneer from '@/index.js'
import Index from 'docs/components/Index.vue'
import List from 'docs/components/List.vue'
import Detail from 'docs/components/Detail.vue'

Vue.use(veneer, {
  el: '#app',
  routeMap: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/list/:page',
      component: List
    },
    {
      path: '/detail/:id',
      component: Detail
    }
  ]
})
