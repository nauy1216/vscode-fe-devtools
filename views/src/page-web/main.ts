import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "page-web/style/var.scss";
import "page-web/style/reset.scss";
import { Component } from "vue-property-decorator";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Component.registerHooks(["beforeRouteEnter", "beforeRouteLeave", "beforeRouteUpdate"]);

Vue.use(ElementUI, {
  size: "mini"
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
