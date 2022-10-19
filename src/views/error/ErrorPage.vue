<template>
  <div>{{ content }}</div>
</template>

<script lang="ts">
export default defineComponent({
  setup() {
    return {
      content: ref(null),
    };
  },
});
</script>
