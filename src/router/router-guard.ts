// import type { RouteRecordRaw } from "vue-router";
import { Router } from "vue-router";
// import { isNavigationFailure, Router } from "vue-router";
// import { userMainStore } from "@/store/modules/user";

const whitePathList = ["/login"];

export function createRouterGuards(router: Router) {
  // const userStore = userMainStore();
  router.beforeEach(async (to, from, next) => {
    // const Loading = window.$loading || null
    if (from.path === "/login" && to.name === "error") {
      next({ name: "home" });
      return;
    }
    if (whitePathList.includes(to.path)) {
      next();
      return;
    }
    const token = localStorage.getItem("X-Access-Token");
    if (!token) {
      if (to.meta.ignoreAuth) {
        next();
        return;
      }
      const redirectData: {
        path: string;
        replace: boolean;
        query?: Recordable<string>;
      } = {
        path: "/login",
        replace: true,
      };
      if (to.path) {
        redirectData.query = {
          ...redirectData.query,
          redirect: to.path,
        };
        next(redirectData);
        return;
      }
    }
  });
}
