<template>
  <div class="w-50 mx-auto" id="panier">
    <div v-if="count > 0">
      <h1 class="mt-5">Mon panier</h1>
      <table id="facture" class="table table-striped shadow">
        <thead class="thead-light">
          <tr>
            <th scope="col">Aperçu</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Price</th>
            <th id="sup" scope="col">Supprimer</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="prod in prods.reverse()" :key="prod.id">
            <th id scope="row">
              <img :src="prod.image" class="img" alt="..." />
            </th>
            <td>{{prod.name}}</td>
            <td>
              {{prod.description.substr(0, 30)}}
              <p v-if="prod.description.length >= 30">...</p>
            </td>
            <td>{{prod.price}} €</td>
            <td id="sup">
              <Button v-on:click="Delete(prod.id)" class="btn btn-danger">Supprimer</Button>
            </td>
          </tr>
        </tbody>
      </table>
      <table class="table table-striped shadow">
        <thead class="thead-dark">
          <tr class="bg-dark text-light">
            <th scope="col">Récapitulatif</th>
            <th scope="col">Nombre de Jeux : {{count}}</th>
            <th scope="col">Prix Total : {{sumPrice}} €</th>
            <th scope="col"></th>
            <th scope="col">
              <Button
                v-if="this.sumPrice <= this.theUser.sold"
                v-on:click="Commander()"
                class="btn btn-info"
              >Commander</Button>
              <small v-else>Votre solde n'est pas assez élevé.</small>
            </th>
          </tr>
        </thead>
      </table>
    </div>
    <h1 v-else class="text-info mt-5">Votre panier est vide.</h1>
    <div id="pdf"></div>
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
      theUser: [],
      prods: [],
      getToken: localStorage.getItem("token"),
      output: [],
      i: 0,
      count: "",
      sumPrice: 0
    };
  },
  async mounted() {
    await axios
      .get("http://localhost:5000/profile?secret_token=" + this.getToken)
      .then(response => (this.user = response.data.user));
    await axios
      .get("http://localhost:5000/user/" + this.user.id)
      .then(response => (this.theUser = response.data));
    await axios
      .get("http://localhost:5000/panier/" + this.user.id)
      .then(response => (this.posts = response.data));
    while (this.i < this.posts.length) {
      await axios
        .get("http://localhost:5000/produit/" + this.posts[this.i].ProduitId)
        .then(response => this.prods.push(response.data));
      this.i++;
    }
    await axios
      .get("http://localhost:5000/panier/count/" + this.user.id)
      .then(response => (this.count = response.data));
    for (var i = 0; i < this.prods.length; i++) {
      this.sumPrice = this.sumPrice + this.prods[i].price;
    }
    console.log(this.theUser.sold - this.sumPrice);
  },
  methods: {
    Delete(id) {
      axios.delete("http://localhost:5000/panier/" + id);
      document.location.reload(true);
    },
    Commander() {
      var compte = this.theUser.sold - this.sumPrice;
      var i = 0;
      while (i < this.posts.length) {
        this.axios.post(
          "http://localhost:5000/commande/" + this.posts[i].ProduitId,
          {
            UserId: this.user.id
          }
        );
        i++;
      }
      this.axios.put("http://localhost:5000/user/sold/" + this.theUser.id, {
        sold: compte
      });
      this.axios.delete("http://localhost:5000/panier/user/" + this.theUser.id);
      window.location.href = "/commande";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.img {
  width: 150px;
}
.test {
  display: none;
}
</style>
