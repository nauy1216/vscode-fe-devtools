declare module "vue-draggable-resizable-gorkys";
declare module "swiper/swiper-bundle.min.js" {}
declare module "tyshemo";
declare module "throttle-debounce" {
  type CallBack = (...args: any[]) => void;
  interface Throttle {
    <T extends CallBack>(delay: number, callback?: T): T;
    <T extends CallBack>(delay: number, noTrailing: boolean, callback?: T, debounceMode?: boolean): T;
  }

  interface Debounce {
    <T extends CallBack>(delay: number, callback?: T): T;
    <T extends CallBack>(delay: number, atBegin: boolean, callback?: T): T;
  }

  const throttle: Throttle;
  const debounce: Debounce;
}
