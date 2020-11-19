import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '@/modules/Home.vue';
import Question from '@/modules/Question.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../modules/About.vue'),
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
