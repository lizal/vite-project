<script lang="ts" setup>
import type { DataTableRowKey, PaginationInfo } from "naive-ui";
// import { NDataTable } from "naive-ui";
import type { TableBaseColumn } from 'naive-ui/lib/data-table/src/interface';
import { propTypes } from '@/utils/propTypes';
import { BasicColumn, BasicTableProps } from "./types/table";
import { useDataSource } from './hooks/UseDataSource'
import { usePagination } from './hooks/UsePagination'
import { useLoading } from './hooks/UseLoading'
import { NDataTable } from "naive-ui/lib";
import { Ref } from "vue";

// import { ResType } from "@/service/type";

type rowData = {
  id?: string | number;
};

console.log(NDataTable)
const basicProps = defineProps({
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
});
const innerPropsRef = ref<Partial<BasicTableProps>>();
const getProps = computed(() => {
  return { ...basicProps, ...unref(innerPropsRef)} as BasicTableProps;
});
const columnsRef = ref(unref(getProps).columns) as unknown as Ref<BasicColumn[]>;
watch(
  () => unref(getProps).columns,
  (columns) => {
    columnsRef.value = columns;
  }
);
// console.log('columns', unref(columnsRef))
const checkedRowKeysRef = ref<DataTableRowKey[]>([]);

const emit = defineEmits(['success', 'error','select-row-change'])
const { setLoading } = useLoading(getProps)
const { getPaginationInfo, setPagination } = usePagination(getProps)

const { getDataSourceRef, reload } = useDataSource(getProps, { getPaginationInfo, setPagination, setLoading }, emit)

const getBindValues = computed(() => {
  const tableData = unref(getDataSourceRef);
  return {
    columns: unref(columnsRef),
    data: tableData,
    rowKey: (row: rowData) => row.id,
    remote: true,
  }
})
const pagination = computed(() => toRaw({
  ...unref(getPaginationInfo),
  prefix: (info: PaginationInfo) => {
    return h('span', null, `${info.pageSize * (info.page - 1) + 1}-${1 + info.endIndex}共${info.itemCount}条`)
  },
  suffix: () => {
    return h('span', null, '页')
  },
  onChange: (page: number) => {
    setPagination({
      page: page
    })
    reload()
  },
  onUpdatePageSize: (pageSize: number) => {
    setPagination({
      pageSize: pageSize,
      page: 1
    })
    reload()
  }
}));


const handleCheck = (rowKeys: DataTableRowKey[]) => {
  checkedRowKeysRef.value = rowKeys;
  console.log(rowKeys);
  emit('select-row-change', rowKeys)
};
// const handleEdit = (row: rowData) => {

// }
defineExpose({
  reload
})
</script>

<template>
  <n-data-table
    v-bind="getBindValues"
    :pagination="pagination"
    @update:checked-row-keys="handleCheck"
  ></n-data-table>
</template>
