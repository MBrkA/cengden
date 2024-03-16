<template>
  <main-header />
  <el-row style="margin-inline: 2rem">
    <el-col class="login-header" :span="24">
      <el-container class="login-container" v-loading="isLoading">
        <a class="login-title">{{data['title']}}</a>


          <el-row>
            <el-col :span="12">
              <el-container style="flex-direction: column">

                <el-row class="profile-row" style=" border: 0;   display: flex;
                    justify-content: center;width: 20vw;">
                  <img :src="data['image']" @error="$event.target.src='/photos/default.png'" alt="test"  style="width: 80%"/>
                </el-row>
                <el-row class="profile-row" style="width: 20vw;">
                  <el-col class="profile-row-col" style="display: flex;justify-content: center" :span="24">Owner</el-col>
                </el-row>
                <el-row class="profile-row" style="width: 20vw;">
                  <el-col class="profile-row-col" :span="8">Name</el-col>
                  <el-col class="profile-row-col" :span="16">{{owner['name']}}</el-col>
                </el-row>
                <el-row class="profile-row" style="width: 20vw;">
                  <el-col class="profile-row-col" :span="8">Phone</el-col>
                  <el-col class="profile-row-col" :span="16">{{owner['phone']}}</el-col>
                </el-row>


                <el-row v-if="userStore.user && userStore.user['_id'] === owner['_id']" class="profile-row" style="width: 20vw;">
                  <el-col class="profile-row-col" :span="8">Is Active</el-col>
                  <el-col class="profile-row-col" :span="16">{{data['isActive'] ? 'Yes':'No'}}</el-col>
                </el-row>
                <el-row v-loading="isActivating" v-if="userStore.user && userStore.user['_id'] === owner['_id']" class="profile-row" style="border:0;width: 20vw;">
                  <el-col class="profile-row-col" style="justify-content: center;" :span="24">
                    <el-button class="listing-detail-button" v-if="!data['isActive']" type="primary" style="width: 200px" @click="activateListing">Activate</el-button>
                    <el-button class="listing-detail-button" v-else type="primary" style="width: 200px" @click="deactivateListing">Deactivate</el-button>
                  </el-col>
                </el-row>

                <el-row v-loading="isAddingToFavorites" v-if="userStore.user && userStore.user['_id'] !== owner['_id']" class="profile-row" style="border:0;width: 20vw;">
                  <el-col class="profile-row-col" style="justify-content: center;" :span="24">
                    <el-button class="listing-detail-button" v-if="!isListingInFavorites" type="primary" style="width: 200px" @click="addListingToFavorites">Add to Favorites</el-button>
                    <el-button class="listing-detail-button" v-else type="primary" style="width: 200px" @click="removeListingToFavorites">Remove from Favorites</el-button>
                  </el-col>
                </el-row>
              </el-container>
            </el-col>
            <el-col :span="12">
              <el-container v-for="key in keysOfData" style="flex-direction: column">

                <el-row class="profile-row">
                  <el-col class="profile-row-col" :span="12">{{camelCaseToTitleCase(key)}}</el-col>
                  <el-col v-if="(typeof data[key]) !== 'object'" class="profile-row-col" :span="12">

                    <div v-if="key === 'price' || key === 'mileage'">
                      {{new Intl.NumberFormat('tr-TR').format(data[key])}}
                      {{key === 'price' ? '$' : 'km'}}
                    </div>
                    <div v-else-if="key === 'createdAt'">
                      {{new Date("2024-03-16T00:58:21.377Z").toLocaleDateString("tr-TR")}}
                    </div>
                    <div v-else>
                      {{data[key]}}
                    </div>
                  </el-col>
                </el-row>
                <div v-if="(typeof data[key]) === 'object'" v-for="i in getKeys(data[key])">
                  <el-row class="profile-row">
                    <el-col  class="profile-row-col" :span="12">
                      <div v-if="key !== 'lesson'">
                        {{camelCaseToTitleCase(i)}}
                      </div>
                    </el-col>
                    <el-col class="profile-row-col" :span="12">{{data[key][i]}}</el-col>
                  </el-row>
                </div>
              </el-container>
            </el-col>
          </el-row>

        <el-row class="profile-row" style="width: 50vw;margin-top: 20px">
          <el-col class="profile-row-col" style="display: flex;justify-content: center;" :span="24">Description</el-col>
        </el-row>
        <el-row class="profile-row" style="width: 50vw;">
          <el-col class="profile-row-col" style="    white-space: break-spaces;" :span="24">{{data['description']}}</el-col>
        </el-row>

      </el-container>
    </el-col>
    </el-row>
