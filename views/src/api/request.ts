import axiosInstance from "./index";

export function login(param: {
  ad_name: string; //用户名
  ad_passwd: string; //密码
}) {
  return axiosInstance.post<{
    basic: {
      ad_id: number;
      ad_name: string;
      ad_passwd: string;
      ad_passwd_salt: string;
      ad_status: number;
      ad_createtime: number;
      ad_logintime: number;
    };
    token: string;
  }>("/login", param);
}
