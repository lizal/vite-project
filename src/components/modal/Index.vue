<script lang="ts" setup>
import { CloseOutline } from '@vicons/ionicons5'

const basicProps = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  maskClosable: {
    type: Boolean,
    default: true
  },
  footer: {
    type: Boolean,
    default: true
  },
  cancelText: {
    type: String,
    default: '取消'
  },
  okText: {
    type: String,
    default: '确定'
  },
  title: {
    type: String,
    default: ''
  },
  width: {
    type: [Number, String],
    default: 800
  }
})
const props = computed(()=> {
  return {...basicProps}
})

const emit = defineEmits(['ok', 'cancel'])

const theme = localStorage.getItem('theme')

const showModal = ref(false)

watch(() => props.value, (val) => {
  showModal.value = val.show
})

const show = () => {
  showModal.value = true
}
const ok = () => {
  emit('ok')
  showModal.value = false
}
const cancel = () => {
  emit('cancel')
  showModal.value = false
}

defineExpose({
  show,
  cancel
})
</script>

<template>
  <n-modal v-model:show="showModal" :mask-closable="false">
     <div :class="['modal-wrapper', theme]" :style="{'width': typeof props.width === 'number'? props.width + 'px' : props.width}">
      <div class="modal-header">
        <div class="modal-title">{{props.title}}</div>
        <div class="modal-icon" @click="cancel">
          <n-icon :size="28">
            <close-outline/>
          </n-icon>
        </div>
      </div>
      <div class="modal-content">
        <slot></slot>
      </div>
      <div class="modal-footer">
        <slot name="footer"></slot>
      </div>
      <div v-if="props.footer" class="modal-footer">
        <n-space justify="end" >
          <n-button @click="cancel">{{props.cancelText}}</n-button>
          <n-button type="primary" @click="ok">{{props.okText}}</n-button>
        </n-space>
      </div>
     </div>
   </n-modal>
</template>

<style lang="scss" scoped>
  .modal-wrapper {
    padding: 20px;
    border-radius: 4px;
    &.light {
      background-color: #fff;
    }
    &.dark {
      background-color: #2c2c32;
    }
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .modal-title {
        font-size: 18px;
      }
    }
    .modal-content {
      padding: 20px 0;
    }
    .modal-footer {
      text-align: right;
    }
  }
</style>