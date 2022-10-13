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
          v-model:value="activeKey"
          :accordion="true"
          :options="menuOptions"
          @update:value="handleUpdateValue"
        />
      </n-layout-sider>
      <div style="width: 100%">
        <n-breadcrumb style="height: 20px; padding: 10px">
          <n-breadcrumb-item>{{ activeMenuTitle }}</n-breadcrumb-item>
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
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { MenuOption, useDialog, useMessage } from "naive-ui";
import { userMainStore } from "../store/modules/user";
import { useAsyncRouteStoreWidthOut } from "../store/modules/asyncRoute";

export default defineComponent({
  name: "BaseLayout",
  components: {
    ExitOutline,
  },
  setup() {
    const dialog = useDialog();
    const message = useMessage();
    const userStore = userMainStore();
    const routerStore = useAsyncRouteStoreWidthOut();
    // const menuData = reactive()
    const username = JSON.parse(
      localStorage.getItem("userInfo") || "{}"
    ).realname;
    const router = useRouter();
    let activeKey = "";
    let activeMenuTitle = "";
    console.log(routerStore.menus);
    return {
      activeKey,
      activeMenuTitle,
      username,
      menuOptions: routerStore.menus,
      logout: () => {
        dialog.warning({
          title: "提示",
          content: "确定退出登录吗？",
          negativeText: "取消",
          positiveText: "确定",
          onPositiveClick: () => {
            userStore.logout().then(() => {
              message.success("退出登录成功");
              router.push({
                name: "login",
              });
            });
          },
        });
      },
      handleUpdateValue: (key: string, item: MenuOption) => {
        activeKey = key;
        activeMenuTitle = item.label || "";
        console.log(activeMenuTitle);
      },
    };
  },
});
</script>

<style scoped>
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
