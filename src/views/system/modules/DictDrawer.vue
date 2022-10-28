<script lang="ts" setup>
import http from "@/service/http";
import { NButton, NSpace } from "naive-ui";
import BasicTable from "@/components/table/BasicTable.vue";

const basicProps = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})
// const props = computed(()=> {
//   return JSON.parse(JSON.stringify({...basicProps}))
// })
// console.log('props', props)
watch(() => basicProps.show, (val) => {
  console.log(val)
  showDrawer.value = val
}, {deep: true})

const showDrawer = ref(false)
const queryForm = ref({
  dictName: '',
  dictCode: ''
})

console.log('show', showDrawer)
const columns = [
  {
    title: "名称",
    key: "dictName",
  },
  {
    title: "数据值",
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
const handleQuery = () => {

}
const loadTableData = async (res) => {
  return await http.get("/sys/dictItem/list", {
    ...queryForm,
    ...res
  });
};

const handleEdit = (row) => {
  console.log(row)
}

const handleDelete = (row) => {
  console.log(row)
}

</script>

<template>
  <n-drawer v-model:show="showDrawer" :width="502">
    <n-drawer-content title="字典列表" closable>
      <n-form ref="form" :model="queryForm" inline label-placement="left" label-width="auto">
      <n-form-item label="名称">
        <n-input v-model:value="queryForm.dictName" clearable @change="handleQuery"></n-input>
      </n-form-item>
      <n-form-item label="状态">
        <n-input v-model:value="queryForm.dictCode" clearable @change="handleQuery"></n-input>
      </n-form-item>
    </n-form>
    <BasicTable ref="dictTableRef" :columns="columns" :request="loadTableData"></BasicTable>
    </n-drawer-content>
  </n-drawer>
</template>