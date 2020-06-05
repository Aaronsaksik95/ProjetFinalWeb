import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";
// import Sign from "../views/Sign.vue";
import Signup from "../components/authentification/Signup.vue";
import Login from "../components/authentification/Login.vue";
import Logout from "../components/authentification/Logout.vue";
import Profil from "../components/authentification/Profil.vue";
import Produits from "../components/Produits.vue";
import Produit from "../components/Produit.vue";
import Panier from "../components/Panier.vue";
import ProduitAdmin from "../components/admin/ProduitAdmin.vue";
import AddProduit from "../components/admin/AddProduit.vue";
import UpdateProduit from "../components/admin/UpdateProduit.vue";
import UpdateUser from "../components/admin/UpdateUser.vue";
import Users from "../components/admin/Users.vue";
import Erreur404 from "../components/404.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Produits
  },
  {
    path: "/produit/:name",
    name: "produit",
    component: Produit
  },
  {
    path: "/panier",
    name: "panier",
    component: Panier
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
    path: "/logout",
    name: "logout",
    component: Logout
  },
  {
    path: "/profile/:id",
    name: "profile",
    component: Profil
  },
  {
    path: "/produitAdmin",
    name: "produitAdmin",
    component: ProduitAdmin
  },
  {
    path: "/addProduit",
    name: "addProduit",
    component: AddProduit
  },
  {
    path: "/updateProduit/:id",
    name: "updateProduit",
    component: UpdateProduit
  },
  {
    path: "/users",
    name: "users",
    component: Users
  },
  {
    path: "/updateUser/:id",
    name: "updateUser",
    component: UpdateUser
  },
  {
    path: "/NotFound",
    name: "NotFound",
    component: Erreur404
  },
  {
    path: '*',
    redirect: '/NotFound'
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
