import { Route, RawLocation } from "vue-router";

export * from "vue-router";
export type NextTo = RawLocation | false | ((vm: Vue) => void);
export type NextFunc = (to?: RawLocation | false | ((vm: Vue) => void)) => void;
export interface BeforeRouteEnter {
  beforeRouteEnter(to: Route, from: Route, next: NextFunc): void;
}

export interface BeforeRouteLeave {
  beforeRouteLeave(to: Route, from: Route, next: NextFunc): void;
}

export interface BeforeRouteUpdate {
  beforeRouteUpdate(to: Route, from: Route, next: NextFunc): void;
}
