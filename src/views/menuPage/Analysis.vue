<template>
  <div>{{ content }}</div>
  <n-button @click="theme = undefined">深色</n-button>
  <n-button @click="theme = undefined">浅色</n-button>
</template>

<script lang="ts">
export default defineComponent({
  setup() {
    return {
      content: ref(null),
      theme: ref(undefined),
    };
  },
});
</script>
