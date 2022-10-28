<template>
  <div>
    <n-form ref="form" :model="queryForm" inline label-placement="left" label-width="auto">
      <n-form-item label="字典名称">
        <n-input v-model:value="queryForm.dictName" clearable @change="handleQuery"></n-input>
      </n-form-item>
      <n-form-item label="字典编号">
        <n-input v-model:value="queryForm.dictCode" clearable @change="handleQuery"></n-input>
      </n-form-item>
    </n-form>
  </div>
  <div>
    <BasicTable ref="tableRef" :columns="columns" :request="loadTableData"></BasicTable>
  </div>
  <dict-drawer :show="showDrawer" :dictId="dictId"></dict-drawer>
</template>

<script lang="ts" setup>
import BasicTable from "@/components/table/BasicTable.vue";
import DictDrawer from './modules/DictDrawer.vue'
import http from "@/service/http";
import { NButton, NSpace } from "naive-ui";

let tableRef = ref();
// 请求参数、表头数据、请求、刷新数据、其他操作
const queryForm = reactive({
  dictName: '',
  dictCode: ''
})
const showDrawer = ref(false)
const dictId = ref('')
const columns = [
  {
    title: "字典名称",
    key: "dictName",
  },
  {
    title: "字典编号",
    key: "dictCode",
  },
  {
    title: "描述",
    key: "description",
  },
  {
    title: "操作",
    key: "actions",
    render (row) {
      const btns =  [
        h(NButton, {
          text: true,
          tag: 'a',
          'text-color': '#18a058',
          onClick: () => handleEdit(row)
        },{
          default: () => '编辑'
        }),
        h(NButton, {
          text: true,
          tag: 'a',
          'text-color': '#18a058',
          onClick: () => handleConfig(row)
        },{
          default: () => '字典配置'
        }),
        h(NButton, {
          text: true,
          tag: 'a',
          'text-color': '#18a058',
          onClick: () => handleDelete(row)
        },{
          default: () => '删除'
        })
      ]
      return h(NSpace, {

      }, {default: () => btns})
    }
  },
];
const loadTableData = async (res) => {
  return await http.get("/sys/dict/list", {
    ...queryForm,
    ...res
  });
};
const handleQuery = () => {
  tableRef.value.reload()
}
const handleEdit = (row) => {
  console.log(row)
}

const handleConfig = (row) => {
  dictId.value = row.id
  showDrawer.value = true
}
const handleDelete = (row) => {
  console.log(row)
}


</script>
