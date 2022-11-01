<script lang="ts" setup>
import Modal from "@/components/modal/Index.vue"
import http from "@/service/http";
import { UploadFileInfo } from 'naive-ui'

const addModal = ref()
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

const handleSubmit = () => {
  http.post('/sys/para/add').then(res => {
    if(res.success) {

    }
  })
}
const file = ref<UploadFileInfo[]>([])
const show = (data) => {
  addForm.value = {
    code: '',
    name: '',
    type: '0',
    value: '',
    description: ''
  }
  if(data) {
    addForm.value = data
    data.type = data.value.indexOf('data:image/') === 0 ? '1' : "0"
    if(data.value.indexOf('data:image/') === 0) {
      file.value = [{
        id: '1',
        name: data.name,
        status: 'finished',
        url: data.vlue,
        thumbnailUrl: data.value
      }]
    }
  }
  return addModal.value.show()
}
defineExpose({
  show
})
</script>

<template>
  <modal ref="addModal" :title="'新增'" @ok="handleSubmit">
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
        <n-form-item v-show="addForm.type === '0'" label="值" path="value">
          <n-input v-model:value="addForm.value" type="textarea"></n-input>
        </n-form-item>
        <n-form-item v-show="addForm.type === '1'" label="图片">
          <n-upload :default-file-list="file" accept="image/*" :max="1" list-type="image-card">
            点击上传
          </n-upload>
        </n-form-item>
        <n-form-item label="描述">
          <n-input v-model:value="addForm.description" type="textarea"></n-input>
        </n-form-item>
      </n-form>
    </modal>
</template>