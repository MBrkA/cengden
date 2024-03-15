<template>
  <el-row class="main-header">
    <el-col :span="4">
      <app-logo />
    </el-col>
    <el-col :span="5"></el-col>
    <el-col :span="10" class="main-header-login">
      <el-container v-if="!userStore.user" style="justify-content: flex-end">
        <router-link class="login-text" to="/login">Login</router-link>
        <a class="login-line">|</a>
        <router-link class="login-text" to="/register">Register</router-link>
      </el-container>
      <el-container v-else style="justify-content: flex-end">
        <router-link class="login-text
        " to="/new-listing">New Listing</router-link>
        <a class="login-line">|</a>
        <router-link class="login-text
        " to="#">My Listings</router-link>
        <a class="login-line">|</a>
        <router-link class="login-text
        " to="#">Favorites</router-link>
        <a class="login-line">|</a>
        <router-link class="login-text
        " to="/profile">Profile</router-link>
        <a class="login-line">|</a>
        <a class="login-text" @click="logout">Logout</a>
      </el-container>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">

import AppLogo from "./AppLogo.vue";
import {useUserStore} from "../store/user.store.ts";
import {useRouter} from "vue-router";
const userStore = useUserStore();
const router = useRouter();

function logout() {
  userStore.setUser(null);
  router.push("/");
}

</script>

<style scoped>

.main-header {
  background-color: #3f475f;
  height: 50px;
  margin-block: 10px;
  padding-inline: 2rem;
  justify-content: space-between;
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
