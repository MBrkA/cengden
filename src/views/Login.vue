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
            <el-input class="login-input" v-model="form.username" placeholder="E-mail"></el-input>
          </el-form-item>
          <el-form-item >
            <el-input class="login-input" v-model="form.password" placeholder="Password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="login-input" type="primary">Login</el-button>
          </el-form-item>
        </el-form>
      </el-container>
    </el-col>
</el-row>

</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppLogo from "../components/AppLogo.vue";

const form = ref({
  username: "",
  password: ""
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
