<template>
  <div class="w-25 mx-auto" >
    <div v-if="this.user.RoleId == 2">
      <form>
        <div class="form-group">
          <input
            type="file"
            name="file"
            ref="file"
            class="form-control-file"
            @change="onFileSelected"
          />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Nom</label>
          <input type="text" v-model="name" class="form-control" />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Description</label>
          <textarea v-model="desc" class="form-control"></textarea>
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Prix</label>
          <input type="number" v-model="price" class="form-control" />
        </div>
        <button type="submit" v-on:click="submitFile()" class="btn btn-primary">Ajouter</button>
      </form>
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
      name: "",
      desc: "",
      price: "",
      user: [],
      getToken: localStorage.getItem("token"),
      output: [],
      file: ""
    };
  },
  mounted() {
    axios
      .get("http://localhost:5000/profile?secret_token=" + this.getToken)
      .then(response => (this.user = response.data.user));
  },
  methods: {
    onFileSelected(event) {
      this.file = event.target.files[0];
    },
    submitFile() {
      let formData = new FormData();
      formData.append("file", this.file);
      axios
        .post("http://localhost:5000/produit/", {
          name: this.name,
          description: this.desc,
          price: this.price,
          image: "image"
        })
        .then(function() {
          console.log("SUCCESS!!");
        })
        .catch(function() {
          console.log("FAILURE!!");
        });
    }
  }
};
</script>