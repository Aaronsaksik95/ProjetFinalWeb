<template>
  <div class="w-25 mx-auto">
    <div v-if="this.user.RoleId == 2">
      <form>
        <div class="form-group">
          <label for="exampleInputEmail1">Image</label>
          <input type="text" v-model="post.image" class="form-control" />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Nom</label>
          <input type="text" v-model="post.name" class="form-control" />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Description</label>
          <textarea v-model="post.description" class="form-control"></textarea>
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Prix</label>
          <input v-model="post.price" type="number" class="form-control" />
        </div>
        <button type="submit" v-on:click="updateProd()" class="btn btn-primary">Modifier</button>
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
  data: function() {
    return {
      post: [],
      user: [],
      getToken: localStorage.getItem("token"),
      output: []
    };
  },
  mounted() {
    axios
      .get("http://localhost:5000/produit/" + this.$route.params.id)
      .then(response => (this.post = response.data));
    axios
      .get("http://localhost:5000/profile?secret_token=" + this.getToken)
      .then(response => (this.user = response.data.user));
  },
  methods: {
    async updateProd() {
      await axios.put(
        "http://localhost:5000/produit/" + this.$route.params.id,
        {
          name: this.post.name,
          description: this.post.description,
          price: this.post.price,
          image: this.post.image
        });
      window.location.href = '/produitAdmin'
    }
  }
};
</script>