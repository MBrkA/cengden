
<template>
  <main-header />
  <el-row style="margin-inline: 2rem">
    <el-col :span="4">
      <category-table />
      <el-container
          v-if="props.category" class="filter-table-container">
        <el-input v-model="filter['title']" placeholder="Title"/>
        <el-select
            v-for="attr in filterOptions[props.category]"
            v-model="filter[attr.filterName]"
            multiple
            :placeholder="camelCaseToTitleCase(attr.name)"
            style="width:100%;"
        >
          <div
              v-if="attr.name === 'brandModels'"
              v-for="brand in filter['brand']"
          >
            <el-option
                v-for="itemM in attr.value[brand]"
                :key="itemM"
                :label="itemM"
                :value="itemM"
            />
          </div>
          <el-option
              v-else
              v-for="item in attr.value"
              :key="item"
              :label="item"
              :value="item"
          />
      </el-select>
        <el-row v-if="props.category === 'Lesson'">
          <el-input v-model="filter['lesson']" placeholder="Lesson"/>
          <el-input v-model="filter['location']" placeholder="Location"/>
          <el-input v-model.number="filter['duration']" placeholder="Duration" type="number"/>
        </el-row>
        <el-row>
          <el-col :span="12"><el-input v-model.number="filter['minPrice']" placeholder="MinPrice" type="number"/></el-col>
          <el-col :span="12"><el-input v-model.number="filter['maxPrice']" placeholder="MaxPrice" type="number"/></el-col>
        </el-row>
      <el-button @click="filterData" type="primary">Filter</el-button>
    </el-container>
    </el-col>
    <el-col :span="20">
      <data-table :isLoading="isLoading" :data="data"/>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import DataTable from "../components/DataTable.vue";
import CategoryTable from "../components/CategoryTable.vue";
import MainHeader from "../components/Header.vue";
import {useListingService} from "../service/listing.service.ts";
import {onBeforeMount, onMounted, ref, watch} from "vue";
import * as VehicleAttrs from "../model/vehicle.model.ts";
import * as PhoneAttrs from "../model/phone.model.ts";
import * as ComputerAttrs from "../model/computer.model.ts";
import router from "../router";

const props = defineProps<{
  category?: string;
}>();

const listingService = useListingService();

const data = ref([]);
const isLoading = ref(true);
const filter = ref({});



const vehicleAttrs = [
  {name: "vehicleTypes", value: VehicleAttrs.vehicleTypes, filterName: "type"},
  {name: "vehicleBrands", value: VehicleAttrs.vehicleBrands, filterName: "brand"},
  {name: "brandModels", value: VehicleAttrs.brandModels, filterName: "model"},
  {name: "colorOptions", value: VehicleAttrs.colorOptions, filterName: "color"},
  {name: "engineDisplacementOptions", value: VehicleAttrs.engineDisplacementOptions, filterName: "engineDisplacement"},
  {name: "fuelTypes", value: VehicleAttrs.fuelTypes, filterName: "fuelType"},
  {name: "transmissionTypes", value: VehicleAttrs.transmissionTypes, filterName: "transmissionType"}
]

const phoneAttrs = [
  {name: "phoneBrands", value: PhoneAttrs.phoneBrands, filterName: "brand"},
  {name: "brandModels", value: PhoneAttrs.brandModels, filterName: "model"},
  {name: "operatingSystems", value: PhoneAttrs.operatingSystems, filterName: "operatingSystem"},
  {name: "storageOptions", value: PhoneAttrs.storageOptions, filterName: "storage"},
  {name: "ramOptions", value: PhoneAttrs.ramOptions, filterName: "ram"},
  {name: "batteryCapacities", value: PhoneAttrs.batteryCapacityOptions, filterName: "batteryCapacity"},
]

const computerAttrs = [
  {name: "computerTypes", value: ComputerAttrs.computerTypes, filterName: "type"},
  {name: "computerBrands", value: ComputerAttrs.computerBrands, filterName: "brand"},
  {name: "brandModels", value: ComputerAttrs.brandModels, filterName: "model"},
  {name: "processorOptions", value: ComputerAttrs.processors, filterName: "processor"},
  {name: "operatingSystems", value: ComputerAttrs.operatingSystems, filterName: "operatingSystem"},
  {name: "ssdOptions", value: ComputerAttrs.storageFields[0].options, filterName: "ssd"},
  {name: "hddOptions", value: ComputerAttrs.storageFields[0].options, filterName: "hdd"},
  {name: "ramOptions", value: ComputerAttrs.ramOptions, filterName: "ram"},
  {name: "graphicsCards", value: ComputerAttrs.graphicsCards, filterName: "graphicsCard"},
]

const lessonAttrs = [
  {name: "location", type: "string", required: false},
  {name: "duration", type: "number", required: false},
]

const filterOptions = {
  "Vehicle": vehicleAttrs,
  "Phone": phoneAttrs,
  "Computer": computerAttrs,
};
const filterData = () => {
  isLoading.value = true;
  listingService.getListingsByFilter(filter.value).then((res) => {
    data.value = res;
    console.log(res)
    isLoading.value = false;
  }).catch((err) => {
    console.log(err);
  });
}

watch(() => props.category, () => {
  filter.value = props.category ?  {category: [props.category]}: {};
  filterData();
})

onMounted(() => {
  listingService.getAllListings().then((res) => {
    data.value = res;
    isLoading.value = false;
  }).catch((err) => {
    console.log(err);
  });
})


function camelCaseToTitleCase(str: string) {
  return str
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, function(str){ return str.toUpperCase(); })
}

</script>


<style scoped>

.filter-table-container {
  border: 1px #dedede solid;
  margin-right: 10px;
  margin-top: 10px;
  background-color: white;
  flex-direction: column;
}
</style>
