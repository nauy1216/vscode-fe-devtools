import { AxiosRequestConfig } from "axios";

const axiosConfig: AxiosRequestConfig = {
  baseURL: "/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json, text/json"
  }
  // transformRequest: [
  //   (data: any) => {
  //     //对data进行任意转换处理
  //     return data;
  //   }
  // ],
  // paramsSerializer: (params: any) => {
  //   return qs.stringify(params, { arrayFormat: "brackets" });
  // },
  // responseType: "json"
};

export default axiosConfig;
