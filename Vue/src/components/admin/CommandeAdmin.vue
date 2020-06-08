<template>
  <div class="m-5">
    <h2 class="text-info">Liste des ventes</h2>
    <div v-if="this.user.RoleId == 2">
      <router-link class="float-left mb-3 ml-3" to="/addProduit">Liste des Jeux</router-link>
      <router-link class="float-left mb-3 ml-3" to="/users">Liste des users</router-link>
      <table class="table table-striped">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Creation</th>
            <th scope="col">Modification</th>
            <th scope="col">UserId</th>
            <th scope="col">ProduitId</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in posts" :key="post.id">
            <th scope="row">{{post.id}}</th>
            <td>{{post.createdAt}}</td>
            <td>{{post.updatedAt}}</td>
            <td>{{post.UserId}}</td>
            <td>{{post.ProduitId}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <h3 class="mt-5">Accès interdit :</h3>
      <router-link class="nav-link h4 mt-5" to="/">Home ></router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Produits",
  el: "#produits",
  data: function() {
    return {
      posts: [],
      user: [],
      getToken: localStorage.getItem("token")
    };
  },
  mounted() {
    axios
      .get("http://localhost:5000/commande/")
      .then(response => (this.posts = response.data));
    axios
      .get("http://localhost:5000/profile?secret_token=" + this.getToken)
      .then(response => (this.user = response.data.user));
  },
  methods: {
    DeleteProd(id) {
      axios.delete("http://localhost:5000/produit/commentaire/produit/" + id);
      axios.delete("http://localhost:5000/produit/note/produit/" + id);
      axios.delete("http://localhost:5000/panier/produit/" + id);
      axios.delete("http://localhost:5000/produit/" + id);
      document.location.reload(true);
    }
  }
};
</script>
