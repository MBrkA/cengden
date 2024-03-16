
<template>
  <el-container class="data-table-container">
    <el-main>
      <el-table class="data-table" stripe :data="tableData" v-loading="props.isLoading"
                :cell-style="{ padding:'3px',height: '100px'}"
                @row-click="handleRowClick"
      >
        <el-table-column width="120px"  prop="image" label="" style="width: 100px">
          <template #default="scope">
            <img :src="scope.row.image" @error="$event.target.src='/photos/default.png'" :alt="scope.row.title"  style="width: 100px"/>
          </template>
        </el-table-column >
        <el-table-column width="120px" prop="category" label="Category" ></el-table-column>
        <el-table-column  prop="title" label="Title" ></el-table-column>
        <el-table-column width="200px"   prop="price" label="Price">
          <template #default="scope">
            {{new Intl.NumberFormat('tr-TR').format(scope.row.price)}} $
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import {computed} from 'vue'
import router from "../router";

const tableData = computed(() => {
  return props.data.sort((a:any, b:any) => a.createdAt < b.createdAt ? 1 : -1);
});

const props = defineProps<{
  isLoading?: boolean;
  data?: any;
}>();

function handleRowClick(row:any) {
  router.push(`/listing/${row['_id']}`);
}

</script>

<style scoped>
.data-table-container {
  min-height: 80vh;
  width: 80vw;
  border: 1px #dedede solid;
  background-color: white;
}
.data-table {
  width: 100%;
  --el-table-header-text-color: #292d2e;
  --el-table-header-bg-color: #e9e9e9;
  --el-fill-color-lighter: #f2f2f2;
  cursor: pointer;
}
</style>
