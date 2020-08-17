import axios from "axios";
import { browserHistory } from "../routing";
import { message } from "antd";
import queryString from "query-string";

export const TOKEN_KEY = "access_token";

const errMessage = (data: any) => {
  if (data.detail) {
    message.error(data.detail);
  } else {
    try {
      let utf8decoder = new TextDecoder();
      let tempData = JSON.parse(utf8decoder.decode(data));
      message.error(tempData.detail);
    } catch (e) {}
  }
};

// request interceptor
axios.interceptors.request.use(
  config => {
    if (!config.headers.Authorization) {
      const token = localStorage.getItem(TOKEN_KEY);
      config.headers.Authorization = token ? `Bearer ${token}` : "";
    }
    return config;
  },
  error => {
    if (error.response.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
    }
    return Promise.reject(error);
  }
);

// response interceptor
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 401) {
      const errorMsg =
        error.response.data.error_description || error.response.data;
      if (errorMsg === "账户不存在" || errorMsg === "账户被冻结") {
        message.error(errorMsg);
      }
      // if (
      //   errorMsg.indexOf("Full") === -1 &&
      //   window.location.pathname !== "/login"
      // ) {
      //   message.error(errorMsg);
      // }
      if (window.location.pathname !== "/login") {
        localStorage.setItem("firstPathname", window.location.pathname);
        const permission = queryString.parse(window.location.search)
          .permission as string;
        localStorage.setItem("firstPermissionParam", permission);
      }
      browserHistory.push("/login");
      const username = localStorage.getItem("username");
      localStorage.removeItem(`lastSelectOrgId-${username}`);
      localStorage.removeItem(TOKEN_KEY);
    }
    if (error.response.status === 403) {
      message.error(error.response.data.detail);
    }
    if (error.response.status === 404) {
      message.error("接口/文件不存在！");
    }
    if (error.response.status === 500) {
      errMessage(error.response.data);
    }
    if (error.response.status === 400) {
      if (error.response.data.error === "invalid_grant") {
        message.error("用户名或密码错误");
      } else {
        message.warning(error.response.data.detail);
      }
    }
    return Promise.reject(error);
  }
);

export { axios };
