import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'
import CardsBottom from '../components/CardsBottom.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/game',
      name: 'CardsBottom',
      component: CardsBottom
    }
  ]
})
