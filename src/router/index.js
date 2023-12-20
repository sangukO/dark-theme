import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@views/HomeView.vue'
import TalkView from '@views/TalkView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/talk',
      name: 'talk',
      component: TalkView
    }
  ]
})

export default router
