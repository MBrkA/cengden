<template>
  <el-row class="main-header">
    <el-col :span="4"  >
      <app-logo />
    </el-col>
    <el-col :span="17"></el-col>
    <el-col :span="3" class="main-header-login">
      <router-link class="login-text" to="/login">Login</router-link>
      <a class="login-line">|</a>
      <router-link class="login-text" to="/register">Register</router-link>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">

import {useRouter} from "vue-router";
import AppLogo from "./AppLogo.vue";

const router = useRouter();

const handleLogoClick = () => {
  router.push({ name: "home" });
}
</script>

<style scoped>

.main-header {
  background-color: #3f475f;
  height: 50px;
  margin-block: 10px;
  padding-inline: 2rem;
}
.main-header-login {
  margin-block: 10px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.login-text {
  text-decoration: none;
  cursor: pointer;
  font-weight: bolder;
  font-family: "Montserrat", sans-serif;
  color: #ebebeb;
  font-size: 12px;
  text-shadow: 1px 1px 0 #2f3339;
  text-align: right;
}
.login-line {
  font-weight: bolder;
  font-family: "Montserrat", sans-serif;
  color: #ebebeb;
  font-size: 12px;
  text-shadow: 1px 1px 0 #2f3339;
  text-align: right;
  margin-inline: 5px
}
</style>
