<template>
  <el-row style="margin-inline: 2rem">
    <el-col class="login-header" :span="24">
      <el-container class="login-container">
        <p v-if="isSubmitSuccessful">Listing successful!</p>
        <el-form v-else v-loading="isLoading">
          <a class="login-title">Computer Listing Form</a>
          <el-container style="flex-direction: column" v-for="key of keys">

            <el-row class="profile-row">
              <el-col class="profile-row-col" :span="8">
                {{ camelCaseToTitleCase(key.name) }}
                <span v-if="key.required" style="color: red">*</span>
              </el-col>
              <el-col class="profile-row-col" :span="16">
                <el-form-item class="profile-row-col">

                  <el-input v-if="key.type==='number'" style="width: 300px"  v-model.number="(form as any)[key.name]"
                            :placeholder="camelCaseToTitleCase(key.name)"
                            :type="key.type" min="0"
                  ></el-input>
                  <el-select v-else-if="key.type === 'select' && key.name !== 'model'" v-model="(form as any)[key.name]"
                             style="width: 300px"
                             :placeholder="camelCaseToTitleCase(key.name)"
                  >
                    <el-option :label="option" :value="option"
                               v-for="option in key.options"/>
                  </el-select>
                  <el-select v-else-if="key.type === 'select'" v-model="(form as any)[key.name]"
                             style="width: 300px"
                             :placeholder="camelCaseToTitleCase(key.name)"
                  >
                    <el-option :label="option" :value="option"
                               v-for="option in brandModels[selectedBrand as keyof typeof brandModels]"/>
                  </el-select>
                  <el-input v-else-if="key.name !== 'storage'" style="width: 300px"  v-model="(form as any)[key.name]"
                            :placeholder="camelCaseToTitleCase(key.name)"
                            :type="key.type" min="0"
                  ></el-input>
                </el-form-item>

                <div v-if="key.name === 'storage'" v-for="i in storageFields">
                  <el-form-item class="profile-row-col">
                    <el-select v-model="(storageSpecs as any)[i.name]"
                               style="width: 300px"
                               :placeholder="i.name.toUpperCase()"
                    >
                      <el-option :label="option" :value="option"
                                 v-for="option in i.options"/>
                    </el-select>
                  </el-form-item>
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
import {keysOfComputer, brandModels, storageFields} from "../model/computer.model.ts";
import {useUserStore} from "../store/user.store.ts";
import {useListingService} from "../service/listing.service.ts";
import {useUserService} from "../service/user.service.ts";
import router from "../router";

const props = defineProps<{
  updateId?: any;
}>();
let oldPrice = 0;

onMounted(() => {
  if (props.updateId) {
    listingService.getListingById(props.updateId).then((res) => {
      form.value = res;
      previousBrand.value = res.brand;
      storageSpecs.value = res.storage;
      oldPrice = res.price;

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

const userStore = useUserStore();
const listingService = useListingService();
const userServices = useUserService();

const isSubmitSuccessful = ref(false);
const isLoading = ref(false);
const keys = ref(keysOfComputer);

const form = ref({})
const storageSpecs = ref({})
const showEmptyError = ref(false);
const showError = ref(false);
const previousBrand = ref('')


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
  if (!requiredCheck()) {
    return;
  }
  const addFields = {}
  addFieldsRef.value.forEach((i:any) => {
    addFields[i.name] = i.value
  })

  if (props.updateId) {
    const data = {...form.value,
      additionalFields: {...addFields},
      storage: {...storageSpecs.value}}

    const dataId = data._id;
    delete data._id;
    isLoading.value = true;
    listingService.updateListing(props.updateId, data)
        .then(() => {
          showError.value = false;
          isSubmitSuccessful.value = true;
          if (data['price'] && oldPrice >= data['price']) {
            listingService.sendPriceDownMail(dataId)
                .then(() => {})
                .catch((e) => {
                  console.log(e)
                })
          }
        })
        .catch((e) => {
          showError.value = true;
          console.log(e)
        })
        .finally(() => {
          isLoading.value = false;
        })
  } else {
    const data = {...form.value, storage: {...storageSpecs.value},
      additionalFields: {...addFields},
      user: userStore.user._id, isActive: true, createdAt: new Date(),
      category: "Computer"
    }

    if (addFieldsRef.value.length === 0)
      delete data.additionalFields;
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
