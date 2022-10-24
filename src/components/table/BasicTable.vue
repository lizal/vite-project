<script lang="ts" setup>
import type { DataTableRowKey } from "naive-ui";
// import { NDataTable } from "naive-ui";
import type { TableBaseColumn } from 'naive-ui/lib/data-table/src/interface';
import { propTypes } from '@/utils/propTypes';
import { BasicTableProps } from "./types/table";
import { useDataSource } from './hooks/UseDataSource'
import { useLoading } from './hooks/UseLoading'
import { NDataTable } from "naive-ui/lib";

// import { ResType } from "@/service/type";

type rowData = {
  id?: string | number;
};
// interface columnItem {
//   title?: string;
//   key?: string;
//   render?: () => any;
//   type?: string;
//   disabled?: (row: rowData) => boolean;
//   sorter?: (row1: rowData, row2: rowData) => boolean;
// }
console.log(NDataTable)
const basicProps = {
  ...NDataTable.props, // 这里继承原 UI 组件的 props
  title: {
    type: String,
    default: null,
  },
  titleTooltip: {
    type: String,
    default: null,
  },
  size: {
    type: String,
    default: 'medium',
  },
  dataSource: {
    type: [Object],
    default: () => [],
  },
  columns: {
    type: [Array] as PropType<TableBaseColumn[]>,
    default: () => [],
    required: true,
  },
  beforeRequest: {
    type: Function as PropType<(...arg: any[]) => void | Promise<any>>,
    default: null,
  },
  request: {
    type: Function as PropType<(...arg: any[]) => Promise<any>>,
    default: null,
  },
  afterRequest: {
    type: Function as PropType<(...arg: any[]) => void | Promise<any>>,
    default: null,
  },
  rowKey: {
    type: [String, Function] as PropType<string | ((record) => string)>,
    default: undefined,
  },
  pagination: {
    type: [Object, Boolean],
    default: () => {},
  },
  //废弃
  showPagination: {
    type: [String, Boolean],
    default: 'auto',
  },
  actionColumn: {
    type: Object as PropType<TableBaseColumn>,
    default: null,
  },
  canResize: propTypes.bool.def(true),
  resizeHeightOffset: propTypes.number.def(0),
};
const getProps = computed(() => {
  return { ...basicProps} as BasicTableProps;
});
const { columns } = unref(getProps);
const checkedRowKeysRef = ref<DataTableRowKey[]>([]);
// interface IDataSource<T> {
//   page: string;
//   size: string;
//   total: string;
//   records: T[];
// }

const emit = defineEmits(['success', 'error'])
const { setLoading } = useLoading(getProps)
const { getDataSourceRef, reload } = useDataSource(getProps, { setLoading }, emit)

const getBindValues = computed(() => {
  return {
    columns: columns,
    data: unref(getDataSourceRef),
    rowKey: (row: rowData) => row.id,
    remote: true,
  }
})

const pagination = reactive({
  page: 1,
  pageSize: 10,
  showSizePicker: true,
  pageSizes: [10, 20, 50, 100],
  onChange: (page: number) => {
    pagination.page = page;
    reload()
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.pageSize = pageSize;
    pagination.page = 1;
    reload()
  },
});


const handleCheck = (rowKeys: DataTableRowKey[]) => {
  checkedRowKeysRef.value = rowKeys;
  console.log(rowKeys);
};
// const handleEdit = (row: rowData) => {

// }
</script>

<template>
  <n-data-table
    v-bind="getBindValues"
    :pagination="pagination"
    @update:checked-row-keys="handleCheck"
  ></n-data-table>
</template>
