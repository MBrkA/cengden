<template>
  <el-row style="margin-inline: 2rem">
    <el-col class="login-header" :span="24">
      <el-container class="login-container">
        <p v-if="isSubmitSuccessful">Listing successful!</p>
        <el-form v-else v-loading="isLoading" style="width: 40vw">
          <a class="login-title">Phone Listing Form</a>
          <el-container style="flex-direction: column" v-for="key of keys">

            <el-row class="profile-row">
              <el-col class="profile-row-col" :span="8">
                {{ camelCaseToTitleCase(key.name) }}
                <span v-if="key.required" style="color: red">*</span>
              </el-col>
              <el-col class="profile-row-col" :span="16">
                <el-form-item class="profile-row-col">

                  <el-select v-if="key.type === 'select' && key.name !== 'model'" v-model="(form as any)[key.name]"

                             :placeholder="camelCaseToTitleCase(key.name)"
                  >
                    <el-option :label="option" :value="option"
                               v-for="option in key.options"/>
                  </el-select>
                  <el-select v-else-if="key.type === 'select'" v-model="(form as any)[key.name]"

                             :placeholder="camelCaseToTitleCase(key.name)"
                  >
                    <el-option :label="option" :value="option"
                               v-for="option in brandModels[selectedBrand as keyof typeof brandModels]"/>
                  </el-select>
                  <el-input v-else-if="key.name !== 'cameraSpecifications'"   v-model="(form as any)[key.name]"
                            :placeholder="camelCaseToTitleCase(key.name)"
                            :type="key.type" min="0"
                  ></el-input>
                </el-form-item>

                <div v-if="false && key.name === 'cameraSpecifications'" v-for="i in cameraSpecificationsFields">
                  <el-form-item class="profile-row-col" >
                    <el-select v-model="(camSpecs as any)[i.name]"

                               :placeholder="camelCaseToTitleCase(i.name)"
                    >
                      <el-option :label="option" :value="option"
                                 v-for="option in i.options"/>
                    </el-select>
                  </el-form-item>
                </div>

                <div v-if="key.name === 'cameraSpecifications'"  style="margin-bottom: 18px">
                  <el-button type="info" @click="addToCamSpecsRef" style="margin-bottom: 5px">Add</el-button>
                  <div v-for="(i,k) in camSpecsRef">
                    <el-form-item class="profile-row-col" style="margin-bottom: 5px">
                      <el-row>
                        <el-col span="11">
                          <el-input v-model="i['name']"
                                    placeholder="Name"></el-input>
                        </el-col>
                        <el-col span="11">
                          <el-input v-model="i['value']"
                                    placeholder="Value"></el-input></el-col>
                        <el-col span="2">
                          <el-button width="50px" type="danger" @click="removeFromCamSpecsRef(k)">-</el-button>

                        </el-col>
                      </el-row>

                    </el-form-item>
                  </div>
                </div>

              </el-col>
            </el-row>

          </el-container>

          <el-row class="profile-row">
            <el-col class="profile-row-col" :span="8"> Additional Fields </el-col>
            <el-col class="profile-row-col" :span="16">
              <div  style="margin-bottom: 18px">
                <el-button type="info" @click="addToAddFieldsRef" style="margin-bottom: 5px">Add</el-button>
                <div v-for="(i,k) in addFieldsRef">
                  <el-form-item class="profile-row-col" style="margin-bottom: 5px">
                    <el-row>
                      <el-col span="11">
                        <el-input v-model="i['name']"
                                  placeholder="Name"></el-input>
                      </el-col>
                      <el-col span="11">
                        <el-input v-model="i['value']"
                                  placeholder="Value"></el-input></el-col>
                      <el-col span="2">
                        <el-button width="50px" type="danger" @click="removeFromAddFieldsRef(k)">-</el-button>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </div>
              </div>
              </el-col>
          </el-row>

          <p class="error-text" v-if="showError">
            <span>Listing creation failed!</span>
          </p>
          <p class="error-text" v-if="showEmptyError">
            <span>Fill all required fields!</span>
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
import {computed, onMounted, ref} from "vue";
import {keysOfPhone, cameraSpecificationsFields, brandModels} from "../model/phone.model.ts";
import {useUserStore} from "../store/user.store.ts";
import {useListingService} from "../service/listing.service.ts";
import {useUserService} from "../service/user.service.ts";
import router from "../router";

