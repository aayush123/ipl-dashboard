import Vue from 'vue'
import Router from 'vue-router'
import StatisticsComponent from '@/components/StatisticsComponent'
import LoadingComponent from '@/components/LoadingComponent'
import ErrorComponent from '@/components/ErrorComponent'
import TriviaComponent from '@/components/TriviaComponent'
import PageNotFoundComponent from '@/components/PageNotFoundComponent'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/trivia',
      name: 'Trivia',
      component: TriviaComponent
    },
    {
      path: '/stats',
      name: 'Statistics',
      component: StatisticsComponent
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
    },
    {
      path: '*',
      component: PageNotFoundComponent
    }
  ]
})
