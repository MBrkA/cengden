import { createRouter, createWebHistory } from "vue-router";
import Main from "../views/Main.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import NewListing from "../views/NewListing.vue";
import Profile from "../views/Profile.vue";
import NewListingForm from "../views/NewListingForm.vue";
import ListingDetails from "../views/ListingDetails.vue";
import MyListings from "../views/MyListings.vue";
import MyFavorites from "../views/MyFavorites.vue";
import Users from "../views/Users.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Main,
    },
    {
      path: "/?category=:category",
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
      component: NewListing
    },
    {
      path: "/my-listings",
      name: "my-listings",
      component: MyListings
    },
    {
      path: "/my-favorites",
      name: "my-favorites",
      component: MyFavorites
    },
    {
      path: "/users",
      name: "users",
      component: Users
    },

    {
      path: "/new-listing/:category",
      name: "new-listing-category",
      component: NewListingForm,
      props: true,
    },
    {
      path: "/update-listing/:category/:updateId",
      name: "update-listing-category",
      component: NewListingForm,
      props: true,
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile,
    },
    {
        path: "/listing/:id",
        name: "listing-details",
        component: ListingDetails,
        props: true,
    }
  ],
});


export default router;
