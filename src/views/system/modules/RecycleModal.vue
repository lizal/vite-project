<script lang="ts" setup>
import BasicTable from "@/components/table/BasicTable.vue";
import Modal from "@/components/modal/Index.vue"
import http from "@/service/http";
import { NButton, NSpace } from 'naive-ui'
import { DatabaseOutlined, DownloadOutlined, UploadOutlined } from '@vicons/antd'
const addModal = ref()
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
    width: 200,
    render (row) {
      const btns =  [
        h(NButton, {
          text: true,
          tag: 'a',
          'text-color': '#18a058',
          onClick: () => handleEdit(row)
        },{
          default: () => '字典取回'
        }),
        h(NButton, {
          renderIcon: ()=> { return h(DatabaseOutlined) },
          text: true,
          tag: 'a',
          'text-color': '#18a058',
          onClick: () => handleDelete(row)
        },{
          default: () => '彻底删除'
        })
      ]
      return h(NSpace, {

      }, {default: () => btns})
    }
  },
];

const handleEdit = (row) => {
  console.log(row)
}

const handleDelete = (row) => {
  console.log(row)
}

const loadTableData = async (res) => {
  return await http.get("/sys/dict/deleteList", {
    ...res
  });
};

const show = () => {
  return addModal.value.show()
}
defineExpose({
  show
})
</script>

<template>
  <modal ref="addModal" :title="''" :width="1400" :footer="false">
    <BasicTable ref="tableRef" :columns="columns" :request="loadTableData" :pagination="false" :maxHeight="600"></BasicTable>
    <template slot="foot">
      <n-button>关闭</n-button>
    </template>
  </modal>
</template>