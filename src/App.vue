<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import BaseLayout from "./components/BaseLayout.vue";
</script>

<template>
  <n-config-provider :theme="theme">
    <BaseLayout>
      <n-button @click="theme = darkTheme">深色</n-button>
      <n-button @click="theme = null">浅色</n-button>
    </BaseLayout>

  </n-config-provider>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { darkTheme } from 'naive-ui'

export default defineComponent({
  setup() {
    return {
      darkTheme,
      theme: ref(null)
    }
  },
  data() {
    return {
      darkTheme,
      theme: ref(null)
    }
  }
})
</script>

<style>
html, body{
  height: 100%;
}
#app {
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.n-config-provider{
  height: 100%;
}
</style>
