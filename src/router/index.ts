import { createRouter, createWebHistory } from "vue-router";
import Main from "../views/Main.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Main,
    },
    {
      path: "/:brand",
      name: "list-category",
      component: Main,
      props: true,
    },
  ],
});

export default router;
