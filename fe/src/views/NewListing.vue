<template>
  <main-header />
  <el-row style="margin-inline: 2rem">
    <el-col class="login-header" :span="24">
      <el-container class="login-container">
        <a class="login-title">New Listing</a>
        <el-container>
          <el-button class="login-input" type="primary" @click="setSelectedCategory('vehicle')">Vehicle</el-button>
          <el-button class="login-input" type="primary"  @click="setSelectedCategory('computer')">Computer</el-button>
          <el-button class="login-input" type="primary"  @click="setSelectedCategory('phone')">Phone</el-button>
          <el-button class="login-input" type="primary"  @click="setSelectedCategory('lesson')">Private Lesson</el-button>
        </el-container>
      </el-container>
    </el-col>
    </el-row>
</template>
<script setup lang="ts">
import MainHeader from "../components/Header.vue";
import {onBeforeMount} from "vue";
import {useUserStore} from "../store/user.store.ts";
import {useRouter} from "vue-router";

const userStore = useUserStore();
const router = useRouter();

function setSelectedCategory(category: string) {
  router.push({ name: "new-listing-category", params: { category } });
}

onBeforeMount(async () => {
  if (!userStore.user) {
    await router.push("/");
  }
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
</style>
