
<template>
  <el-container class="data-table-container">
    <el-main>
      <el-table class="data-table" stripe :data="tableData" v-loading="props.isLoading"
                :cell-style="{ padding:'3px',height: '100px'}"
                @row-click="handleRowClick"
      >
        <el-table-column prop="image" label="" style="width: 100px">
          <template #default="scope">
            <img :src="scope.row.image" @error="$event.target.src='/photos/default.png'" :alt="scope.row.title"  style="width: 100px"/>
          </template>
        </el-table-column >
        <el-table-column  prop="category" label="Category" ></el-table-column>
        <el-table-column  prop="title" label="Title" ></el-table-column>
        <el-table-column  prop="price" label="Price"></el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue'
import router from "../router";
// <img :src="getImgUrl(scope.row.image)" :alt="scope.row.title"  style="width: 100px"/>
const vehicles = ref([
  {
    category: 'vehicle',
    title: 'Toyota Corolla 2020',
    type: 'Sedan',
    brand: 'Toyota',
    model: 'Corolla',
    year: '2020',
    color: 'Silver',
    engineDisplacement: '1.8 cc',
    fuelType: 'Petrol',
    transmissionType: 'Automatic',
    mileage: '20,000 km',
    price: '$15,000',
    image: 'corolla',
    description: 'good car'
  },
  {
    category: 'vehicle',
    title: 'Honda Civic 2018',
    type: 'Sedan',
    brand: 'Honda',
    model: 'Civic',
    year: '2018',
    color: 'White',
    engineDisplacement: '1.5L',
    fuelType: 'Petrol',
    transmissionType: 'CVT',
    mileage: '25,000 km',
    price: '$12,500',
    image: 'civic',
    description: 'good condition Civic with low mileage'
  },
  {
    category: 'vehicle',
    title: 'Tesla Model S',
    type: 'Electric Car',
    brand: 'Tesla',
    model: 'Model S',
    year: '2022',
    color: 'Red',
    engineDisplacement: 'N/A',
    fuelType: 'Electric',
    transmissionType: 'Automatic',
    mileage: '10,000 km',
    price: '$80,000',
    image: 'tesla',
    description: 'Luxurious electric sedan with autopilot feature',
    batteryCapacity: '100 kWh',
    range: '350 km'
  },
  {
    category: 'vehicle',
    title: 'Airstream Flying Cloud 25FB',
    type: 'Caravan',
    brand: 'Airstream',
    model: 'Flying Cloud 25FB',
    year: '2023',
    color: 'Silver',
    engineDisplacement: '3.0L',
    fuelType: 'Diesel',
    transmissionType: 'Manual',
    mileage: '15,000 miles',
    price: '$40,000',
    image: 'airstream',
    description: 'Spacious travel trailer for outdoor adventures',
    bedCapacity: 'Sleeps 4',
    waterTankCapacity: '50 liters'
  },
  {
    category: 'vehicle',
    title: 'Ford F-150 2020',
    type: 'Truck',
    brand: 'Ford',
    model: 'F-150',
    year: '2020',
    color: 'Black',
    engineDisplacement: '3.5L V6',
    fuelType: 'Petrol',
    transmissionType: 'Automatic',
    mileage: '30,000 km',
    price: '$35,000',
    image: 'f150',
    description: 'Powerful pickup truck for various tasks',
    payloadCapacity: '1500 kg'
  },

  {
    category: 'vehicle',
    title: 'Toyota Corolla 2020',
    type: 'Sedan',
    brand: 'Toyota',
    model: 'Corolla',
    year: '2020',
    color: 'Silver',
    engineDisplacement: '1.8 cc',
    fuelType: 'Petrol',
    transmissionType: 'Automatic',
    mileage: '20,000 km',
    price: '$15,000',
    image: 'corolla',
    description: 'good car'
  },
  {
    category: 'vehicle',
    title: 'Honda Civic 2018',
    type: 'Sedan',
    brand: 'Honda',
    model: 'Civic',
    year: '2018',
    color: 'White',
    engineDisplacement: '1.5L',
    fuelType: 'Petrol',
    transmissionType: 'CVT',
    mileage: '25,000 km',
    price: '$12,500',
    image: 'civic',
    description: 'good condition Civic with low mileage'
  },
  {
    category: 'vehicle',
    title: 'Tesla Model S',
    type: 'Electric Car',
    brand: 'Tesla',
    model: 'Model S',
    year: '2022',
    color: 'Red',
    engineDisplacement: 'N/A',
    fuelType: 'Electric',
    transmissionType: 'Automatic',
    mileage: '10,000 km',
    price: '$80,000',
    image: 'tesla',
    description: 'Luxurious electric sedan with autopilot feature',
    batteryCapacity: '100 kWh',
    range: '350 km'
  },
  {
    category: 'vehicle',
    title: 'Airstream Flying Cloud 25FB',
    type: 'Caravan',
    brand: 'Airstream',
    model: 'Flying Cloud 25FB',
    year: '2023',
    color: 'Silver',
    engineDisplacement: '3.0L',
    fuelType: 'Diesel',
    transmissionType: 'Manual',
    mileage: '15,000 miles',
    price: '$40,000',
    image: 'airstream',
    description: 'Spacious travel trailer for outdoor adventures',
    bedCapacity: 'Sleeps 4',
    waterTankCapacity: '50 liters'
  },
  {
    category: 'vehicle',
    title: 'Ford F-150 2020',
    type: 'Truck',
    brand: 'Ford',
    model: 'F-150',
    year: '2020',
    color: 'Black',
    engineDisplacement: '3.5L V6',
    fuelType: 'Petrol',
    transmissionType: 'Automatic',
    mileage: '30,000 km',
    price: '$35,000',
    image: 'f150',
    description: 'Powerful pickup truck for various tasks',
    payloadCapacity: '1500 kg'
  }
])
const tableLoading = ref(false);
const tableData = computed(() => {
  if (props.category) {
    return props.data.filter((vehicle) => vehicle.category === props.category);
  }
  return props.data;
});

const props = defineProps<{
  category?: string;
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
