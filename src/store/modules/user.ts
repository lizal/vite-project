import { defineStore } from "pinia";
import loginApi from "../../service/api/login/login";
import { ILoginParams } from "../../service/api/login/types";

export const userMainStore = defineStore({
  id: "user",
  state: () => ({
    name: "",
  }),
  // getters: {
  //   nameLength: (state) => state.name.length,
  //   name: (state) => state.name,
  // },
  actions: {
    async login(formData: ILoginParams) {
      return new Promise((resolve, reject) => {
        loginApi.login(formData).then((res) => {
          if (res.success) {
            this.name = res.result.userInfo.realname;
            localStorage.setItem(
              "userInfo",
              JSON.stringify(res.result.userInfo)
            );
            localStorage.setItem(
              "X-Access-Token",
              JSON.stringify(res.result.token)
            );
            resolve(res.result);
          } else {
            reject();
          }
        });
      });
    },
    async logout() {
      return new Promise((resolve, reject) => {
        loginApi.logout().then((res) => {
          if (res.success) {
            localStorage.removeItem("userInfo");
            localStorage.removeItem("X-Access-Token");
            resolve(res);
          } else {
            reject();
          }
        });
      });
    },
  },
});
