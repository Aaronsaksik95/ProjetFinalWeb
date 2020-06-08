<template>
  <div>
    <h1 class="mt-5">Nos Jeux</h1>
    <div class="flex-wrap d-flex mx-auto justify-content-around m-5">
      <div
        v-for="post in posts.reverse()"
        :key="post.id"
        class="card m-5 p-0 col-3 shadow mb-5 rounded"
      >
        <router-link :to="{path: '/produit/' + post.name}">
          <img :src="post.image" class="card-img-top" alt="..." />
        </router-link>

        <div class="card-body">
          <h5 class="card-title">
            <router-link :to="{path: '/produit/' + post.name}">{{post.name}}</router-link>
          </h5>
          <p class="card-text">{{post.description}}</p>

          <h4 class="float-left mt-5">{{post.price}} €</h4>
          <button class="btn btn-dark float-right mt-4" v-on:click="addPanier(post.id)">Panier</button>
        </div>
      </div>
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
      like: [],
      image: [],
      getToken: localStorage.getItem("token"),
      output: []
    };
  },
  mounted() {

    axios
      .get("http://localhost:5000/produit/")
      .then(response => (this.posts = response.data));
    axios
      .get("http://localhost:5000/profile?secret_token=" + this.getToken)
      .then(response => (this.user = response.data.user));
  },

  methods: {
    addPanier(id) {
      let currentObj = this;
      this.axios
        .post("http://localhost:5000/panier/" + id, {
          UserId: this.user.id
        })
        .then(function(response) {
          currentObj.output = response.data;
        })
        .catch(function(error) {
          currentObj.output = error;
        });
      document.location.reload(true);
    },
    Image(id) {
      this.axios
        .get("http://localhost:5000/produit/image/" + id)
        .then(response => (this.image = response.data));
    }
  }
};
</script>

<style scoped>
</style>
