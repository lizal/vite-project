<template>
  <n-message-provider>
    <n-dialog-provider>
      <n-config-provider :theme="darkTheme" :locale="zhCN">
        <div id="app">
          <router-view />
        </div>
      </n-config-provider>
    </n-dialog-provider>
  </n-message-provider>
</template>
<script lang="ts" setup>
import { darkTheme, zhCN } from "naive-ui";
const themeRef = ref(undefined)
</script>

<style lang="scss">
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
