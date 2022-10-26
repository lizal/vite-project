<template>
  <div>
    <n-form ref="form" :model="queryForm" inline label-placement="left" label-width="auto">
      <n-form-item label="搜索日志">
        <n-input v-model:value="queryForm.logContent" clearable @change="handleQuery"></n-input>
      </n-form-item>
    </n-form>
  </div>
  <div style="margin-bottom: 10px;">
    <n-space>
      <n-button type="primary" @click="showModal = true">
        <template #icon>
          <n-icon>
            <add-outline />
          </n-icon>
        </template>
        新增
      </n-button>
      <n-button :disabled="deleteDisabeld">
        <template #icon>
          <n-icon>
            <trash-outline />
          </n-icon>
        </template>
        删除
      </n-button>
    </n-space>
    
    <modal :title="'新增'" :show="showModal" :ok="handleSubmit" :cancel="handleCancel">
      <n-form ref="add" :model="addForm" :rules="rules" label-placement="left" label-width="120px" require-mark-placement="right-hanging">
        <n-form-item label="编号" path="code">
          <n-input v-model:value="addForm.code"></n-input>
        </n-form-item>
        <n-form-item label="名称" path="name">
          <n-input v-model:value="addForm.name"></n-input>
        </n-form-item>
        <n-form-item label="类型选择">
          <n-radio-group v-model:value="addForm.type">
            <n-space>
              <n-radio value="0">文本</n-radio>
              <n-radio value="1">图片</n-radio>
            </n-space>
          </n-radio-group>
        </n-form-item>
        <n-form-item label="值" path="value">
          <n-input v-model:value="addForm.value" type="textarea"></n-input>
        </n-form-item>
        <n-form-item label="描述">
          <n-input v-model:value="addForm.description" type="textarea"></n-input>
        </n-form-item>
      </n-form>
    </modal>
  </div>
  <div>
    <BasicTable ref="tableRef" :columns="columns" :request="loadTableData"></BasicTable>
  </div>
</template>

<script lang="ts" setup>
import BasicTable from "@/components/table/BasicTable.vue";
import Modal from "@/components/modal/Index.vue"
import http from "@/service/http";
import { NAvatar, NEllipsis } from "naive-ui";
import { ref } from 'vue'

import { AddOutline, TrashOutline } from '@vicons/ionicons5'
let tableRef = ref();
// 请求参数、表头数据、请求、刷新数据、其他操作
const queryForm = reactive({
  logContent: '',
})
const addForm = ref({
  code: '',
  name: '',
  type: '0',
  value: '',
  description: ''
})
const rules = {
  code: {
    required: true,
    trigger: ['blur', 'input'],
    message: '必填项'
  },
  name: {
    required: true,
    trigger: ['blur', 'input'],
    message: '必填项'
  },
  value: {
    required: true,
    trigger: ['blur', 'input'],
    message: '必填项'
  }
}
const deleteDisabeld = ref(true)
const showModal = ref(false)
const columns = [
  {
    type: 'selection'
  },
  {
    title: '序号',
    render (_, index) {
      return index + 1
    }
  },
  {
    title: "编号",
    key: "code",
  },
  {
    title: "名称",
    key: "name",
  },
  {
    title: "创建人",
    key: "createBy",
  },
  {
    title: "值",
    key: "value",
    width: 480,
    render(row) {
      let value
      if (row.value.indexOf('data:') != -1 && row.value.indexOf('base64') != -1) {
        value = h(NAvatar, {src: row.value, color: 'transparent'})
      } else {
        value = h(NEllipsis, {style: "width: 440px;"}, {default: () => row.value})
      }
      return value
    },
  },
  {
    title: "创建时间",
    key: "createTime",
  },
  {
    title: "描述",
    key: "description",
  }
];
const loadTableData = async (res) => {
  return await http.get("/sys/para/list", {
    logContent: queryForm.logContent,
    ...res
  });
};
const handleQuery = () => {
  tableRef.value.reload()
}

const handleCancel = () => {
  debugger
  showModal.value = false
}
const handleSubmit = () => {
  showModal.value = false
}
</script>
