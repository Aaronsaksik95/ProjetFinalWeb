<template>
  <div class="w-50 mx-auto" id="panier">
    <!-- <div v-for="prod in prods" :key="prod.id" class="media m-5 h-25">
      <img src="../assets/logo.png" class="img" alt="..." />
      <div class="media-body">
        <h5 class="mt-0">{{prod.name}}</h5>{{prod.description}}
        <small>{{prod.price}}</small>
      </div>
      
    </div> -->
    <table class="table table-striped ">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Aperçu</th>
          <th scope="col">Name</th>
          <th scope="col">Description</th>
          <th scope="col">Price</th>
          <th scope="col">Suppimer</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="prod in prods" :key="prod.id">
          <th scope="row"><img src="../assets/logo.png" class="img" alt="..." /></th>
          <td>{{prod.name}}</td>
          <td>{{prod.description}}</td>
          <td>{{prod.price}} €</td>
          <td>
            <Button v-on:click="Delete(prod.id)" class="btn btn-danger">Supprimer</Button>
          </td>
        </tr>
        <tr class="bg-info">
          <th scope="col">Récapitulatif</th>
          <th scope="col">Nombre de Jeux : 2</th>
          <th scope="col">Prix Total : 120 €</th>
          <th scope="col"></th>
          <th scope="col"><Button class="btn btn-light">Commander</Button></th>
        </tr>
      </tbody>
    </table>
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
        .then(response => this.prods.push(response.data));
      console.log("prod", this.prods);
      this.i++;
    }
  },
  methods: {
    Delete(id) {
      axios.delete("http://localhost:5000/panier/" + id);
      document.location.reload(true);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.img{
  width: 70px;
}
</style>
