<template>
  <div>{{ contentRef }}</div>
  <n-button @click="themeRef = undefined">深色</n-button>
  <n-button @click="themeRef = undefined">浅色</n-button>
</template>

<script lang="ts" setup>
const contentRef = ref(null)
const themeRef = ref(undefined)
</script>
