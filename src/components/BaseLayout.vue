<template>
  <n-layout has-sider>
    <n-layout-sider
      bordered
      show-trigger
      collapse-mode="width"
      :collapsed-width="64"
      :width="240"
      :native-scrollbar="false"
      style="max-height: 320px;"
    >
      <div></div>
      <n-menu v-model:value="activeKey" :options="menuOptions" />
    </n-layout-sider>
    <div class="layout-left" style="width: 100%">
      <div class="top-navigation">
        <div class="user-warpper">登录用户
          <n-button quaternary circle #icon>
            <n-icon size="24">
              <exit-outline />
            </n-icon>
          </n-button>
        </div>
      </div>
      <n-breadcrumb>
        <n-breadcrumb-item>且听风吟</n-breadcrumb-item>
      </n-breadcrumb>
      <n-layout-content content-style="padding: 20px;">
        <slot></slot>
      </n-layout-content>
    </div>
  </n-layout>
</template>

<script lang="ts">
import { ExitOutline } from '@vicons/ionicons5'
import { defineComponent, h, ref } from 'vue';
import { NIcon } from 'naive-ui';

import {
  BookOutline as BookIcon,
  PersonOutline as PersonIcon,
  WineOutline as WineIcon
} from '@vicons/ionicons5'

function renderIcon (icon) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions = [
  {
    label: () =>
      h(
        'a',
        {
          href: 'https://baike.baidu.com/item/%E4%B8%94%E5%90%AC%E9%A3%8E%E5%90%9F',
          target: '_blank',
          rel: 'noopenner noreferrer'
        },
        '且听风吟'
      ),
    key: 'hear-the-wind-sing',
    icon: renderIcon(BookIcon)
  },
  {
    label: '1973年的弹珠玩具',
    key: 'pinball-1973',
    icon: renderIcon(BookIcon),
    // disabled: true,
    children: [
      {
        label: '鼠',
        key: 'rat'
      }
    ]
  },
  {
    label: '寻羊冒险记',
    key: 'a-wild-sheep-chase',
    icon: renderIcon(BookIcon),
    // disabled: true
  },
  {
    label: '舞，舞，舞',
    key: 'dance-dance-dance',
    icon: renderIcon(BookIcon),
    children: [
      {
        type: 'group',
        label: '人物',
        key: 'people',
        children: [
          {
            label: '叙事者',
            key: 'narrator',
            icon: renderIcon(PersonIcon)
          },
          {
            label: '羊男',
            key: 'sheep-man',
            icon: renderIcon(PersonIcon)
          }
        ]
      },
      {
        label: '饮品',
        key: 'beverage',
        icon: renderIcon(WineIcon),
        children: [
          {
            label: '威士忌',
            key: 'whisky'
          }
        ]
      },
      {
        label: '食物',
        key: 'food',
        children: [
          {
            label: '三明治',
            key: 'sandwich'
          }
        ]
      },
      {
        label: '过去增多，未来减少',
        key: 'the-past-increases-the-future-recedes'
      }
    ]
  }
]
export default defineComponent({
  components: {
    ExitOutline
  },
  setup() {
    return {
      menuOptions,
    }
  },
  data() {
    return {
      menuOptions,
      activeKey: ref(null)
    }
  }
})
</script>

<style scoped>
.n-layout, .n-layout-sider{
  height: 100% !important;

}
.n-layout-sider{
  max-height: 100% !important;

}
.n-layout-content {
  height: calc(100% - 60px) !important;
}
.top-navigation{
  padding: 8px 12px;
  border-bottom: 1px solid rgb(239, 239, 245);
}
.user-warpper {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
