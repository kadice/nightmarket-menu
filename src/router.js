import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/index.vue'
import Count from './pages/Count.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/count', component: Count },
]

const router = createRouter({
  history: createWebHistory('/nightmarket-menu/'),  // ✅ 設定正確的 base 路徑
  routes,
})

export default router
