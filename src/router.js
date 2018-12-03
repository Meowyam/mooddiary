import Vue from 'vue'
import Router from 'vue-router'
import CurrentMood from './components/CurrentMood.vue'
import List from './components/List.vue'
import Grid from './components/Grid.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'currentmood',
      component: CurrentMood
    },
    {
        path: '/list',
        name: 'list',
        component: List
    },
    {
        path: '/grid',
        name: 'grid',
        component: Grid
    },    
  ]
})
