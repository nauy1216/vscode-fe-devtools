<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script lang="ts">
import BaseVue from "page-web/BaseVue";
import { Component } from "vue-property-decorator";

@Component
export default class App extends BaseVue {}
</script>
<style scoped lang="scss">
#app {
  user-select: none;
}
</style>
