<template>
  <el-row style="margin-inline: 2rem">
    <el-col class="login-header" :span="24">
      <el-container class="login-container">
        <p v-if="isSubmitSuccessful">Listing successful!</p>
        <el-form v-else>
          <a class="login-title">New Private Lesson Listing</a>
          <el-container style="flex-direction: column" v-for="key of keys">

            <el-row class="profile-row">
              <el-col class="profile-row-col" :span="8">{{ camelCaseToTitleCase(key.name) }}</el-col>
              <el-col class="profile-row-col" :span="16">
                <el-form-item class="profile-row-col">
                  <el-input v-if="key.name === 'lessons'" style="width: 300px"  v-model="numOfLessons"
                            placeholder="Number of Lessons"
                            @change="updateLessons"
                            :type="key.type" min="1"></el-input>

                  <el-input v-else style="width: 300px"  v-model="(form as any)[key.name]"
                            :placeholder="camelCaseToTitleCase(key.name)"
                            :type="key.type" min="0"
                  ></el-input>
                </el-form-item>

                <div v-if="key.name === 'lessons'" v-for="i in t">
                  <el-form-item class="profile-row-col" >
                    <el-input  style="width: 300px"  v-model="(lessons as any)[i]"
                               placeholder="Lesson Name"
                               type="text" ></el-input>
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
import {keysOfLesson} from "../model/lesson.model.ts";
import {useUserStore} from "../store/user.store.ts";
import {useListingService} from "../service/listing.service.ts";

const keys = ref(keysOfLesson);
const isSubmitSuccessful = ref(false);
const userStore = useUserStore();
const listingService = useListingService();


const form:any = ref({})
const lessons = ref([])
const showError = ref(false);
const numOfLessons = ref(1)
const t = computed(() => {
  let r = [];
  for (let i = 0; i < numOfLessons.value; i++) {
    r.push(i)
  }
  return r;
})

function camelCaseToTitleCase(str: string) {
  return str
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, function(str){ return str.toUpperCase(); })
}

function submitForm() {
// Object.keys(form.value).length === keys.value.length-numOfLessons.value
  if (true) {
    const data = {...form.value, lesson: lessons.value,user: userStore.user._id, isActive: true, createdAt: new Date(),
      category: "lesson"
    }
    listingService.createListing(data)
        .then(() => {
          showError.value = false;
          isSubmitSuccessful.value = true;
        })
        .catch((e) => {
          showError.value = true;
          console.log(e)
        })
  } else {
    showError.value = true;
  }
}

function updateLessons() {
  lessons.value = lessons.value.slice(0, numOfLessons.value)
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
