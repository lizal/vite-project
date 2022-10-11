import { toRaw, reactive, h } from "vue";
import { defineStore } from "pinia";
import { RouteRecordRaw } from "vue-router";
import { routes as asyncRoutes } from "@/router/index";
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

interface TreeHelperConfig {
  id: string;
  children: string;
  pid: string;
}

const getConfig = (config: Partial<TreeHelperConfig>) =>
  Object.assign({}, config);

export interface IAsyncRouteState {
  menus: RouteRecordRaw[];
  routers: any[];
  addRouters: any[];
  keepAliveComponents: string[];
  isDynamicAddedRoute: boolean;
}

function filter<T = any>(
  tree: T[],
  func: (n: T) => boolean,
  config: Partial<TreeHelperConfig> = {}
): T[] {
  config = getConfig(config);
  const children = config.children as string;

  function listFilter(list: T[]) {
    return list
      .map((node: any) => ({ ...node }))
      .filter((node) => {
        node[children] = node[children] && listFilter(node[children]);
        return func(node) || (node[children] && node[children].length);
      });
  }
  return listFilter(tree);
}

interface RouteItem {
  component: any;
  name: string;
  path: string;
  redirect?: string;
  hidden: boolean;
  meta: {
    url: string;
    title: string;
    icon?: string;
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

function generateChildRouters<T extends RouteItem>(data: T[]) : T[] {
  let routers= [] as any[]
  for (let item of data) {
    let component = '', dirPath = ''
    dirPath = item.component
    if(item.component.indexOf("layouts") >= 0) {
      component = "@/components/" + dirPath
    } else {
      component = "@/pages/" + dirPath + ".vue"
    }
    let URL = (item.meta.url || "").replace(/{{([^}}]+)?}}/g, (s1, s2) => eval(s2)); // URL支持{{ window.xxx }}占位符变量
    if (isURL(URL)) {
      item.meta.url = URL;
    }
    let componentPath = () => require(component);
    let menu: RouteItem = {
      path: item.path,
      name: item.name,
      redirect: item.redirect,
      component: componentPath,
      hidden: item.hidden,
      meta: {
        title: item.meta.title,
        icon: item.meta.icon,
        url: item.meta.url,
        permissionList: item.meta.permissionList,
        keepAlive: item.meta.keepAlive,
        internalOrExternal: item.meta.internalOrExternal
      },
    };
    if (item.children && item.children.length > 0) {
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
  label: string;
  icon: () => VNode;
  key: string;
  children? : MenuItem[];
}

function revertMenu(menuData) {
  let resultData = [] as MenuItem[]
  menuData.forEach(item => {
    let menu: MenuItem = {
      label: item.meta.title,
      icon: renderIcon(BookIcon),
      key: item.id,
    }
    if(item.children && item.children.length) {
      menu.children = revertMenu(item.children)
    }
    resultData.push(menu)
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
    async generateRoutes(data) {
      debugger
      const userStore = userMainStore()
      userStore.getPermissions().then((res:MenuResult) => {
        let menuList = reactive(res.menu)
        menuList = menuList.filter((item) => !item.hidden)
        menuList = revertMenu(menuList)
        this.setMenus(menuList)
        // generateChildRouters(menuList)
      })
      let accessedRouters;
      const permissionsList = data.permissions || [];
      const routeFilter = (route) => {
        const { meta } = route;
        const { permissions } = meta || {};
        if (!permissions) return true;
        return permissionsList.some((item) => permissions.includes(item.value));
      };
      //临时使用静态路由，后续替换
      try {
        //过滤账户是否拥有某一个权限，并将菜单从加载列表移除
        accessedRouters = filter(asyncRoutes, routeFilter);
      } catch (error) {
        console.log(error);
      }
      accessedRouters = accessedRouters.filter(routeFilter);
      this.setRouters(accessedRouters);
      // this.setMenus(accessedRouters);
      return toRaw(accessedRouters);
    },
  },
});

export function useAsyncRouteStoreWidthOut() {
  return useAsyncRouteStore(store);
}