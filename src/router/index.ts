import { createRouter, createWebHistory } from "vue-router";
import Main from "../views/Main.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import NewListing from "../views/NewListing.vue";
import Profile from "../views/Profile.vue";

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
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
    {
      path: "/new-listing",
      name: "new-listing",
      component: NewListing,
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile,
    },
  ],
});


export default router;
