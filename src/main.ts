import { createApp } from "vue";
import App from "./App.vue";
import router, { setupRouter } from "./router";
import { createPinia } from "pinia";
import {
  create,
  NButton,
  NConfigProvider,
  NLayout,
  NLayoutSider,
  NLayoutHeader,
  NLayoutFooter,
  NLayoutContent,
  NMenu,
  NBreadcrumb,
  NBreadcrumbItem,
  NIcon,
  NSpace,
  NForm,
  NFormItem,
  NInput,
  NRadio,
  NRadioGroup,
  NSelect,
  NDatePicker,
  NDataTable,
  NModal,
  NAvatar,
  NEllipsis,
  NDialogProvider,
  NMessageProvider,
} from "naive-ui";

const naive = create({
  components: [
    NButton,
    NConfigProvider,
    NLayout,
    NLayoutSider,
    NLayoutHeader,
    NLayoutFooter,
    NLayoutContent,
    NMenu,
    NBreadcrumb,
    NBreadcrumbItem,
    NIcon,
    NSpace,
    NForm,
    NFormItem,
    NInput,
    NRadio,
    NRadioGroup,
    NSelect,
    NDatePicker,
    NDataTable,
    NModal,
    NAvatar,
    NEllipsis,
    NDialogProvider,
    NMessageProvider,
  ],
});

const app = createApp(App);

app.use(createPinia());
app.use(naive);

// 挂载路由
await setupRouter(app);
// 路由准备就绪后挂载APP实例
await router.isReady();

app.mount("#app");
