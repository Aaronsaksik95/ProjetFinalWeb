<template>
  <div class="panier" id="panier">
    <div v-for="prod in prods" :key="prod.id" class="prod">
      <p>{{prod.name}}</p>
      <p>{{prod.description}}</p>
      <p>{{prod.price}}</p>
      <button v-on:click="Delete(prod.id)">Supprimer</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Panier",
  el: "#panier",
  data: function() {
    return {
      posts: [],
      user: [],
      prods: [],
      getToken: localStorage.getItem("token"),
      output: [],
      i: 0
    };
  },
  async mounted() {
    await axios
      .get("http://localhost:5000/profile?secret_token=" + this.getToken)
      .then(response => (this.user = response.data.user));
    console.log(this.user.id);
    await axios
      .get("http://localhost:5000/panier/" + this.user.id)
      .then(response => (this.posts = response.data));
    console.log("posts", this.posts);
    while (this.i < this.posts.length) {
      await axios
        .get("http://localhost:5000/produit/" + this.posts[this.i].ProduitId)
        .then(response => (this.prods.push(response.data)));
      console.log("prod", this.prods);
      this.i++
    }
  },
  methods: {
    async Delete(id){
      await axios
      .delete("http://localhost:5000/panier/" + id)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.panier {
  
}
.prod {
  display: flex;
  justify-content:space-around;
  margin: 50px;
  padding: 10px;
  border: solid 1px rgb(206, 206, 206);
}
</style>
