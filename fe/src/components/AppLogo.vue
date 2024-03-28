<template>
  <el-container class="main-header-logo" @click="handleLogoClick">
    <p>cengden.com</p>
  </el-container>
</template>
<script setup lang="ts">

import {useRouter} from "vue-router";

const router = useRouter();

const handleLogoClick = () => {
  router.push({ name: "home" });
}
</script>
<style scoped>

.main-header-logo {
  margin-block: 10px;
  width: 150px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  font-size: 20px;
  font-weight: bold;
  font-family: "Arial", sans-serif;
  background-color: #ffe800;
  cursor: pointer;
}
</style>
