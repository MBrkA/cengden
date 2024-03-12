
<template>
  <el-container class="data-table-container">
    <el-main>
      <el-table class="data-table" :data="tableData" v-loading="tableLoading">
        <el-table-column prop="model" label="Model" ></el-table-column>
        <el-table-column prop="brand" label="Brand" ></el-table-column>
        <el-table-column prop="title" label="Title"></el-table-column>
        <el-table-column prop="year" label="Year"></el-table-column>
        <el-table-column prop="mileage" label="Mileage"></el-table-column>
        <el-table-column prop="color" label="Color"></el-table-column>
        <el-table-column prop="price" label="Price"></el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue'
/*
Examples for items: • Vehicles:
– Vehicle: Title: ”Toyota Corolla 2020”, Type: ”Sedan”, Brand:”Toyota”, Model:”Corolla”, Year:”2020”, Color:”Silver”, Engine Displacement:”1.8 cc”, Fuel Type:”Petrol”, Trans- mission Type: ”Automatic”, Mileage:”20,000 km”, Price:”$15,000”, Image:”image path”, Description:”good car”
– Vehicle: {Title: ”Honda Civic 2018”, Type: ”Sedan”, Brand: ”Honda”, Model: ”Civic”, Year: ”2018”, Color: ”White”, Engine Displacement: ”1.5L”, Fuel Type: ”Petrol”, Transmission Type: ”CVT”, Mileage: ”25,000 km”, Price: ”$12,500”, Image: ”image path”, Description: ”good condition Civic with low mileage”}
– Vehicle: Title: ”Tesla Model S”, Type: ”Electric Car”, Brand: ”Tesla”, Model: ”Model S”, Year: ”2022”, Color: ”Red”, Engine Displacement: ”N/A”, Fuel Type: ”Electric”, Transmission Type:”Automatic”, Mileage: ”10,000 km”, Price: ”$80,000”, Image: ”image path”, Description: ”Luxurious electric sedan with autopilot feature” Additional Attributes for Electric Car: Battery Capacity: ”100 kWh”, Range: ”350 km”
– Vehicle: Title: ”Airstream Flying Cloud 25FB”, Type: ”Caravan”, Brand: ”Airstream”, Model: ”Flying Cloud 25FB”, Year: ”2023”, Color: ”Silver”, Engine Displace- ment: ”3.0L”, Fuel Type: ”Diesel”, Transmission Type: ”Manual”, Mileage: ”15,000 miles”, Price: ”$40,000”, Image: ”image path”, Description: ”Spacious travel trailer
for outdoor adventures”
Additional Attributes for Caravan: Bed Capacity: ”Sleeps 4”, Water Tank Capacity: ”50 liters”
– Vehicle: Title: ”Ford F-150 2020”, Type: ”Truck”, Brand: ”Ford”, Model: ”F- 150”, Year: ”2020”, Color: ”Black”, Engine Displacement: ”3.5L V6”, Fuel Type: ”Petrol”, Transmission Type: ”Automatic”, Mileage: ”30,000 km”, Price: ”$35,000”, Image: ”image path”, Description: ”Powerful pickup truck for various tasks” Additional Attributes for Truck: Payload Capacity: ”1500 kg”
 */

const vehicles = ref([
  {
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
    image: 'image path',
    description: 'good car'
  },
  {
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
    image: 'image path',
    description: 'good condition Civic with low mileage'
  },
  {
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
    image: 'image path',
    description: 'Luxurious electric sedan with autopilot feature',
    batteryCapacity: '100 kWh',
    range: '350 km'
  },
  {
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
    image: 'image path',
    description: 'Spacious travel trailer for outdoor adventures',
    bedCapacity: 'Sleeps 4',
    waterTankCapacity: '50 liters'
  },
  {
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
    image: 'image path',
    description: 'Powerful pickup truck for various tasks',
    payloadCapacity: '1500 kg'
  }
])
const tableLoading = ref(false);
const tableData = computed(() => {
  if (props.category) {
    return vehicles.value.filter((vehicle) => vehicle.brand === props.category);
  }
  return vehicles.value;
});

const props = defineProps<{
  category?: string;
}>();

</script>

<style scoped>
.data-table-container {
  min-height: 80vh;
  border: 1px #dedede solid;
}
.data-table {
  width: 100%;
  --el-table-header-text-color: #292d2e;
  --el-table-header-bg-color: #e9e9e9;
}
</style>
