<template>
  <main-header />
  <el-row style="margin-inline: 2rem">
    <el-col class="login-header" :span="24">
      <el-container class="login-container">
        <a class="login-title">Profile</a>
        <el-row class="profile-row">
          <el-col class="profile-row-col" :span="8">Email</el-col>
          <el-col class="profile-row-col" :span="12">
            <el-form-item class="profile-row-col">
              <el-input style="width: 200px"  v-model="form.email" placeholder="Email" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="profile-row-col" :span="4">
          </el-col>
        </el-row>
          <el-row class="profile-row">
            <el-col class="profile-row-col" :span="8">Name</el-col>
            <el-col class="profile-row-col" :span="12">
              <el-form-item class="profile-row-col">
                <el-input style="width: 200px"  v-model="form.name" placeholder="Name"></el-input>
              </el-form-item>
            </el-col>
            <el-col class="profile-row-col" :span="4" v-if="!isNameSubmitted">
              <el-button type="primary" @click="submitName">Change</el-button>
            </el-col>
            <el-col class="profile-row-col" :span="4" v-else>
              <el-button type="success" >Success</el-button>
            </el-col>
          </el-row>
          <el-row class="profile-row">
            <el-col class="profile-row-col" :span="8">Password</el-col>
            <el-col class="profile-row-col" :span="12">
              <el-form-item class="profile-row-col">
                <el-input style="width: 200px" :class="errorPasswordClass" v-model="form.password" type="password" placeholder="Password"></el-input>
              </el-form-item>

              <el-form-item class="profile-row-col" style="margin-top: 10px">
                <el-input style="width: 200px" :class="errorPasswordClass" v-model="passwordAgain" type="password" placeholder="Password(Again)"></el-input>
              </el-form-item>
            </el-col>
            <el-col class="profile-row-col" :span="4" v-if="!isPasswordSubmitted">
              <el-button  type="primary" @click="submitPassword">Change</el-button>
            </el-col>
            <el-col class="profile-row-col" :span="4" v-else>
              <el-button type="success" >Success</el-button>
            </el-col>
          </el-row>
          <el-row class="profile-row">
            <el-col class="profile-row-col" :span="8">Phone</el-col>
            <el-col class="profile-row-col" :span="12">
              <el-form-item class="profile-row-col">
                <el-input style="width: 200px" v-model="form.phone" placeholder="Phone"></el-input>
              </el-form-item>
            </el-col>
            <el-col class="profile-row-col" :span="4" v-if="!isPhoneSubmitted">
              <el-button  type="primary" @click="submitPhone">Change</el-button>
            </el-col>
            <el-col class="profile-row-col" :span="4" v-else>
              <el-button type="success" >Success</el-button>
            </el-col>
          </el-row>
      </el-container>
    </el-col>
  </el-row>
</template>
<script setup lang="ts">
import MainHeader from "../components/Header.vue";
import {computed, onBeforeMount, onMounted, ref} from "vue";
import {useUserStore} from "../store/user.store.ts";
import {useUserService} from "../service/user.service.ts";
import {useRouter} from "vue-router";
import CryptoJS from "crypto-js";

const userStore = useUserStore();
const userService = useUserService();
const router = useRouter();

const form = ref({
  email: "",
  password: "",
  name: "",
  phone: ""
})
const passwordAgain = ref("");

const isNameSubmitted = ref(false);
const isPasswordSubmitted = ref(false);
const isPasswordSubmitClicked = ref(false);
const isPhoneSubmitted = ref(false);
const errorPasswordClass = computed(() => {
  return {
    "password-update-error": isPasswordSubmitClicked.value && ( !form.value.password || form.value.password !== passwordAgain.value)
  }
})

function submitName() {
  const newUser = {...userStore.user, name: form.value.name}
  delete newUser._id
  userService.updateUser(userStore.user._id, newUser)
      .then(() => {
        userStore.setUser({...userStore.user, name: form.value.name})
        isNameSubmitted.value = true;
      });
}
function submitPassword() {
  isPasswordSubmitClicked.value = true;
  if (!form.value.password || form.value.password !== passwordAgain.value){
    return;
  }
  const encryptedPassword = CryptoJS.SHA3(form.value.password).toString();
  const newUser = {...userStore.user, password: encryptedPassword}
  delete newUser._id
  userService.updateUser(userStore.user._id, newUser)
      .then(() => {
        userStore.setUser({...userStore.user, password: encryptedPassword})
        isPasswordSubmitted.value = true;
      });
}
function submitPhone() {
  const newUser = {...userStore.user, phone: form.value.phone}
  delete newUser._id
  userService.updateUser(userStore.user._id, newUser)
      .then(() => {
        userStore.setUser({...userStore.user, phone: form.value.phone})
        isPhoneSubmitted.value = true;
      });
}

onBeforeMount(async () => {
  if (!userStore.user) {
    await router.push("/");
  }
});

onMounted(() => {
  if (userStore.user){
    form.value.email = userStore.user.email;
    form.value.name = userStore.user.name;
    form.value.phone = userStore.user.phone;
  }
})
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
  width: 500px;
  border: #dedede solid;
  border-width: 1px 0 1px 0;
  padding-block: 15px;
  margin-bottom: 10px;
}
.password-update-error{
  border: 1px solid red;
  border-radius: 5px;
}
</style>
