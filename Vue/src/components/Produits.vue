<template>
  <div class="produits" id="produits">
    <!-- <h1>{{output}}</h1> -->
    <div v-for="post in posts" :key="post.id" class="produit">
      <div class="card" style="width: 18rem;">
        <img src="../assets/logo.png" class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">
            <router-link :to="{path: '/produit/'+ post.id}">{{post.name}}</router-link>
          </h5>
          <p class="card-text">{{post.description}}</p>
          <button class="btn btn-primary" v-on:click="addPanier(post.id)">Panier</button>
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
      getToken: localStorage.getItem("token"),
      output: []
    };
  },
  mounted() {
    axios
      .get("http://localhost:5000/produit/")
      .then(response => (this.posts = response.data));
    console.log("posts", this.posts);
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.produits {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.produit {
  margin: 50px;
  padding: 10px;
  border: solid 1px black;
}
</style>
