<template>
  <div>{{ content }}</div>
  <n-button @click="theme = undefined">深色</n-button>
  <n-button @click="theme = undefined">浅色</n-button>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    return {
      content: ref("main"),
      theme: ref(undefined),
    };
  },
});
</script>
