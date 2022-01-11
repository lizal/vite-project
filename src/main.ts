import { createApp } from "vue";
import App from "./App.vue";
import router from './router/router'
import { createPinia } from "pinia";
import {create, NButton,NConfigProvider, NLayout, NLayoutSider, NLayoutHeader, NLayoutFooter, NLayoutContent, NMenu, NBreadcrumb, NBreadcrumbItem, NIcon, NSpace } from 'naive-ui';

const naive = create({
  components: [NButton, NConfigProvider, NLayout, NLayoutSider, NLayoutHeader, NLayoutFooter, NLayoutContent, NMenu, NBreadcrumb, NBreadcrumbItem, NIcon, NSpace]
})

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.use(naive)

app.mount("#app");
