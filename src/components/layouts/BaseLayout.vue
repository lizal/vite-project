<template>
  <n-layout>
    <n-layout-header>
      <div class="top-navigation">
        <div class="mini-title">vue3</div>
        <div class="user-warpper">
          <span>{{ username }}</span>
          <n-button quaternary color="#fff" @click="logout">
            <template #icon>
              <n-icon size="20" color="#fff" style="margin-top: 0">
                <exit-outline />
              </n-icon>
            </template>
            退出登录
          </n-button>
        </div>
      </div>
    </n-layout-header>
    <n-layout has-sider style="height: calc(100% - 51px) !important">
      <n-layout-sider
        bordered
        show-trigger
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        :native-scrollbar="false"
      >
        <n-menu
          ref="menuInstRef"
          v-model:value="activeKeyRef"
          :accordion="true"
          :options="menuOptions"
          @update:value="handleUpdateValue"
        />
      </n-layout-sider>
      <div style="width: 100%">
        <n-breadcrumb style="height: 20px; padding: 10px">
          <n-breadcrumb-item>{{ activeTitle }}</n-breadcrumb-item>
        </n-breadcrumb>
        <n-layout-content
          content-style="padding: 10px; background-color:#f0f2f5;"
          style="height: calc(100% - 40px) !important"
        >
          <div
            style="
              height: calc(100% - 20px);
              padding: 10px;
              background-color: #fff;
              overflow: auto;
            "
          >
            <router-view />
          </div>
        </n-layout-content>
      </div>
    </n-layout>
  </n-layout>
</template>

<script lang="ts">
import { ExitOutline } from "@vicons/ionicons5";
import type { VNode } from "vue";
import { MenuInst } from "naive-ui";
import { userMainStore } from "../../store/modules/user";
import { useAsyncRouteStoreWidthOut } from "../../store/modules/asyncRoute";
interface MenuItem {
  label: string | (() => VNode);
  icon: () => VNode;
  key: string;
  children?: MenuItem[];
}

export default defineComponent({
  name: "BaseLayout",
  components: {
    ExitOutline,
  },
  setup() {
    window.$message = useMessage()
    window.$dialog = useDialog()
    const userStore = userMainStore();
    const routerStore = useAsyncRouteStoreWidthOut();
    // const menuData = reactive()
    const username = JSON.parse(
      localStorage.getItem("userInfo") || "{}"
    ).realname;
    const router = useRouter();
    let activeKeyRef = ref("");
    let activeItem = reactive({
      item: {
        label: "",
        icon: () => h("icon"),
        key: "",
      },
    });
    let routerData = [] as any[];
    routerStore.routers.forEach((item) => {
      if (item.children) {
        routerData = routerData.concat(item.children);
      } else {
        routerData.push(item);
      }
    });
    const menuInstRef = ref<MenuInst | null>(null);
    routerData.forEach((item) => {
      if (!item.children) {
        if (item.path === router.currentRoute.value.path) {
          activeKeyRef = ref(item.id);
          activeItem = reactive({
            item: {
              label: item.meta.title,
              icon: () => h("icon"),
              key: item.id,
            },
          });
          menuInstRef.value?.showOption(item.id);
        }
      } else {
        item.children.forEach((iItem) => {
          if (iItem.path === router.currentRoute.value.path) {
            activeKeyRef = ref(iItem.id);
            activeItem = reactive({
              item: {
                label: iItem.meta.title,
                icon: () => h("icon"),
                key: iItem.id,
              },
            });
            menuInstRef.value?.showOption(iItem.id);
          }
        });
      }
    });
    let activeTitle = computed(() => {
      const item = activeItem.item as MenuItem;
      let title = "";
      if (typeof item.label === "string") {
        title = item.label;
      } else {
        title = (item || {}).label().children.default() || "";
      }
      return title;
    });
    console.log(routerStore);
    return {
      activeKeyRef,
      activeItem,
      activeTitle,
      username,
      menuOptions: routerStore.menus,
      logout: () => {
        window.$dialog.warning({
          title: "提示",
          content: "确定退出登录吗？",
          negativeText: "取消",
          positiveText: "确定",
          onPositiveClick: () => {
            userStore.logout().then(() => {
              window.$message.success("退出登录成功");
              router.push({
                name: "login",
              });
            });
          },
        });
      },
      handleUpdateValue: (key: string, item: MenuItem) => {
        activeKeyRef = ref(key);
        activeItem.item = item;
        console.log(activeItem);
      },
    };
  },
});
</script>

<style lang="scss" scoped>
.n-layout,
.n-layout-sider {
  height: 100% !important;
}
.n-layout-sider {
  max-height: 100% !important;
}
.mini-title {
  width: 220px;
  text-align: center;
  font-size: 18px;
}
.n-layout-content {
  height: calc(100% - 60px) !important;
}
.top-navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  border-bottom: 1px solid rgb(239, 239, 245);
  background-color: #18a058;
  color: #fff;
}
.user-warpper {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 200px;
}
</style>
