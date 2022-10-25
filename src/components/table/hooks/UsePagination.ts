import { isBoolean } from '@/utils/is';
import { ComputedRef } from 'vue';
import { PaginationProps } from '../types/pagination';
import { BasicTableProps } from "../types/table";

export function usePagination(refProps: ComputedRef<BasicTableProps>) {
  const configRef = ref<PaginationProps>({});
  const getPaginationInfo = computed((): PaginationProps | boolean => {
    const { pagination } = unref(refProps)
    if (isBoolean(pagination) && !pagination) {
      return false;
    }
    return {
      page: 1,
      pageSize: 10,
      pageSlot: 7,
      showSizePicker: true,
      showQuickJumper: true,
      pageSizes: [10, 20, 50, 100],
      ...(isBoolean(pagination) ? {} : pagination),
      ...unref(configRef),
      pageCount: unref(configRef)['pageCount'],
    }
  })

  function setPagination (info: Partial<PaginationProps>) {
    const paginationInfo = unref(getPaginationInfo)
    configRef.value = {
      ...(!isBoolean(paginationInfo) ? paginationInfo : {}),
      ...info,
    };
  }

  function getPagination() {
    return unref(getPaginationInfo);
  }

  return {
    getPaginationInfo,
    setPagination,
    getPagination
  }
}