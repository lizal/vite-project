import { ComputedRef } from "vue";
import { BasicTableProps } from "../types/table";

export function useDataSource (propsRef: ComputedRef<BasicTableProps>,{ setLoading }, emit) {
  const dataSourceRef = ref<Recordable[]>([]);

  const getDataSourceRef = computed(() => {
    const dataSource = unref(dataSourceRef);
    if (!dataSource || dataSource.length === 0) {
      return unref(dataSourceRef);
    }
    return unref(dataSourceRef);
  });

  async function loadData (opt?) {
    try {
      setLoading(true)
      const { request, pagination, beforeRequest, afterRequest }: any = unref(propsRef);
      if(!request) return
      let params = Object.assign({page: 1, size: 10},opt)
      const res = await request(params);
      dataSourceRef.value = res.result.records;
      emit('success', res)
    } catch (error) {
      emit('error', error)
      dataSourceRef.value = [];
    } finally {
      setLoading(false)
    }
  }

  onMounted(() => {
    setTimeout(() => {
      loadData();
    }, 16);
  });


  async function reload(opt?) {
    await loadData(opt)
  }

  function getDataSource(): any[] {
    return getDataSourceRef.value;
  }

  return {
    getDataSourceRef,
    getDataSource,
    loadData,
    reload,
  }
}