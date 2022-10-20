<template>
  <div>{{ contentRef }}</div>
  <n-button @click="themeRef = undefined">深色</n-button>
  <n-button @click="themeRef = undefined">浅色</n-button>
</template>

<script lang="ts">
export default defineComponent({
  setup() {
    return {
      contentRef: ref("main"),
      themeRef: ref(undefined),
    };
  },
});
</script>
