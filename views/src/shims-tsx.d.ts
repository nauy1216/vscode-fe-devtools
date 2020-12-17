// eslint-disable-next-line
import Vue, { VNode, CreateElement } from "vue";

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
  interface ResponseData<T = any> {
    code?: number;
    details?: T;
    error?: string;
    message?: string;
    [key: string]: any;
  }

  type ResponseDetail<R> = ReturnType<R> extends Promise<infer T> ? (T extends ResponseData<infer D> ? D : unknown) : unknown;
  type ItemOfArray<T> = T extends Array<infer I> ? I : unknown;
}
