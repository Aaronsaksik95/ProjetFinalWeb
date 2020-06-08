import Vue from "vue";
import VueRouter from "vue-router";
import Signup from "../components/authentification/Signup.vue";
import Login from "../components/authentification/Login.vue";
import Logout from "../components/authentification/Logout.vue";
import DeleteProf from "../components/authentification/DeleteProf.vue";
import Profil from "../components/authentification/Profil.vue";
import Produits from "../components/Produits.vue";
import Produit from "../components/Produit.vue";
import Panier from "../components/Panier.vue";
import ProduitAdmin from "../components/admin/ProduitAdmin.vue";
import CommandeAdmin from "../components/admin/CommandeAdmin.vue";
import AddProduit from "../components/admin/AddProduit.vue";
import AddImage from "../components/admin/AddImage.vue"
import UpdateProduit from "../components/admin/UpdateProduit.vue";
import UpdateUser from "../components/admin/UpdateUser.vue";
import Users from "../components/admin/Users.vue";
import Commande from "../components/Commande.vue";
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
    path: "/deleteProf/:id",
    name: "deleteProf",
    component: DeleteProf
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
    path: "/commandeAdmin",
    name: "commandeAdmin",
    component: CommandeAdmin
  },
  {
    path: "/addProduit",
    name: "addProduit",
    component: AddProduit
  },
  {
    path: "/addImage/:name",
    name: "addImage",
    component: AddImage
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
    path: "/commande",
    name: "commande",
    component: Commande
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
