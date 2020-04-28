import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Calendar from '../views/Calendar/index.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Calendar",
    component: Calendar
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
