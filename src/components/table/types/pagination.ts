export interface PaginationProps {
  page?: number;
  pageSize?: number;
  pageCount?: number;
  pageSlot?: number;
  pageSizes?: number[];
  showSizePicker?: boolean;
  showQuickJumper?: boolean;
}