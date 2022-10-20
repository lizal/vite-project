import axios, { AxiosRequestConfig } from "axios";
import NProgress from "nprogress";
import { ResType } from "./type";
import { userMainStore } from "@/store/modules/user";

axios.defaults.baseURL = "/vzs";
axios.defaults.timeout = 15000;
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";
axios.interceptors.request.use(
  (config): AxiosRequestConfig<any> => {
    const token = window.localStorage.getItem("X-Access-Token");
    if (token) {
      (config.headers || {})["X-Access-Token"] = token;
    }
    return config;
  },
  (error: any) => {
    return error;
  }
);

axios.interceptors.response.use((res: any) => {
  
  return res;
}, (error) => {
  if(error.response) {
    const router = useRouter();
    const userStore = userMainStore();
    let data = error.response.data
    switch (error.response.status) {
      case 401:
        window.$message.error("未授权，请重新登录");
        userStore.logout().then(() => {
          window.$message.success("退出登录成功");
          router.push({
            name: "login",
          });
        });
        break
      case 403:
        window.$message.error("拒绝访问");
        break
      case 404:
        window.$message.error("很抱歉，资源未找到!");
        break
        case 500:
        window.$dialog.warning({
          title: "提示",
          content: "登录失效，请重新登录！",
          positiveText: "确定",
          onPositiveClick: () => {
            userStore.logout().then(() => {
              window.$message.success("退出登录成功");
              router.push({
                name: "login",
              });
            });
          },
        });
        break;
      default:
        window.$message.error(data.message);
        break
    }
  }
});

interface Http {
  get<T>(url: string, params?: unknown): Promise<ResType<T>>;
  post<T>(url: string, params?: unknown): Promise<ResType<T>>;
  put<T>(url: string, params?: unknown): Promise<ResType<T>>;
  delete<T>(url: string, params?: unknown): Promise<ResType<T>>;
  upload<T>(url: string, params?: unknown): Promise<ResType<T>>;
  download(url: string, params?: unknown): void;
}

const http: Http = {
  get(url, params) {
    return new Promise((resolve, reject) => {
      NProgress.start();
      axios
        .get(url, { params })
        .then((res) => {
          NProgress.done();
          resolve(res.data);
        })
        .catch((err) => {
          NProgress.done();
          reject(err.data);
        });
    });
  },
  post(url, params) {
    return new Promise((resolve, reject) => {
      NProgress.start();
      axios
        .post(url, JSON.stringify(params))
        .then((res) => {
          NProgress.done();
          resolve(res.data);
        })
        .catch((err) => {
          NProgress.done();
          reject(err.data);
        });
    });
  },
  put(url, params) {
    return new Promise((resolve, reject) => {
      NProgress.start();
      axios
        .put(url, JSON.stringify(params))
        .then((res) => {
          NProgress.done();
          resolve(res.data);
        })
        .catch((err) => {
          NProgress.done();
          reject(err.data);
        });
    });
  },
  delete(url, params) {
    return new Promise((resolve, reject) => {
      NProgress.start();
      axios
        .delete(url, { params })
        .then((res) => {
          NProgress.done();
          resolve(res.data);
        })
        .catch((err) => {
          NProgress.done();
          reject(err.data);
        });
    });
  },
  upload(url, file) {
    return new Promise((resolve, reject) => {
      NProgress.start();
      axios
        .post(url, file, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          NProgress.done();
          resolve(res.data);
        })
        .catch((err) => {
          NProgress.done();
          reject(err.data);
        });
    });
  },
  download(url) {
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = url;
    iframe.onload = function () {
      document.body.removeChild(iframe);
    };
    document.body.appendChild(iframe);
  },
};

export default http;
