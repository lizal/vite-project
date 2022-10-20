<template>
  <div>{{ contentRef }}</div>
</template>

<script lang="ts">
export default defineComponent({
  setup() {
    return {
      contentRef: ref(null),
    };
  },
});
</script>
