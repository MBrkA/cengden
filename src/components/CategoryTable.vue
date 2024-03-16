
<template>
  <el-container class="category-table-container">
    <el-main>
      <el-tree
          v-if="false"
          style="max-width: 600px"
          :data="data"
          :props="defaultProps"
          default-expand-all
          @node-click="handleNodeClick"
      />
      <el-table :data="categories" style="width: 100%;"
                class="category-table">
        <el-table-column prop="brand" label="Categories" >
          <template #default="scope">
            <a style="color: #606266;
                      cursor: pointer;"
               @click="handleBrandClick(scope)"
            >{{scope.row.title}}</a>
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

const categories = ref([
  {title: "Vehicles", value: "Vehicle"},
  {title: "Computers", value: "Computer"},
  {title: "Phones", value: "Phones"},
  {title: "Private Lessons", value: "Lesson"}
])

const handleBrandClick = ({row}: any) => {
  router.push({ name: "list-category", params: { category: row.value } });
}

const defaultProps = {
  children: 'children',
  label: 'label',
}

interface Tree {
  label: string
  children?: Tree[]
}

const handleNodeClick = (data: Tree) => {
  if (!data.children) {
    router.push({ name: "list-category", params: { category: data.label } });
  }

}



const data: Tree[] = [
  {
    label: 'Vehicle',
    children: [
      {label: "Toyota"}, {label: "Honda"}, {label: "Tesla"}, {label: "Airstream"}, {label: "Ford"}
    ],
  },
]
</script>


<style scoped>
.category-table {
  //color: #a7d0bf;
  //--el-table-tr-bg-color: #6d028d;
  //--el-table-row-hover-bg-color: #ffe800;
  --el-table-row-hover-bg-color: #fffcdb;
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
