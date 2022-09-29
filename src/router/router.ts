import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
