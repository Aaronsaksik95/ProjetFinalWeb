<template>
  <div class="w-50 mx-auto" id="panier">
    <h1 class="mt-5">Mon panier</h1>
    <table id="facture" class="table table-striped shadow">
      <thead class="thead-light">
        <tr>
          <th scope="col">Aperçu</th>
          <th scope="col">Name</th>
          <th scope="col">Description</th>
          <th scope="col">Price</th>
          <th scope="col">Supprimer</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="prod in prods.reverse()" :key="prod.id">
          <th scope="row">
            <img src="../assets/fortnite.jpg" class="img" alt="..." />
          </th>
          <td>{{prod.name}}</td>
          <td>
            {{prod.description.substr(0, 50)}}
            <p v-if="prod.description.length >= 50">...</p>
          </td>
          <td>{{prod.price}} €</td>
          <td>
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
          <Button v-on:click="Commander()" class="btn btn-info">Commander</Button>
        </th>
      </tr>
      </thead>
    </table>
    <div id="pdf"></div>
  </div>
</template>


<script>
import axios from "axios";
import html2canvas from "html2canvas";
import * as JsPDF from "jspdf";
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
    console.log(this.user.id);
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
  },
  methods: {
    Delete(id) {
      axios.delete("http://localhost:5000/panier/" + id);
      document.location.reload(true);
    },
    Commander() {
      html2canvas(document.querySelector("#facture"), {
        imageTimeout: 5000,
        useCORS: true
      }).then(canvas => {
        document.getElementById("pdf").appendChild(canvas);
        let img = canvas.toDataURL("image/png");
        let pdf = new JsPDF("portrait", "pt", "a4");
        pdf.text("Facture Game Or Play " + this.theUser.firstName + ".", 180, 50 )
        //600 point la page largeur
        pdf.addImage(img, "JPEG", 69.5, 120, 461, 96);
        pdf.save("relatorio-remoto.pdf");
        document.getElementById("pdf").innerHTML = "";
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.img {
  width: 150px;
}
</style>
