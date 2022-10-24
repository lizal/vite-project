<template>
  <div>
    <n-form ref="form" :model="queryForm" inline label-placement="left" label-width="auto">
      <n-form-item label="搜索日志">
        <n-input v-model:value="queryForm.logContent" @change="handleQuery"></n-input>
      </n-form-item>
      <n-form-item label="创建时间">
        <n-date-picker v-model:value="queryForm.range" type="daterange"></n-date-picker>
      </n-form-item>
    </n-form>
  </div>
  <div>
    <BasicTable :columns="columns" :data="dataReactive.data" :loadData="loadTableData"></BasicTable>
  </div>
</template>

<script lang="ts" setup>
import BasicTable from "@/components/table/BasicTable.vue";
import http from "@/service/http";

const queryForm = reactive({
  logContent: '',
  range: [1663135260000, Date.now()]
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
const dataReactive = reactive({data: []});
const url = "/sys/log/list"
const loadTableData = async (res) => {
  return await http.get(url, { ...queryForm, ...res });
};
const handleQuery = () => {
  
}
</script>
