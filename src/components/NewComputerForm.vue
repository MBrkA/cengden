<template>
  <el-row style="margin-inline: 2rem">
    <el-col class="login-header" :span="24">
      <el-container class="login-container">
        <p v-if="isSubmitSuccessful">Listing successful!</p>
        <el-form v-else v-loading="isLoading">
          <a class="login-title">New Computer Listing</a>
          <el-container style="flex-direction: column" v-for="key of keys">

            <el-row class="profile-row">
              <el-col class="profile-row-col" :span="8">{{ camelCaseToTitleCase(key.name) }}</el-col>
              <el-col class="profile-row-col" :span="16">
                <el-form-item class="profile-row-col">

                  <el-select v-if="key.type === 'select' && key.name !== 'model'" v-model="(form as any)[key.name]"
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
import {keysOfComputer, brandModels, storageFields} from "../model/computer.model.ts";
import {useUserStore} from "../store/user.store.ts";
import {useListingService} from "../service/listing.service.ts";
import {useUserService} from "../service/user.service.ts";

const userStore = useUserStore();
const listingService = useListingService();
const userServices = useUserService();

const isSubmitSuccessful = ref(false);
const isLoading = ref(false);
const keys = ref(keysOfComputer);

const form = ref({})
const storageSpecs = ref({})
const showError = ref(false);
const previousBrand = ref('')

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

function submitForm() {
  //Object.keys(form.value).length === keys.value.length-1
  if (true) {
    const data = {...form.value, storage: {...storageSpecs.value},
      user: userStore.user._id, isActive: true, createdAt: new Date(),
      category: "Computer"
    }
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
