// 这里不要做全局声明， 避免全局污染
// 如果需要在项目admin或者web定义全局属性， 请到各自项目的BaseVue声明
import axiosInstance from "api/index";
import api from "api/dict";
import Vue from "vue";
declare module "vue/types/vue" {
  export interface VueConstructor<V extends Vue = Vue & Record<string, any>> {
    new (options?: any): CombinedVueInstance<V, object, object, object, Record<keyof object, any>>;
  }

  interface Vue {
    $ajax: typeof axiosInstance;
    $api: typeof api;
  }
}
