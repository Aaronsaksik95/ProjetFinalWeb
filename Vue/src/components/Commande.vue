<template>
  <div>
    <div>
      <button class="btn btn-info" v-on:click="Commander()">Recevoir ma facture</button>
    </div>
    <div v-if="test" class="m-3">
      <router-link :to="{path: '/'}">Revenir à l'accueil</router-link>
    </div>
    <div class="a4 border mx-auto" id="facture">
      <div class="w-100 d-flex justify-content-around pt-5">
        <div>
          <h1 class="text-info">GameOrPlay</h1>
        </div>
        <div class="text-left">
          <h3>{{theUser.firstName}} {{theUser.lastName}}</h3>
          <p>{{theUser.email}}</p>
          <p>{{theUser.dateBirth.substr(0, 10)}}</p>
        </div>
      </div>
      <div class="float-left ml-5 text-left w-50">
        <h2 class="border-bottom">Facture</h2>
        <div class="d-flex justify-content-between">
          <p>Société:</p>
          <p>GameOrPlay</p>
        </div>
        <div class="d-flex justify-content-between">
          <p>N° de facture:</p>
          <p>2020-022</p>
        </div>
        <div class="d-flex justify-content-between">
          <p>Date de facture:</p>
          <p>{{date.toLocaleString()}}</p>
        </div>
        <div class="d-flex justify-content-between">
          <p>Date d'échéance:</p>
          <p>{{date.toLocaleString()}}</p>
        </div>
        <p class="bg-info py-2 pl-2">À payer EUR: {{sumPrice}} €</p>
      </div>
      <div class="pl-5 pr-5">
        <table id class="table">
          <thead class="thead-light">
            <tr>
              <th scope="col">Aperçu</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody class="bg-light">
            <tr v-for="prod in prods.reverse()" :key="prod.id">
              <th id scope="row">
                <img :src="prod.image" class="img" alt="..." />
              </th>
              <td>{{prod.name}}</td>
              <td>
                <small>
                  {{prod.description.substr(0, 50)}}
                  <p v-if="prod.description.length >= 50">...</p>
                </small>
              </td>
              <td>{{prod.price}} €</td>
            </tr>
          </tbody>
        </table>
        <table class="table table-striped">
          <thead class="thead-dark">
            <tr class="bg-dark text-light">
              <th scope="col">Récapitulatif</th>
              <th scope="col">Nombre de Jeux : {{count}}</th>
              <th scope="col">Prix Total : {{sumPrice}} €</th>
              <th scope="col"></th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="text-left ml-4">
        <h6 class="m-0">Conditions et modalités de paiement</h6>
        <p class="m-0">
          <small>Le paiement est dû dans 15 jours</small>
        </p>
        <p class="m-0">
          <small>Caisse de France</small>
        </p>
        <p class="m-0">
          <small>IBAN: FR12 1234 5678</small>
        </p>
        <p class="m-0">
          <small>SWIFT/BIC: ABCDEFGH123456</small>
        </p>
      </div>
    </div>
    <div>
      <div id="pdf"></div>
      <div v-if="test" class="m-3">
        <router-link :to="{path: '/'}">Revenir à l'accueil</router-link>
      </div>
      <div>
        <button class="btn btn-info" v-on:click="Commander()">Recevoir ma facture</button>
      </div>
    </div>
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
      date: Date().substr(0, 15),
      posts: [],
      user: [],
      theUser: [],
      prods: [],
      getToken: localStorage.getItem("token"),
      output: [],
      i: 0,
      test: false,
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
      .get("http://localhost:5000/commande/" + this.user.id)
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
    Commander() {
      html2canvas(document.querySelector("#facture"), {
        imageTimeout: 5000,
        useCORS: true
      }).then(canvas => {
        document.getElementById("pdf").appendChild(canvas);
        let img = canvas.toDataURL("image/png");
        let pdf = new JsPDF("portrait", "cm", "a4");
        //600 point la page largeur
        pdf.addImage(img, "JPEG", 0, 0, 21, 29.7);
        pdf.save("FactureGame0rPlay.pdf");
        document.getElementById("pdf").innerHTML = "";
      });
      this.test = true;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.img {
  width: 150px;
}
.a4 {
  width: 21cm;
  height: 29.7cm;
}
</style>
