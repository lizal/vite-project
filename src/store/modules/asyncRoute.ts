import { toRaw, reactive, h } from "vue";
import { defineStore } from "pinia";
import { RouteRecordRaw, RouterLink } from "vue-router";
// import { routes as asyncRoutes } from "@/router/index";
import { store } from '@/store';
import { userMainStore } from './user'
import { NIcon } from "naive-ui";
import type { VNode } from 'vue'

import {
  BookOutline as BookIcon,
  PersonOutline as PersonIcon,
  WineOutline as WineIcon,
} from "@vicons/ionicons5";

function renderIcon(icon: any) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

export interface IAsyncRouteState {
  menus: RouteRecordRaw[];
  routers: any[];
  addRouters: any[];
  keepAliveComponents: string[];
  isDynamicAddedRoute: boolean;
}

interface RouteItem {
  component: any;
  name: string;
  path: string;
  redirect?: string;
  meta: {
    url: string;
    title: string;
    icon?: string;
    hidden?: boolean;
    keepAlive: boolean;
    internalOrExternal?: boolean;
    permissionList?: object[];
  };
  children?: RouteItem[];
  route?: string;
}

interface MenuResult {
  menu: any[];
}

function isURL(s) {
  return /^http[s]?:\/\/.*/.test(s);
}

function getModules() {
  return import.meta.glob('../../views/**/*.vue')
}

function generateChildRouters<T extends RouteItem>(data: T[]) : T[] {
  let routers= [] as any[]
  const modules = getModules()
  for (let item of data) {
    let component = '', dirPath = '', componentPath
    dirPath = item.component
    if(item.component.indexOf("layouts") === -1) {
      component = "../../views/" + dirPath + ".vue"
      componentPath = modules[component]
    } else {
      componentPath = import.meta.glob('../../components/BaseLayout.vue')['../../components/BaseLayout.vue']
    }
    let URL = (item.meta.url || "").replace(/{{([^}}]+)?}}/g, (s1, s2) => eval(s2)); // URL支持{{ window.xxx }}占位符变量
    if (isURL(URL)) {
      item.meta.url = URL;
    }
    let menu: RouteItem = {
      name: item.name,
      path: item.path,
      redirect: item.redirect,
      component: componentPath,
      meta: {
        title: item.meta.title,
        icon: item.meta.icon,
        url: item.meta.url,
        hidden: item.meta.hidden,
        permissionList: item.meta.permissionList,
        keepAlive: item.meta.keepAlive,
        internalOrExternal: item.meta.internalOrExternal
      },
    };
    if (item.children && item.children.length > 0) {
      debugger
      menu.children = [...generateChildRouters(item.children)];
    }
    //判断是否生成路由
    if (item.route && item.route === "0") {
      //console.log(' 不生成路由 item.path：  '+item.path);
    } else {
      routers.push(menu);
    }
  }
  return routers
}

interface MenuItem {
  label: string|(()=> VNode);
  icon: () => VNode;
  key: string;
  children? : MenuItem[];
}

function revertMenu(menuData) {
  let resultData = [] as MenuItem[]
  menuData.forEach(item => {
    if(!item.hidden){
      let menu: MenuItem = {
        // label: item.children ? item.meta.title: () =>
        // h(
        //   RouterLink,
        //   {
        //     to: {
        //       path: item.path,
        //     }
        //   },
        //   { default: () => item.meta.title }
        // ),
        label: item.meta.title,
        icon: renderIcon(BookIcon),
        key: item.id,
      }
      if(item.children && item.children.length) {
        menu.children = revertMenu(item.children)
      }
      resultData.push(menu)
    }
  })
  return resultData
}

export const useAsyncRouteStore = defineStore({
  id: "async-route",
  state: (): IAsyncRouteState => ({
    menus: [],
    routers: [],
    addRouters: [],
    keepAliveComponents: [],
    isDynamicAddedRoute: false,
  }),
  getters: {
    getIsDynamicAddedRoute(): boolean {
      return this.isDynamicAddedRoute;
    },
  },
  actions: {
    setDynamicAddedRoute(added: boolean) {
      this.isDynamicAddedRoute = added;
    },
    setRouters(routers) {
      this.addRouters = routers;
      this.routers = routers;
    },
    setMenus(menus) {
      this.menus = menus;
    },
    setKeepAliveComponents(compNames) {
      this.keepAliveComponents = compNames;
    },
    async generateRoutes() {
      debugger
      const userStore = userMainStore()
      return new Promise((resolve) => {
        userStore.getPermissions().then((res:MenuResult) => {
          //生成菜单
          let menuList = reactive(res.menu)
          menuList = menuList.filter((item) => !item.meta.hidden)
          menuList = revertMenu(menuList)
          console.log(menuList)
          this.setMenus(menuList)
          //生成路由
          let accessedRouters;
          const permissionsList = reactive(res.menu) || [];
          const routeFilter = (route) => {
            const { meta } = route;
            const { roles } = meta || {};
            if (!roles) return true;
            return permissionsList.some((item) => !item.hidden);
          };
          try {
            //过滤账户是否拥有某一个权限，并将菜单从加载列表移除
            accessedRouters = generateChildRouters(permissionsList);
          } catch (error) {
            console.log(error);
          }
          console.log(accessedRouters)
          accessedRouters = accessedRouters.filter(routeFilter);
          this.setRouters(accessedRouters);
          console.log('accessedRouters', accessedRouters)
          resolve(toRaw(accessedRouters))

        })

      })
    },
  },
});

export function useAsyncRouteStoreWidthOut() {
  return useAsyncRouteStore(store);
}