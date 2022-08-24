<template>
  <div>
    <n-button @click="toHome">home</n-button>
  </div>
  <div>
  </div>
</template>

<script>
import {useRouter} from 'vue-router'
export default {
  setup() {
    const router = useRouter()
    const toHome = (()=> {
      router.push({
        name: 'home'
      })
    })
    return  {
      toHome
    }
  }
}
</script>