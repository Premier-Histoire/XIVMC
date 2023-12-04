import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
  },
  // 他のルートをここに追加
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

