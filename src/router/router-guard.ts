import type { RouteRecordRaw } from "vue-router";
import { Router } from "vue-router";
// import { isNavigationFailure, Router } from "vue-router";
// import { userMainStore } from "@/store/modules/user";
import { useAsyncRouteStoreWidthOut } from "@/store/modules/asyncRoute";

const whitePathList = ["/login"];

export function createRouterGuards(router: Router) {
  // const userStore = userMainStore();
  const asyncRouteStore = useAsyncRouteStoreWidthOut();
  router.beforeEach(async (to, from, next) => {
    debugger;
    // const Loading = window.$loading || null
    if (from.path === "/login" && to.name === "error") {
      next({ path: "/" });
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
    if (asyncRouteStore.getIsDynamicAddedRoute) {
      next();
      return;
    }

    // const userInfo = await userStore.GetInfo();
    const routes = await asyncRouteStore.generateRoutes().then((res: any) => {
      // 动态添加可访问路由表
      res.forEach((item) => {
        router.addRoute(item as unknown as RouteRecordRaw);
      });
      const redirectPath = (from.query.redirect || to.path) as string;
      const redirect = decodeURIComponent(redirectPath);
      const nextData =
        to.path === redirect ? { ...to, replace: true } : { path: redirect };
      asyncRouteStore.setDynamicAddedRoute(true);
      console.log(nextData);
      next(nextData);
    });
  });
}
