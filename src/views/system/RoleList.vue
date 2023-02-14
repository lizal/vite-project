<template>
  <div>
    <n-input v-model:value="data" @input="changeValue"></n-input>
  </div>
</template>

<script type="ts" setup>
import { denounce } from '../../utils/util'
const data = ref('')
const changeValue = () => {
  console.log('init', data.value)
  debugger
  denounce(()=> {
    console.log('denounce',data.value)
  }, 300)()
}
</script>
