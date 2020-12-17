import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import PageShow from "page-web/views/page-show/index.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "PageShow",
    component: PageShow
  }
];

const router = new VueRouter({
  routes
});

export default router;
