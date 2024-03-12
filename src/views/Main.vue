
<template>
  <el-row class="main-header">
    <el-col :span="4" class="main-header-logo" @click="handleLogoClick">
      <p>cengden.com</p>
    </el-col>
  </el-row>
  <el-row>
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

const props = defineProps<{
  brand?: string;
}>();

const router = useRouter();

const handleLogoClick = ({row}: any) => {
  router.push({ name: "home" });
}
</script>


<style scoped>
.main-header {
  background-color: #3f475f;
  height: 50px;
  margin-block: 10px;
}
.main-header-logo {
  margin: 10px;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  font-size: 20px;
  font-weight: bolder;
  font-family: "Montserrat", sans-serif;
  background-color: #ffe800;
  cursor: pointer;
}
</style>
