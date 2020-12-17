import { createDecorator } from "vue-class-component";
import { debounce, throttle } from "throttle-debounce";

export function Debounce(delay = 300) {
  return createDecorator(function(componentOptions, key) {
    if (componentOptions.methods) {
      componentOptions.methods[key] = debounce(delay, componentOptions.methods[key]);
    }
  });
}

export function Throttle(delay = 300) {
  return createDecorator(function(componentOptions, key) {
    if (componentOptions.methods) {
      componentOptions.methods[key] = throttle(delay, componentOptions.methods[key]);
    }
  });
}
