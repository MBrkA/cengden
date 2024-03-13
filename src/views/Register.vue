<template>
  <el-row>
    <el-col class="login-header" :span="24">
      <app-logo />
    </el-col>
  </el-row>
  <el-row style="margin-inline: 2rem">
    <el-col class="login-header" :span="24">
      <el-container class="login-container">
        <a class="login-title">Register</a>
        <el-form v-if="!isSubmitSuccessful">
          <el-form-item >
            <el-input class="login-input" :class="errorNameClass" v-model="form.name" placeholder="Name"></el-input>
          </el-form-item>
          <el-form-item >
            <el-input class="login-input" :class="errorEmailClass"  v-model="form.email" placeholder="E-mail"></el-input>
          </el-form-item>
          <el-form-item >
            <el-input class="login-input" :class="errorPhoneClass" v-model="form.phone" placeholder="Phone"></el-input>
          </el-form-item>
          <el-form-item >
            <el-input class="login-input" :class="errorPasswordClass" v-model="form.password" placeholder="Password" type="password"></el-input>
          </el-form-item>
          <el-form-item >
            <el-input class="login-input" :class="errorPasswordClass" v-model="passwordAgain" placeholder="Password (Again)" type="password"></el-input>
          </el-form-item>
          <p class="error-text" v-if="showError">
            <span v-if="!form.name">Name is empty</span>
            <span v-if="!form.phone">Phone is empty</span>
            <span v-if="!validateEmail">E-mail is not valid</span>
            <span v-if="!validatePassword">Password is not valid or does not match</span>
          </p>
          <el-form-item>
            <el-button class="login-input" type="primary" @click="submitForm">Register</el-button>
          </el-form-item>
        </el-form>
        <p class="error-text" v-if="isSubmitSuccessful">Validation sent to your email address!</p>
      </el-container>
    </el-col>
</el-row>

</template>

<script setup lang="ts">
import {computed, ref} from 'vue'
import AppLogo from "../components/AppLogo.vue";
import {useUserService} from "../service/user.service.ts";

const form = ref({
  name: "",
  email: "",
  phone: "",
  password: "",
})
const passwordAgain = ref("");

const showError = ref(false);
const isSubmitted = ref(false);
const isSubmitSuccessful = ref(false);
const errorPasswordClass = computed(() => {
  return {
    "error-input": isSubmitted.value && !validatePassword.value
  }
})
const errorEmailClass = computed(() => {
  return {
    "error-input": isSubmitted.value && !validateEmail.value
  }
})
const errorNameClass = computed(() => {
  return {
    "error-input": isSubmitted.value && !form.value.name
  }
})
const errorPhoneClass = computed(() => {
  return {
    "error-input": isSubmitted.value && !form.value.phone
  }
})

const validateEmail = computed(() => {
  // ...@ceng.metu.edu.tr
  const emailRegex = new RegExp("^[a-zA-Z0-9._-]+@ceng.metu.edu.tr$")
  return emailRegex.test(form.value.email)
})

const validatePassword = computed(() => {
  return form.value.password && form.value.password === passwordAgain.value
})

const userService = useUserService();

function submitForm() {
  isSubmitted.value = true;
  if (validateEmail.value && validatePassword.value) {
    userService.createUser({
      type: "user",
      isVerified: false,
      ...form.value
    })
        .then(() => {
          isSubmitSuccessful.value = true;
        })
        .catch(() => {
          showError.value = true;
        })
  } else {
    showError.value = true;
  }
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
.error-text {
  color: red;
  font-size: 12px;
  font-family: "Montserrat", sans-serif;
  display: grid;
  justify-content: center;
  align-items: center;
  justify-items: center;
}
.error-input {
  border: 1px solid red;
  border-radius: 5px;
}
</style>
