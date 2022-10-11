import { App } from "vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import {createRouterGuards} from './router-guard'

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/pages/login/Login.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/pages/menuPage/Index.vue"),
  },
  {
    path: "/analysis",
    name: "analysis",
    component: () => import("@/pages/menuPage/Analysis.vue"),
  },
  {
    path: "/404",
    name: 'error',
    component: () => import("@/pages/error/404.vue")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export function setupRouter(app: App) {
  app.use(router)
  createRouterGuards(router)
}
export {
  routes
};

export default router;
