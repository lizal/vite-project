<template>
  <div class="login-wrap">
    <n-space vertical :size="[20, 20]">
      <n-space>
        <n-icon size="28">
          <person-outline />
        </n-icon>
        <n-input
          v-model:value="formData.username"
          size="large"
          placeholder="用户名"
          style="width: 560px"
        ></n-input>
      </n-space>
      <n-space>
        <n-icon size="28">
          <lock-closed-outline />
        </n-icon>
        <n-input
          v-model:value="formData.password"
          size="large"
          type="password"
          placeholder="密码"
          style="width: 560px"
        ></n-input>
      </n-space>
    </n-space>
    <div class="login-btn">
      <n-button size="large" color="#40a9ff" style="width: 100%" @click="toHome"
        >登录</n-button
      >
    </div>
  </div>
  <div></div>
</template>

<script lang="ts">
import { useRouter } from "vue-router";
import { PersonOutline, LockClosedOutline } from "@vicons/ionicons5";
import { ILoginParams } from "../../service/api/login/types";
import { userMainStore } from "../../store/modules/user";
export default defineComponent({
  components: {
    PersonOutline,
    LockClosedOutline,
  },
  setup() {
    const router = useRouter();
    const userStore = userMainStore();
    let formData: ILoginParams = reactive({ username: "", password: "" });
    return {
      formData,
      toHome: () => {
        userStore.login(formData).then((res) => {
          console.log(res);
          router.push({
            path: "/",
          });
        });
      },
    };
  },
});
</script>

<style scoped>
.login-wrap {
  position: absolute;
  left: 50%;
  margin-top: 300px;
  margin-left: -300px;
  width: 600px;
}
.login-btn {
  margin-top: 20px;
  text-align: center;
}
</style>
