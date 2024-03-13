
<template>
  <el-container class="category-table-container">
    <el-main>
      <el-table :data="brands" style="width: 100%"
                class="category-table">
        <el-table-column prop="brand" label="Brands" >
          <template #default="scope">
            <a style="color: #606266;
                      cursor: pointer;"
               @click="handleBrandClick(scope)"
            >{{scope.row.brand}}</a>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {useRouter} from "vue-router";


const router = useRouter();

const brands = ref([
  {brand: "Toyota"}, {brand: "Honda"}, {brand: "Tesla"}, {brand: "Airstream"}, {brand: "Ford"}
])

const handleBrandClick = ({row}: any) => {
  router.push({ name: "list-category", params: { brand: row.brand } });
}

</script>


<style scoped>
.category-table {
  //color: #a7d0bf;
  //--el-table-tr-bg-color: #6d028d;
  --el-table-row-hover-bg-color: #ffe800;
  --el-table-current-row-bg-color: #9e02cc;
  --el-table-header-text-color: #292d2e;
  --el-table-header-bg-color: #e9e9e9;

}
 .category-table-container {
   border: 1px #dedede solid;
   margin-right: 10px;
   background-color: white;
 }
</style>
