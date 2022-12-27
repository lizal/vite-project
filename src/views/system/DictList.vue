<template>
  <div class="search-form">
    <n-form ref="form" :model="queryForm" inline label-placement="left" label-width="auto">
      <n-form-item label="字典名称">
        <n-input v-model:value="queryForm.dictName" clearable @change="handleQuery"></n-input>
      </n-form-item>
      <n-form-item label="字典编号">
        <n-input v-model:value="queryForm.dictCode" clearable @change="handleQuery"></n-input>
      </n-form-item>
    </n-form>
  </div>
  <div class="operate-wrap">
    <n-space>
      <n-button type="primary">
        <template #icon>
          <n-icon :component="AddOutline">
          </n-icon>
        </template>添加
      </n-button>
      <n-button type="primary">
        <template #icon>
          <n-icon :component="DownloadOutlined">
          </n-icon>
        </template>导出
      </n-button>
      <n-button type="primary">
        <template #icon>
          <n-icon :component="UploadOutlined">
          </n-icon>
        </template>
        导入
      </n-button>
      <n-button type="primary">
        <template #icon>
          <n-icon :component="SyncOutline">
          </n-icon>
        </template>
        刷新缓存
      </n-button>
      <n-button type="primary" @click="handleRecycle">
        <template #icon>
          <n-icon :component="DatabaseOutlined">
          </n-icon>
        </template>
        回收站
      </n-button>
    </n-space>
    <recycle-modal ref="recycleRef"></recycle-modal>
  </div>
  <div>
    <BasicTable ref="tableRef" :columns="columns" :request="loadTableData" :maxHeight="tableHeight"></BasicTable>
  </div>
  <dict-drawer :show="showDrawer" :dictId="dictId"></dict-drawer>
</template>

<script lang="ts" setup>
import BasicTable from "@/components/table/BasicTable.vue";
import DictDrawer from './modules/DictDrawer.vue'
import RecycleModal from './modules/RecycleModal.vue'
import http from "@/service/http";
import { NButton, NSpace } from "naive-ui";
import { AddOutline, SyncOutline } from '@vicons/ionicons5'
import { DatabaseOutlined, DownloadOutlined, UploadOutlined } from '@vicons/antd'

let tableRef = ref();
// 请求参数、表头数据、请求、刷新数据、其他操作
const queryForm = reactive({
  dictName: '',
  dictCode: ''
})
const tableHeight = document.body.clientHeight - 330
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
const recycleRef = ref()
const handleRecycle = () => {
  recycleRef.value.show()
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
