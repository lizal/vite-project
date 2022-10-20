<script lang="ts" setup>
import type { DataTableRowKey } from "naive-ui";
import http from "@/service/http";
import { ResType } from "@/service/type";

type rowData = {
  id?: string | number;
};
interface columnItem {
  title?: string;
  key?: string;
  render?: () => any;
  type?: string;
  disabled?: (row: rowData) => boolean;
}
const props = defineProps({
  columns: {
    type: Array as PropType<columnItem[]>,
    default: () => [],
  },
  data: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
});
const loading = reactive({load: false})
const { columns, data } = toRefs(props);
const columnsData = reactive({ data: columns });
const dataSource = reactive({ data });
const pagination = reactive({
  page: 1,
  pageSize: 10,
  showSizePicker: true,
  pageSizes: [10, 20, 50, 100],
  onChange: (page: number) => {
    pagination.page = page;
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.pageSize = pageSize;
    pagination.page = 1;
  },
});
const rowKey = (row: rowData) => row.id;
const checkedRowKeysRef = ref<DataTableRowKey[]>([]);
interface IDataSource<T> {
  page: string;
  size: string;
  total: string;
  records: T[];
}
loading.load = true
http.get('/sys/log/list',{}).then((res: ResType<IDataSource<object>>) => {
  loading.load = false
  dataSource.data = (res.result || {}).records || []
  console.log(dataSource)
})

const handleCheck = (rowKeys: DataTableRowKey[]) => {
  checkedRowKeysRef.value = rowKeys;
  console.log(rowKeys);
};
</script>

<template>
  <n-data-table
    :loading="loading.load"
    :columns="columnsData.data"
    :data="dataSource.data"
    :pagination="pagination"
    :row-key="rowKey"
    @update:checked-row-keys="handleCheck"
  ></n-data-table>
</template>
