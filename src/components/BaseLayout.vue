<template>
  <n-layout has-sider>
    <n-layout-sider
      bordered
      show-trigger
      collapse-mode="width"
      :collapsed-width="64"
      :width="240"
      :native-scrollbar="false"
      style="max-height: 320px"
    >
      <div></div>
      <n-menu
        :accordion="true"
        v-model:value="activeKey"
        :options="menuOptions"
        @update:value="handleUpdateValue"
      />
    </n-layout-sider>
    <div class="layout-left" style="width: 100%">
      <div class="top-navigation">
        <div class="user-warpper">
          {{ username }}
          <n-button quaternary circle @click="logout">
            <template #icon>
              <n-icon size="24">
                <exit-outline />
              </n-icon>
            </template>
          </n-button>
        </div>
      </div>
      <n-breadcrumb>
        <n-breadcrumb-item>{{ activeKey }}</n-breadcrumb-item>
      </n-breadcrumb>
      <n-layout-content content-style="padding: 20px;">
        <template #default> </template>
      </n-layout-content>
    </div>
  </n-layout>
</template>

<script lang="ts">
import { ExitOutline } from "@vicons/ionicons5";
import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";
import { MenuOption } from "naive-ui";
import { userMainStore } from "../store/modules/user";
import { useAsyncRouteStoreWidthOut } from "../store/modules/asyncRoute";


export default defineComponent({
  name: "BaseLayout",
  components: {
    ExitOutline,
  },
  setup() {
    const userStore = userMainStore();
    const routerStore = useAsyncRouteStoreWidthOut()
    const menuData = reactive(routerStore.menus)
    console.log(menuData)
    const username = JSON.parse(
      localStorage.getItem("userInfo") || ""
    ).realname;
    const router = useRouter();
    let activeKey = "";
    let activeMenu = {};
    return {
      activeKey,
      activeMenu,
      username,
      menuOptions: menuData,
      logout: () => {
        userStore.logout().then(() => {
          router.push({
            name: "login",
          });
        });
      },
      handleUpdateValue: (key: string, item: MenuOption) => {
        console.log(item);
        activeKey = key;
        activeMenu = item;
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
.n-layout-content {
  height: calc(100% - 60px) !important;
}
.top-navigation {
  padding: 8px 12px;
  border-bottom: 1px solid rgb(239, 239, 245);
}
.user-warpper {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
