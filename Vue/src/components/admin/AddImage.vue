<template>
  <div class="w-25 mx-auto">
    <div v-if="this.user.RoleId == 2">
      <form>
        <div class="form-group">
          <input
            type="file"
            name="file"
            ref="file"
            @change="onFileChange"
            class="form-control-file"
          />
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
// const moveFile = require("move-file");
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
      selectedFile: "",
      prodAdd: []
    };
  },
  mounted() {
    axios
      .get("http://localhost:5000/profile?secret_token=" + this.getToken)
      .then(response => (this.user = response.data.user));
    axios
      .get("http://localhost:5000/produit/name/" + this.$route.params.name)
      .then(response => (this.prodAdd = response.data));
  },
  methods: {
    onFileChange(e) {
      const selectedFile = e.target.files[0]; // accessing file
      this.selectedFile = selectedFile;
    },
    async submitFile() {
      const formData = new FormData();
      formData.append("file", this.selectedFile);

      await axios
        .post(
          "http://localhost:5000/produit/image/" + this.prodAdd.id,
          formData
        )
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
