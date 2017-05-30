import Vue from 'vue'
import Router from 'vue-router'
import Temp from '@/components/TempChart'
import CounterCompTest from '@/components/CounterCompTest'
import LoadingComponent from '@/components/LoadingComponent'
import ErrorComponent from '@/components/ErrorComponent'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/trivia',
      name: 'Trivia',
      component: Temp
    },
    {
      path: '/stats',
      name: 'Statistics',
      component: CounterCompTest
    },
    {
      path: '/loading',
      name: 'LoadingComponent',
      component: LoadingComponent
    },
    {
      path: '/error',
      name: 'ErrorComponent',
      component: ErrorComponent
    },
    {
      path: '/',
      redirect: '/loading'
    }
  ]
})
