<template>
  <div>
    <n-form ref="form" :model="queryForm" inline label-placement="left" label-width="auto">
      <n-form-item label="搜索日志">
        <n-input v-model:value="queryForm.logContent" clearable @change="handleQuery"></n-input>
      </n-form-item>
      <n-form-item label="创建时间">
        <n-date-picker v-model:value="queryForm.range" type="daterange" @update:value="handleQuery"></n-date-picker>
      </n-form-item>
    </n-form>
  </div>
  <div>
    <BasicTable ref="tableRef" :columns="columns" :request="loadTableData"></BasicTable>
  </div>
</template>

<script lang="ts" setup>
import BasicTable from "@/components/table/BasicTable.vue";
import dayjs from 'dayjs'
import http from "@/service/http";
import { ref } from 'vue'
let tableRef = ref();
// 请求参数、表头数据、请求、刷新数据、其他操作
const queryForm = reactive({
  logContent: '',
  range: [1663135260000, Date.now()],
  createTime_begin: '',
  createTime_end: ''
})
const columns = [
  {
    title: "日志内容",
    key: "logContent",
  },
  {
    title: "操作人id",
    key: "userid",
  },
  {
    title: "操作人名称",
    key: "username",
  },
  {
    title: "IP",
    key: "ip",
  },
  {
    title: "耗时(毫秒)",
    key: "costTime",
  },
  {
    title: "日志类型",
    key: "logType_dictText",
  },
  {
    title: "创建时间",
    key: "createTime",
  },
  {
    title: "操作",
    key: "actions",
  },
];
const loadTableData = async (res) => {
  return await http.get("/sys/log/list", {
    logContent: queryForm.logContent,
    createTime_begin: dayjs(queryForm.range[0]).format('YYYY-MM-DD') || '',
    createTime_end: dayjs(queryForm.range[1]).format('YYYY-MM-DD') || '',
    ...res
  });
};
const handleQuery = () => {
  tableRef.value.reload()
}
</script>