const props = defineProps<{
  updateId?: any;
}>();

onMounted(() => {
  if (props.updateId) {
    listingService.getListingById(props.updateId).then((res) => {
      form.value = res;
      previousBrand.value = res.brand;

      if (res.cameraSpecifications)
        Object.keys(res.cameraSpecifications).forEach((key:any) => {
          const obj = {name: key, value: res.cameraSpecifications[key]}
          camSpecsRef.value.push(obj)
        })

      if (res.additionalFields) {
        Object.keys(res.additionalFields).forEach((key:any) => {
          const obj = {name: key, value: res.additionalFields[key]}
          addFieldsRef.value.push(obj)
        })
      }

    }).catch(() => {
      router.back();
    });
  }
})

const keys = ref(keysOfPhone);
const isSubmitSuccessful = ref(false);
const userStore = useUserStore();
const listingService = useListingService();
const userServices = useUserService();

const isLoading = ref(false);
const form = ref({})
const camSpecs = ref({})
const showEmptyError = ref(false);
const showError = ref(false);
const previousBrand = ref('')

// CAMERA SPECIFICATIONS
const camSpecsRef = ref([])
const addToCamSpecsRef = () => {
  camSpecsRef.value.push({name: '', value: ''});
}
const removeFromCamSpecsRef = (key) => {
  camSpecsRef.value.splice(key, 1)
}

// ADDITIONAL FIELDS
const addFieldsRef = ref([])
const addToAddFieldsRef = () => {
  addFieldsRef.value.push({name: '', value: ''});
}
const removeFromAddFieldsRef = (key) => {
  addFieldsRef.value.splice(key, 1)
}

const selectedBrand = computed(() => {
  if (form.value['brand' as keyof typeof form.value] !== previousBrand.value) {
    previousBrand.value = form.value['brand' as keyof typeof form.value]
    delete form.value['model' as keyof typeof form.value]
  }
  const t = (form.value['brand' as keyof typeof form.value] ? form.value['brand' as keyof typeof form.value] : '')
  return t;
});

function camelCaseToTitleCase(str: string) {
  return str
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, function(str){ return str.toUpperCase(); })
}

function requiredCheck() {
  for (let i of keys.value) {
    if (i.required && !(form.value as any)[i.name]) {
      showEmptyError.value = true;
      return false;
    }
  }
  showEmptyError.value = false;
  return true;
}

function submitForm() {
  if (!requiredCheck()) return;
  const specs = {}
  const addFields = {}
  camSpecsRef.value.forEach((i:any) => {
    specs[i.name] = i.value
  })
  addFieldsRef.value.forEach((i:any) => {
    addFields[i.name] = i.value
  })

  if (props.updateId) {
    const data = {
      ...form.value,
      cameraSpecifications: {...specs},
      additionalFields: {...addFields},
    }

    delete data._id;

    isLoading.value = true;
    listingService.updateListing(props.updateId, data)
        .then(() => {
          showError.value = false;
          isSubmitSuccessful.value = true;
        })
        .catch((e) => {
          showError.value = true;
          console.log(e)
        })
        .finally(() => {
          isLoading.value = false;
        })
  } else {
    const data = {...form.value,
      cameraSpecifications: {...specs},
      additionalFields: {...addFields},
      user: userStore.user._id,
      isActive: true,
      createdAt: new Date(),
      category: "Phone"
    }

    if (addFieldsRef.value.length === 0)
      delete data.additionalFields;
    if (camSpecsRef.value.length === 0)
      delete data.cameraSpecifications;

    isLoading.value = true;
    listingService.createListing(data)
        .then((res) => {
          userServices.addToListings(userStore.user._id, res['insertedId'])
              .then(() => {
                showError.value = false;
                isSubmitSuccessful.value = true;
              })
              .catch((e) => {
                showError.value = true;
                console.log(e)
              })
        })
        .catch((e) => {
          showError.value = true;
          console.log(e)
        })
        .finally(() => {
          isLoading.value = false;
        })
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
