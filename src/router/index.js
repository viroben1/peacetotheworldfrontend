import { createRouter, createWebHistory } from "vue-router";
import Signup from "../pages/Signup.vue";
import Login from "../pages/Login.vue";
import Home from "../pages/Home.vue";
const routes = [
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
