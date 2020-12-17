import { Module, VuexModule, getModule } from "vuex-module-decorators";
import store from "page-web/store";

if (store.hasModule("app")) {
  store.unregisterModule("app");
}

@Module({ name: "app", dynamic: true, namespaced: true, store })
export default class AppModule extends VuexModule {
  static module() {
    return getModule(AppModule);
  }
}
