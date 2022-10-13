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
    component: () => import("@/views/login/Login.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/menuPage/Index.vue"),
  },
  {
    path: "/analysis",
    name: "analysis",
    component: () => import("@/views/menuPage/Analysis.vue"),
  },
  {
    path: "/404",
    name: 'error',
    component: () => import("@/views/error/404.vue")
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
