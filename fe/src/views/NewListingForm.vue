<template>
  <main-header />
  <new-vehicle-form :updateId="props.updateId"  v-if="props.category === 'vehicle'"/>
  <new-lesson-form :updateId="props.updateId" v-if="props.category === 'lesson'"/>
  <new-phone-form :updateId="props.updateId" v-if="props.category === 'phone'"/>
  <new-computer-form :updateId="props.updateId" v-if="props.category === 'computer'"/>

</template>
<script setup lang="ts">
  import MainHeader from "../components/Header.vue";
  import NewVehicleForm from "../components/NewVehicleForm.vue";
  import NewLessonForm from "../components/NewLessonForm.vue";
  import NewPhoneForm from "../components/NewPhoneForm.vue";
  import NewComputerForm from "../components/NewComputerForm.vue";
  import {onBeforeMount} from "vue";
  import {useUserStore} from "../store/user.store.ts";
  import {useRouter} from "vue-router";

  const props = defineProps<{
    category: string;
    updateId?: any;
  }>()

  const userStore = useUserStore();
  const router = useRouter();

  onBeforeMount(async () => {
    if (!userStore.user) {
      await router.push("/");
    }
  });

</script>
<style scoped>
</style>
