
<template>
  <el-container class="data-table-container">
    <el-main v-loading="props.isLoading || btnLoading">
      <el-table class="data-table" stripe :data="tableData"
                :cell-style="{ padding:'3px',height: '100px'}"
      >
        <el-table-column  prop="email" label="Email" ></el-table-column>
        <el-table-column  prop="name" label="Name" ></el-table-column>
        <el-table-column  prop="phone" label="Phone" ></el-table-column>
        <el-table-column width="150px">
          <template #default="scope">
            <el-button type="primary" @click="handleRemoveButtonClick(scope.row)">Remove</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="data-pagination" @current-change="pageChange" background layout="prev, pager, next" :total="props.data.length" />
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue'
import {useUserService} from "../service/user.service.ts";
import {useListingService} from "../service/listing.service.ts";

const currentPage = ref(1);
const btnLoading = ref(false);
const userServices = useUserService();
const listingService = useListingService();

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

function handleRemoveButtonClick(row:any) {
  btnLoading.value = true;
  userServices.deleteUser(row._id).then(() => {
        for (const listingsKey in row.listings) {
          listingService.deleteListing(row.listings[listingsKey]._id).then(() => {
          }).catch((err) => {
            console.log(err);
          });
        }
      }).catch((err) => {
        console.log(err);
      })
      .finally(() => {
        props.data.splice(props.data.indexOf(row), 1);
        btnLoading.value = false;
      });
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
}
.data-pagination{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
</style>
