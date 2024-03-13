<template>
  <main-header />

  <el-row style="margin-inline: 2rem">
    <el-col class="login-header" :span="24">
      <el-container class="login-container">
        <a class="login-title">Profile</a>

      </el-container>
    </el-col>
  </el-row>
</template>
<script setup lang="ts">
import MainHeader from "../components/Header.vue";

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
