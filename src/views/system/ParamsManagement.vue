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
      <n-button type="primary" @click="handleAdd">
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
    
    <param-modal ref="addModal"></param-modal>
  </div>
  <div style="height: calc(100% - 102px)">
    <BasicTable ref="tableRef" :columns="columns" :request="loadTableData" @selectRowChange="getSelectRowKeys" :maxHeight="tableHeight"></BasicTable>
  </div>
  <modal ref="detailModal" :title="'详情'" :footer="false">
    <n-grid :x-gap="12" :y-gap="8" :cols="2">
      <n-grid-item>编号：{{detailData.code}}</n-grid-item>
      <n-grid-item>名称：{{detailData.name}}</n-grid-item>
      <n-grid-item>创建人：{{detailData.createBy}}</n-grid-item>
      <n-grid-item>创建时间：{{detailData.createTime}}</n-grid-item>
      <n-grid-item v-if="detailData.value.indexOf('data:image/') === 0" style="display: flex;">图片：<img :src="detailData.value" style="max-width: calc(100% - 50px);" /></n-grid-item>
      <n-grid-item v-else style="display: flex;">值：<n-ellipsis :line-clamp="4">{{detailData.value}}</n-ellipsis></n-grid-item>
      <n-grid-item>更新人：{{detailData.updateBy}}</n-grid-item>
      <n-grid-item>更新时间：{{detailData.updateTime}}</n-grid-item>
      <n-grid-item>描述：{{detailData.description}}</n-grid-item>
    </n-grid>
  </modal>
</template>

<script lang="ts" setup>
import Modal from "@/components/modal/Index.vue"
import BasicTable from "@/components/table/BasicTable.vue";
import ParamModal from "./modules/ParamModal.vue";
import http from "@/service/http";
import { NAvatar, NButton, NEllipsis, NSpace } from "naive-ui";
import { ref } from 'vue'

import { AddOutline, TrashOutline } from '@vicons/ionicons5'
let tableRef = ref();
// 请求参数、表头数据、请求、刷新数据、其他操作
const queryForm = reactive({
  logContent: '',
})
const tableHeight = document.body.clientHeight - 320
const deleteDisabeld = ref(true)
const addModal = ref()
const detailModal = ref()
const detailData = ref({
  code: '',
  name: '',
  createBy: '',
  createTime: '',
  value: '',
  updateBy: '',
  updateTime: '',
  description: ''
})
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
          onClick: () => handleDetail(row)
        },{
          default: () => '详情'
        })
      ]
      return h(NSpace, {

      }, {default: () => btns})
    }
  },
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

const handleAdd = () => {
  addModal.value.show()
}


const getSelectRowKeys = (keys) => {
  if(keys && keys.length) {
    deleteDisabeld.value = false
  } else {
    deleteDisabeld.value = true
  }
}

const handleEdit = (row) => {
  console.log(addModal.value.show)
  addModal.value.show(row)
  // addForm.value = row
}

const handleDetail = (row) => {
  console.log(row)
  detailModal.value.show()
  detailData.value = unref(row)
}
</script>
