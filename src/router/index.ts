import { App } from "vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { createRouterGuards } from "./router-guard";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    redirect: "/dashboard/analysis",
    component: () => import("@/components/layouts/BaseLayout.vue"),
  },
  {
    path: "/user",
    name: "user",
    redirect: "/user/login",
    component: () => import("@/components/layouts/RouteView.vue"),
    children: [
      {
        path: '/user/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/login/Login.vue')
      }
    ]
  },
  {
    path: "/404",
    name: "error",
    component: () => import("@/views/error/404.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export function setupRouter(app: App) {
  app.use(router);
  createRouterGuards(router);
}
export { routes };

export default router;
