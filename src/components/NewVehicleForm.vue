<template>
  <el-row style="margin-inline: 2rem">
    <el-col class="login-header" :span="24">
      <el-container class="login-container">
        <p v-if="isSubmitSuccessful">Listing successful!</p>
        <el-form v-else>
          <a class="login-title">New Vehicle Listing</a>
          <el-container style="flex-direction: column" v-for="key of keys">

            <el-row class="profile-row">
              <el-col class="profile-row-col" :span="8">{{ camelCaseToTitleCase(key.name) }}</el-col>
              <el-col class="profile-row-col" :span="16">
                <el-form-item class="profile-row-col"
                >

                  <el-select v-if="key.type === 'select'  && key.name === 'type'" v-model="(form as any)[key.name]"
                             style="width: 300px"
                             :placeholder="camelCaseToTitleCase(key.name)"
                             @change="resetAdditionalFields"
                  >
                    <el-option :label="option" :value="option.toLowerCase()"
                               v-for="option in key.options"/>
                  </el-select>
                  <el-select v-else-if="key.type === 'select'  && key.name !== 'model'" v-model="(form as any)[key.name]"
                             style="width: 300px"
                             :placeholder="camelCaseToTitleCase(key.name)"
                  >
                    <el-option :label="option" :value="option.toLowerCase()"
                               v-for="option in key.options"/>
                  </el-select>
                  <el-select v-else-if="key.type === 'select'" v-model="(form as any)[key.name]"
                             style="width: 300px"
                             :placeholder="camelCaseToTitleCase(key.name)"
                  >
                    <el-option :label="option" :value="option.toLowerCase()"
                               v-for="option in brandModels[selectedBrand as keyof typeof brandModels]"/>
                  </el-select>

                  <el-input v-else style="width: 300px"  v-model="(form as any)[key.name]"
                            :placeholder="camelCaseToTitleCase(key.name)"
                            :type="key.type"
                  ></el-input>


                </el-form-item>
              </el-col>
            </el-row>

            <div v-if="key.name === 'type' && additionalFields.length !== 0" style="flex-direction: column; border-block: 1px #dedede solid; padding-top: 18px;margin-bottom: 18px">
            <div  v-for="addKey of additionalFields">

              <el-row class="profile-row">
                <el-col class="profile-row-col" :span="8">{{ camelCaseToTitleCase(addKey.name) }}</el-col>
                <el-col class="profile-row-col" :span="16">
                  <el-form-item class="profile-row-col"
                  >
                    <el-input style="width: 300px"  v-model="(additionalFieldValues as any)[addKey.name]"
                              :placeholder="camelCaseToTitleCase(addKey.name)"
                              :type="addKey.type"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

            </div></div>

          </el-container>
          <p class="error-text" v-if="showError">
            <span>Listing creation failed!</span>
          </p>
          <el-form-item>
            <el-button class="login-input" type="primary" @click="submitForm">Submit</el-button>
          </el-form-item>
        </el-form>
      </el-container>
    </el-col>
  </el-row>

</template>
<script setup lang="ts">
import {computed, ref} from "vue";
import {keysOfVehicle,carTypeFields,brandModels} from "../model/vehicle.model.ts";
import {useUserStore} from "../store/user.store.ts";
import {useListingService} from "../service/listing.service.ts";

const keys = ref(keysOfVehicle);
const isSubmitSuccessful = ref(false);
const userStore = useUserStore();
const listingService = useListingService();

const additionalFields = computed(() => {
  if (!form.value.type) {return [];}
  switch (form.value.type) {
    case "electric car":
      return carTypeFields.electric;
    case "caravan":
      return carTypeFields.caravan;
    case "truck":
      return carTypeFields.truck;
    default:
      return [];
  }
})

const form:any = ref({})
const showError = ref(false);
const previousBrand = ref('')
const additionalFieldValues = ref({})


const selectedBrand = computed(() => {
  if (form.value['brand' as keyof typeof form.value] !== previousBrand.value) {
    previousBrand.value = form.value['brand' as keyof typeof form.value]
    delete form.value['model' as keyof typeof form.value]
  }
  const t = (form.value['brand' as keyof typeof form.value] ? form.value['brand' as keyof typeof form.value] : '')
  return camelCaseToTitleCase(t);
});

function camelCaseToTitleCase(str: string) {
  return str
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, function(str){ return str.toUpperCase(); })
}

function resetAdditionalFields() {
  additionalFieldValues.value = {}
}

function submitForm() {
  // Object.keys(form.value).length === keys.value.length
  if (true) {
    const data = {...form.value, ...additionalFieldValues.value,user: userStore.user._id, isActive: true, createdAt: new Date(),
      category: "vehicle"
    }
    listingService.createListing(data)
        .then(() => {
          showError.value = false;
          isSubmitSuccessful.value = true;
        })
        .catch((e) => {
          console.log(e)
        })
  } else {
    showError.value = true;
  }
}


</script>
<style scoped>
.login-header {
  height: 50px;
  margin-block: 10px;
  padding-inline: 2rem;
  display: grid;
  justify-content: center;
  align-items: center;
}
.login-container {
  border: 1px #dedede solid;
  background-color: white;
  width: 80vw;
  display: grid;
  justify-content: center;
  padding-inline: 20px;
  padding-top: 20px;
  padding-bottom: 100px;
}
.login-input {
  width: 100%;
  height: 50px;
  font-family: "Montserrat", sans-serif;
}
.login-title {
  font-size: 20px;
  font-weight: bold;
  font-family: "Montserrat", sans-serif;
  color: black;
  margin-block: 20px;
  display: grid;
  justify-content: center;
  align-items: center;
}
.error-text {
  color: red;
  font-size: 16px;
  font-family: "Montserrat", sans-serif;
  display: grid;
  justify-content: center;
  align-items: center;
  justify-items: center;
}
</style>
