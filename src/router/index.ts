import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Question from '@/modules/Question.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/finished',
    name: 'finished',
    component: () => import(/* webpackChunkName: "about" */ '../modules/finished.vue'),
  },
  {
    path: '/',
    name: 'Question',
    component: Question,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
