import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

// 配置路由
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/index.vue'),
    meta: {},
    children: [],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
