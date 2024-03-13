import { createRouter, createWebHistory } from "vue-router";
import Main from "../views/Main.vue";
import Login from "../views/Login.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Main,
    },
    {
      path: "/?category=:brand",
      name: "list-category",
      component: Main,
      props: true,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    }
  ],
});

export default router;