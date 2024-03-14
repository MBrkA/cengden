<template>
  <main-header />

  <el-row style="margin-inline: 2rem">
    <el-col class="login-header" :span="24">
      <el-container class="login-container">
        <el-container>



        </el-container>

        <a class="login-title">New Listing</a>
        <el-form>
          <el-form-item >
            <el-input class="login-input" v-model="form.email" placeholder="Test"></el-input>
          </el-form-item>
          <el-form-item >
            <el-input class="login-input" v-model="form.password" placeholder="Test"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="login-input" type="primary" >Login</el-button>
          </el-form-item>
        </el-form>
      </el-container>
    </el-col>
    </el-row>
</template>
<script setup lang="ts">
import MainHeader from "../components/Header.vue";
import {onBeforeMount, ref} from "vue";
import {useUserStore} from "../store/user.store.ts";
import {useRouter} from "vue-router";

const userStore = useUserStore();
const router = useRouter();
const form = ref({
  email: "",
  password: ""
})

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
