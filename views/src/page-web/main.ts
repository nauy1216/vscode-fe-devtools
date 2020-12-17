import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "page-web/style/var.scss";
import "page-web/style/reset.scss";
import { Component } from "vue-property-decorator";
Component.registerHooks(["beforeRouteEnter", "beforeRouteLeave", "beforeRouteUpdate"]);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
