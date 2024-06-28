<template>
  <div class="p-5">
    <h2 class="mb-3 text-xl font-bold">Payment Gateway</h2>
    <h4 class="text-[#6790F5] mb-3 text-lg font-semibold">Transactions</h4>
    <div
      class="flex items-center justify-between w-full gap-2 mb-5 filters md:flex-wrap sm:flex-wrap"
    >
      <input
        type="date"
        v-model="filters.startDate"
        @change="applyFilters"
        class="w-full h-10 p-2"
      />
      <input
        type="date"
        v-model="filters.endDate"
        @change="applyFilters"
        class="w-full h-10 p-2"
      />
      <select
        v-model="filters.transactionType"
        @change="applyFilters"
        class="w-full h-10 p-2"
      >
        <option value="all">All</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
    </div>

    <div class="flex items-start justify-between gap-5 md:flex-wrap sm:flex">
      <div class="basis-2/3">
        <Grid :colDefs="colDefs" :rowData="rowData" />
      </div>
      <div class="basis-1/3">
        <div class="summary mb-3 bg-[#061435] p-5 text-white rounded-md">
          <h4 class="mb-5 text-xl font-bold">Summary</h4>
          <div class="px-2 text-[#ACB0BA]">
            <p>Total Income: {{ summary.totalIncome }}</p>
            <p>Total Expenses: {{ summary.totalExpenses }}</p>
            <p>Net Balance: {{ summary.netBalance }}</p>
          </div>
        </div>
        <div class="h-[300px] w-full mt-10">
          <AgChartsVue :options="chartOptions"> </AgChartsVue>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import Grid from "../../../components/grid/grid.vue";
import { AgChartsVue } from "ag-charts-vue3";
import { dataService } from "../../../services/data-service.js";
export default {
  components: {
    Grid,
    AgChartsVue,
  },
  setup() {
    const colDefs = ref([
      { field: "Transaction ID" },
      { field: "Date" },
      { field: "Description" },
      { field: "Amount" },
      { field: "Type" },
    ]);

    const originalData = ref([]);
    const rowData = ref([]);
    const filters = ref({
      startDate: "",
      endDate: "",
      transactionType: "all",
    });

    const chartOptions = ref({
      autoSize: true,
      title: {
        text: "Transaction Trends",
      },
      data: [],
      series: [
        {
          type: "line",
          xKey: "date",
          yKey: "amount",
          title: "Amount",
        },
      ],
      axes: [
        {
          type: "category",
          position: "bottom",
          title: {
            text: "Date",
          },
        },
        {
          type: "number",
          position: "left",
          title: {
            text: "Amount",
          },
        },
      ],
    });

    const getAllTransactions = async () => {
      try {
         dataService.getAll(
          "https://run.mocky.io/v3/87b5bee3-ae98-4785-9cff-beebf94f60ce",
          (res) => {
            originalData.value = res.map((data) => ({
              "Transaction ID": data.transaction_id,
              Date: data.date,
              Description: data.description,
              Amount: data.amount,
              Type: data.type,
            }));
            applyFilters();
          },
          (err) => {}
        );
      } catch (error) {
        console.error(error);
      }
    };

    const applyFilters = () => {
      const { startDate, endDate, transactionType } = filters.value;
      rowData.value = originalData.value.filter((transaction) => {
        const dateMatch =
          (!startDate || new Date(transaction.Date) >= new Date(startDate)) &&
          (!endDate || new Date(transaction.Date) <= new Date(endDate));
        const typeMatch =
          transactionType === "all" ||
          transaction.Type.toLowerCase() === transactionType;
        return dateMatch && typeMatch;
      });
      updateChart();
    };

    const updateChart = () => {
      const chartData = rowData.value.map((transaction) => ({
        date: transaction.Date,
        amount: transaction.Amount,
      }));
      chartOptions.value = { ...chartOptions.value, data: chartData };
    };

    const summary = computed(() => {
      let totalIncome = 0;
      let totalExpenses = 0;

      rowData.value.forEach((transaction) => {
        if (transaction.Type.toLowerCase() === "income") {
          totalIncome += transaction.Amount;
        } else if (transaction.Type.toLowerCase() === "expense") {
          totalExpenses += transaction.Amount;
        }
      });

      const netBalance = totalIncome - totalExpenses;

      return {
        totalIncome,
        totalExpenses,
        netBalance,
      };
    });

    onMounted(() => {
      getAllTransactions();
    });

    return {
      colDefs,
      rowData,
      filters,
      chartOptions,
      summary,
      applyFilters,
    };
  },
};
</script>

<style scoped>
.filters {
  display: flex;
  gap: 1rem;
}
.summary {
  display: flex;
  flex-direction: column;
}
</style>