</template>
<script setup lang="ts">
import MainHeader from "../components/Header.vue";
import {computed, onBeforeMount, ref} from "vue";
import {useListingService} from "../service/listing.service.ts";
import {useUserService} from "../service/user.service.ts";
import {useUserStore} from "../store/user.store.ts";

const listingService = useListingService();
const userService = useUserService();
const userStore = useUserStore();
const owner:any = ref({});
const data:any = ref({});
const isLoading = ref(true);
const isAddingToFavorites = ref(false);
const isActivating = ref(false);
const keysOfData = computed(() => {
  return Object.keys(data.value).filter((key) => key !== "user" && key !== "description"
  && key !== "isActive"&& key !== "additionalFields"&& key !== "image" && key !== "_id" && key != "title");
})
const isListingInFavorites = computed(() => {
  return userStore.user?.favorites.includes(data.value._id);
})

function getKeys(val) {
  return Object.keys(val);
}

const props = defineProps<{
  id: string;
}>();

function addListingToFavorites() {
  isAddingToFavorites.value = true;
  userService.addToFavorites(userStore.user._id,data.value._id).then(() => {
    if (userStore.user) {
      userStore.addToFavorites(data.value._id)
    }
  }).catch((err) => {
    console.log(err);
  }).finally(() => {
    isAddingToFavorites.value = false;
  });
}

function removeListingToFavorites() {
  isAddingToFavorites.value = true;
  userService.removeFromFavorites(userStore.user._id,data.value._id).then(() => {
    if (userStore.user) {
      userStore.removeFromFavorites(data.value._id)
    }
  }).catch((err) => {
    console.log(err);
  }).finally(() => {
    isAddingToFavorites.value = false;
  });
}

function activateListing() {
  isActivating.value = true;
  listingService.activateListing(data.value._id).then(() => {
    data.value.isActive = true;
  }).catch((err) => {
    console.log(err);
  }).finally(() => {
    isActivating.value = false;
  });
}

function deactivateListing() {
  isActivating.value = true;
  listingService.deactivateListing(data.value._id).then(() => {
    data.value.isActive = false;
  }).catch((err) => {
    console.log(err);
  }).finally(() => {
    isActivating.value = false;
  });
}


function camelCaseToTitleCase(str: string) {
  return str
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, function(str){ return str.toUpperCase(); })
}

onBeforeMount(() => {
  listingService.getListingById(props.id)
      .then((res) => {
        data.value = res;
        userService.getUserById(data.value.user)
            .then((res) => {
              owner.value = res;
              isLoading.value = false;
            })
            .catch((err) => {
              console.log(err);
            })
      })
      .catch((err) => {
        console.log(err);
      });

});

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
  width: 400px;
  height: 50px;
  font-family: "Montserrat", sans-serif;
  --el-button-bg-color: #40475f;
  --el-button-hover-bg-color: #ffe800;
  --el-button-hover-text-color: black;
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

.profile-row-col {
  display: grid;
  align-items: center;
  justify-content: start;
  margin-bottom: 0;
}
.profile-row {
  width: 30vw;
  border: #dedede solid;
  border-width: 1px 0 0 0;
  padding-block: 10px;
}
.listing-detail-button {
  --el-button-bg-color: #40475f;
  --el-button-hover-bg-color: #ffe800;
  --el-button-hover-text-color: black;
}
</style>
