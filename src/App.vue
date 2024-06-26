<script setup>
import { RouterLink, RouterView } from "vue-router";
import loader from "./components/loader/loader.vue";
</script>

<template>
  <Loader v-if="$store.getters.getLoaderStatus"/>
  <RouterView />
</template>
<script>
export default {
  components: {
    Loader: loader,
  },
};
</script>
