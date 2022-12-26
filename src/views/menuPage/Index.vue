<template>
  <n-button @click="themeRef = undefined">深色</n-button>
  <n-button @click="themeRef = undefined">浅色</n-button>
  <div>123</div>
</template>
<script lang="ts" setup>
import { darkTheme } from "naive-ui";
const darkTheme = ref(darkTheme)
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
