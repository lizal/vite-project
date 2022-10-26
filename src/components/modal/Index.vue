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
    type: Number || String,
    default: 800
  },
  cancel: {
    type: Function,
    default: () => {}
  },
  ok: {
    type: Function,
    default: () => {}
  }
})

const props = computed(()=> {
  return {...basicProps}
})
</script>

<template>
  <n-modal v-model:show="show" :mask-closable="props.maskClosable">
     <div class="modal-wrapper" :style="{'width': typeof props.width === 'number'? props.width + 'px' : props.width}">
      <div class="modal-header">
        <div class="modal-title">{{props.title}}</div>
        <div class="modal-icon" @click="props.cancel">
          <n-icon :size="28">
            <close-outline/>
          </n-icon>
        </div>
      </div>
      <div class="modal-content">
        <slot></slot>
      </div>
      <div class="modal-footer">
        <n-space justify="end">
          <n-button @click="props.cancel">{{props.cancelText}}</n-button>
          <n-button type="primary" @click="props.ok">{{props.okText}}</n-button>
        </n-space>
      </div>
     </div>
   </n-modal>
</template>

<style lang="scss" scoped>
  .modal-wrapper {
    padding: 20px;
    background-color: #fff;
    border-radius: 4px;
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