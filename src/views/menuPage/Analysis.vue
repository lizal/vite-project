<template>
  <n-button @click="changeTheme('dark')">深色</n-button>
  <n-button @click="changeTheme('light')">浅色</n-button>
</template>

<script lang="ts" setup>
const changeTheme = (theme) => {
  localStorage.setItem('theme', theme)
}
</script>
