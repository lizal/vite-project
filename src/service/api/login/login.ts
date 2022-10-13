import http from "@/service/http";
import * as T from "./types";

const loginApi: T.ILoginApi = {
  login(params) {
    return http.post("/sys/loginwithoutyzm", params);
  },
  logout() {
    return http.post("/sys/logout");
  },
  getPermissionList(params) {
    return http.get("/sys/permission/getUserPermissionByToken", params);
  },
};

export default loginApi;
