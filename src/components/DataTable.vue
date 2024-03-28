
<template>
  <el-container class="data-table-container">
    <el-main v-loading="props.isLoading">
      <el-table class="data-table" stripe :data="tableData"
                :cell-style="{ padding:'3px',height: '100px'}"
                @row-click="handleRowClick"
      >
        <el-table-column width="120px"  prop="image" label="" style="width: 100px">
          <template #default="scope">
            <img v-if="scope.row.image" :src="scope.row.image" @error="$event.target.src='/photos/default.png'" :alt="scope.row.title"  style="width: 100px"/>
            <img v-else src="/photos/default.png" :alt="scope.row.title"  style="width: 100px"/>
          </template>
        </el-table-column >
        <el-table-column width="120px" prop="category" label="Category" ></el-table-column>
        <el-table-column  prop="title" label="Title" ></el-table-column>
        <el-table-column width="120px" prop="createdAt" label="Date" >
          <template #default="scope">
            {{new Date(scope.row.createdAt).toLocaleDateString('tr-TR')}}
          </template>
        </el-table-column>
        <el-table-column width="200px"   prop="price" label="Price">
          <template #default="scope">
            {{new Intl.NumberFormat('tr-TR').format(scope.row.price)}} $
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="data-pagination" @current-change="pageChange" background layout="prev, pager, next" :total="props.data.length" />
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue'
import router from "../router";

const currentPage = ref(1);

const tableData = computed(() => {
  const data =  props.data.sort((a:any, b:any) => a.createdAt < b.createdAt ? 1 : -1);
  return data.slice((currentPage.value - 1) * 10, currentPage.value * 10);

});


const pageChange = (val: any) => {
  currentPage.value = val;
};


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
.data-pagination{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
</style>
