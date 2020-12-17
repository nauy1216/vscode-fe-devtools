/**
 * 调用示例
 * 定义返回数据格式接口
 * interface User {
 *   name:string;
 *   age:number
 * }
 * 传入定义好的接口
 * this.$ajax.get<User>(this.$api.main)
 *     .then((res) => {res.name})
 */

import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import axiosConfig from "./requestConfig";
import { Message } from "element-ui";
const service = axios.create(axiosConfig);
// import qs from "qs";
// Request interceptors
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // config.headers['Authorization'] = "56"
    let token = "";
    if (sessionStorage.getItem("token")) {
      token = JSON.parse(sessionStorage.getItem("token")!);
    }
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error: AxiosError) => {
    Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response: AxiosResponse<ResponseData<any>>) => {
    // 和后端定义好数据结构
    const { code, message, error } = response.data;
    if (code !== 200) {
      (Message as any)({
        type: "error",
        showClose: true,
        message: error || message
      });
      return Promise.reject(new Error(error || message || "Error"));
    }
    return response;
  },
  (error: AxiosError) => {
    //let message: string;
    switch (error.response!.status) {
      //   case 400:
      //     message = "请求错误(400)";
      //     break;
      case 401:
        //message = "未授权,请登录(401)";
        //清除信息
        sessionStorage.removeItem("userInfo");
        sessionStorage.removeItem("token");
        window.location.href = "/login";
        break;
      //   case 403:
      //     message = "拒绝访问(403)";
      //     break;
      //   case 404:
      //     message = `请求地址出错: ${error.response!.config.url}`;
      //     break;
      //   case 405:
      //     message = "请求方法未允许(405)";
      //     break;
      //   case 408:
      //     message = "请求超时(408)";
      //     break;
      //   case 500:
      //     message = "服务器内部错误(500)";
      //     break;
      //   case 501:
      //     message = "服务未实现(501)";
      //     break;
      //   case 502:
      //     message = "网络错误(502)";
      //     break;
      //   case 503:
      //     message = "服务不可用(503)";
      //     break;
      //   case 504:
      //     message = "网络超时(504)";
      //     break;
      //   case 505:
      //     message = "HTTP版本不受支持(505)";
      //     break;
      default:
      //message = `连接错误: ${error.message}`;
    }
    (Message as any)({
      type: "error",
      showClose: true
    });
    return Promise.reject(error);
  }
);

const axiosInstance = {
  get<T>(url: string, params?: any) {
    return new Promise((resolve, reject) => {
      service
        .get<ResponseData<T>>(url, {
          params
        })
        .then((response: AxiosResponse<ResponseData<T>>) => {
          resolve(response.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return new Promise((resolve, reject) => {
      service
        .post<ResponseData<T>>(url, data, config)
        .then((response: AxiosResponse<ResponseData<T>>) => {
          resolve(response.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  json<T = any>(url: string) {
    return new Promise((resolve, reject) => {
      axios
        .get<T>(url)
        .then((response: AxiosResponse<T>) => {
          if (response.status === 200) {
            resolve(response.data);
          }
        })
        .catch(err => {
          (Message as any)({
            type: "error",
            showClose: true,
            message: err.message
          });
          reject(err);
        });
    });
  }
  // delete(url: string, config?: AxiosRequestConfig) {
  //   return new Promise((resolve: ResolvedFn, reject: RejectedFn) => {});
  // },
  // head(url: string, config?: AxiosRequestConfig) {
  //   return new Promise((resolve: ResolvedFn, reject: RejectedFn) => {});
  // },
  // options(url: string, config?: AxiosRequestConfig) {
  //   return new Promise((resolve: ResolvedFn, reject: RejectedFn) => {});
  // },
  // put(url: string, config?: AxiosRequestConfig) {
  //   return new Promise((resolve: ResolvedFn, reject: RejectedFn) => {});
  // },
  // patch(url: string, config?: AxiosRequestConfig) {
  //   return new Promise((resolve: ResolvedFn, reject: RejectedFn) => {});
  // }
};

export default axiosInstance;
