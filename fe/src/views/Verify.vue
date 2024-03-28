<template>
  <el-row>
    <el-col class="login-header" :span="24">
      <app-logo />
    </el-col>
  </el-row>
  <el-row style="margin-inline: 2rem">
    <el-col class="login-header" :span="24">
      <el-container class="login-container">
        <p class="error-text" v-if="isVerifySuccessful">Verification completed!</p>
        <p class="error-text" v-else>Verification failed!</p>
      </el-container>
    </el-col>
</el-row>

</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
import AppLogo from "../components/AppLogo.vue";
import {useUserService} from "../service/user.service.ts";

const userService = useUserService();

const props = defineProps<{
  id?: any;
}>();

const isVerifySuccessful = ref(false);

onMounted(() => {
  userService.verifyUser(props.id)
      .then((response) => {
        if (response){
          isVerifySuccessful.value = true;
        }
      });
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
</style>
