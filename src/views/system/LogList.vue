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
const data = [
  {
    id: 11,
    name: "1",
  },
  {
    id: 12,
    name: "2",
  },
  {
    id: 13,
    name: "3",
  },
  {
    id: 14,
    name: "4",
  },
];
</script>
