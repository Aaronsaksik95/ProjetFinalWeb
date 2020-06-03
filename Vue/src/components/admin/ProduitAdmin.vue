<template>
  <div>
    <table class="table table-striped table-dark">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Name</th>
          <th scope="col">Image</th>
          <th scope="col">Description</th>
          <th scope="col">Price</th>
          <th scope="col"><Button>Supprimer</Button></th>
          <th scope="col"><Button>Modifier</Button></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
      </tbody>
    </table>
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
      getToken: localStorage.getItem("token")
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
  methods: {}
};
</script>
