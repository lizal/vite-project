<template>
  <n-button @click="themeRef = undefined">深色</n-button>
  <n-button @click="themeRef = undefined">浅色</n-button>
</template>
<script lang="ts">
import { darkTheme } from "naive-ui";
export default defineComponent({
  setup() {
    return {
      darkTheme,
      themeRef: ref(undefined),
    };
  },
  // data() {
  //   return {
  //     // darkTheme,
  //     // theme: ref(null),
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
