
<template>
  <main-header />
  <el-row style="margin-inline: 2rem">
    <el-col :span="4"> <category-table /> </el-col>
    <el-col :span="20">
      <data-table :category="props.brand"/>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import DataTable from "../components/DataTable.vue";
import CategoryTable from "../components/CategoryTable.vue";
import {useRouter} from "vue-router";
import MainHeader from "../components/Header.vue";

const props = defineProps<{
  brand?: string;
}>();

const router = useRouter();

const handleLogoClick = () => {
  router.push({ name: "home" });
}
</script>


<style scoped>
</style>
