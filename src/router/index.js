import { createRouter, createWebHistory } from "vue-router";
import Signup from "../pages/Signup.vue";
import Login from "../pages/Login.vue";
import Home from "../pages/Home.vue";
import FlagsPage from "../pages/FlagsPage.vue";
import Carts from "../components/Cart.vue";
import About from "../pages/AboutUs.vue";
import CheckoutSuccess from "../pages/CheckoutSuccess.vue";
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
  {
    path: "/flags",
    name: "FlagsPage",
    component: FlagsPage,
  },
   {
    path: "/cart",
    name: "Cart",
    component: Carts,
  },
   {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/checkout/success",
    name: "CheckoutSuccess",
    component: CheckoutSuccess,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
