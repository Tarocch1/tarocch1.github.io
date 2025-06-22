import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '', component: () => import('@/pages/Home/index.vue'), children: [] },
]

export default routes
