<template>
  <div>
    <BasicTable :columns="columns" :data="data"></BasicTable>
  </div>
</template>

<script lang="ts" setup>
import BasicTable from "@/components/table/BasicTable.vue";

const columns = [
  {
    title: "title",
    key: "index",
  },
  {
    title: "name",
    key: "name",
  },
];
const data = [];
</script>
