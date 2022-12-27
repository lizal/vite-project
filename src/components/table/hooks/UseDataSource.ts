import { isBoolean } from "@/utils/is";
import { ComputedRef } from "vue";
import { PaginationProps } from "../types/pagination";
import { BasicTableProps } from "../types/table";

export function useDataSource(
  propsRef: ComputedRef<BasicTableProps>,
  { getPaginationInfo, setPagination, setLoading },
  emit
) {
  const dataSourceRef = ref<Recordable[]>([]);

  watch(
    () => unref(propsRef).dataSource,
    () => {
      const { dataSource }: any = unref(propsRef);
      dataSource && (dataSourceRef.value = dataSource);
    },
    {
      immediate: true,
    }
  );

  const getDataSourceRef = computed(() => {
    const dataSource = unref(dataSourceRef);
    if (!dataSource || dataSource.length === 0) {
      return unref(dataSourceRef);
    }
    return unref(dataSourceRef);
  });

  async function loadData(opt?) {
    try {
      debugger;
      setLoading(true);
      const { request, pagination }: any = unref(propsRef);
      console.log(propsRef);
      if (!request) return;

      let pageParams = {}
      const { page = 1, pageSize = 10 } = unref(getPaginationInfo) as PaginationProps;
      if((isBoolean(pagination) && !pagination) || isBoolean(getPaginationInfo)) {
        pageParams = {}
      } else {
        pageParams['pageNo'] = (opt && opt.page) || page
        pageParams['pageSize'] = pageSize
      }

      let params = { ...pageParams, opt };
      const res = await request(params);

      const currentPage = Number(res.result.current);
      const pageCount = Number(res.result.pages) || 0;

      dataSourceRef.value = (isBoolean(pagination) && !pagination)? res.result : res.result.records;
      setPagination({
        page: currentPage,
        pageCount: pageCount
      })
      emit("success", res);
    } catch (error) {
      emit("error", error);
      console.log(error);
      dataSourceRef.value = [];
    } finally {
      setLoading(false);
    }
  }

  onMounted(() => {
    setTimeout(() => {
      loadData();
    }, 16);
  });

  async function reload(opt?) {
    await loadData(opt);
  }

  function getDataSource(): any[] {
    return getDataSourceRef.value;
  }

  return {
    getDataSourceRef,
    getDataSource,
    loadData,
    reload,
  };
}
