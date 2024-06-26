<template>
  <ag-grid-vue
    :rowData="rowData"
    :columnDefs="colDefs"
    style="height: 500px"
    class="ag-theme-quartz"
    :pagination="pagination"
    :paginationPageSize="paginationPageSize"
    :paginationPageSizeSelector="paginationPageSizeSelector"
  >
  </ag-grid-vue>
</template>

<script>
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridVue } from "ag-grid-vue3";
export default {
  components: {
    AgGridVue,
  },
  props:{
    colDefs:Object,
    rowData:Object
  },
  data() {
    return {
      pagination: true,
      paginationPageSize: 3,
      paginationPageSizeSelector: [3, 50, 100],
    };
  },
};
</script>

<style lang="scss" scoped></style>
