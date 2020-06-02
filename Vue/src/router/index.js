import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";
// import Sign from "../views/Sign.vue";
import Signup from "../components/authentification/Signup.vue";
import Login from "../components/authentification/Login.vue";
import Profil from "../components/authentification/Profil.vue";
import Produits from "../components/Produits.vue";
import Produit from "../components/Produit.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    components: {
      default: Produits,
      login: Login,
      signup: Signup,
      profil: Profil
    }
  },
  {
    path: "/produits",
    name: "produits",
    component: Produits
  },
  {
    path: "/produit/:id",
    name: "produit",
    component: Produit
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/profile",
    name: "profile",
    component: Profil
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
