<template>
  <n-message-provider>
    <n-dialog-provider>
      <n-config-provider :theme="theme">
        <div id="app">
          <router-view />
        </div>
      </n-config-provider>
    </n-dialog-provider>
  </n-message-provider>
</template>
<script lang="ts">
import BaseLayout from "./components/layouts/BaseLayout.vue";
import { defineComponent, ref } from "vue";
import { darkTheme } from "naive-ui";

export default defineComponent({
  components: { BaseLayout },
  setup() {
    return {
      darkTheme,
      theme: ref(undefined),
    };
  },
  // data() {
  //   return {
  //     darkTheme,
  //     theme: ref(null),
  //   };
  // },
});
</script>

<style>
html,
body {
  height: 100%;
}
#app {
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.n-config-provider {
  height: 100%;
}
</style>
