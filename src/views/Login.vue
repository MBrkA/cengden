<template>
  <el-row>
    <el-col class="login-header" :span="24">
      <app-logo />
    </el-col>
  </el-row>
  <el-row style="margin-inline: 2rem">
    <el-col class="login-header" :span="24">
      <el-container class="login-container">
        <a class="login-title">Login</a>
        <el-form>
          <el-form-item >
            <el-input class="login-input" v-model="form.email" placeholder="E-mail"></el-input>
          </el-form-item>
          <el-form-item >
            <el-input class="login-input" v-model="form.password" type="password" placeholder="Password"></el-input>
          </el-form-item>
          <p class="error-text" v-if="isError">Login failed!</p>
          <el-form-item>
            <el-button class="login-input" type="primary" @click="submitForm">Login</el-button>
          </el-form-item>
        </el-form>

      </el-container>
    </el-col>
</el-row>

</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppLogo from "../components/AppLogo.vue";
import {useUserService} from "../service/user.service.ts";
import {useUserStore} from "../store/user.store.ts";
import {useRouter} from "vue-router";

const userService = useUserService();
const userStore = useUserStore();
const router = useRouter();

const form = ref({
  email: "",
  password: ""
})

const isError = ref(false);

function submitForm() {
  userService.login(form.value.email,form.value.password).then((response) => {
    if (response){
      userStore.setUser(response);
      router.push("/");
    } else {
      isError.value = true;
    }
  });
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
  width: 500px;
  display: grid;
  justify-content: center;
  padding-inline: 20px;
  padding-top: 20px;
  padding-bottom: 100px;
}
.login-input {
  width: 400px;
  height: 50px;
}
.login-title {
  font-size: 20px;
  font-weight: bold;
  font-family: "Arial", sans-serif;
  color: black;
  margin-block: 20px;
  display: grid;
  justify-content: center;
  align-items: center;
}
</style>
