
<template>
  <main-header />
  <el-row style="margin-inline: 2rem">
    <el-col :span="4"> <category-table /> </el-col>
    <el-col :span="20">
      <data-table :category="props.category" :isLoading="isLoading" :data="data"/>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import DataTable from "../components/DataTable.vue";
import CategoryTable from "../components/CategoryTable.vue";
import MainHeader from "../components/Header.vue";
import {useListingService} from "../service/listing.service.ts";
import {onMounted, ref} from "vue";

const props = defineProps<{
  category?: string;
}>();

const listingService = useListingService();

const data = ref([]);
const isLoading = ref(true);

onMounted(() => {
  listingService.getAllListings().then((res) => {
    data.value = res;
    isLoading.value = false;
  }).catch((err) => {
    console.log(err);
  });
})



</script>


<style scoped>
</style>
