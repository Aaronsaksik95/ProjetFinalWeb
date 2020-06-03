<template>
  <div class="m-5">
    <router-link class="float-left mb-3 ml-3" to="/produitAdmin">Liste des jeux</router-link>
    <table class="table table-striped">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Prénom</th>
          <th scope="col">Nom</th>
          <th scope="col">Date Naissance</th>
          <th scope="col">Solde</th>
          <th scope="col">Email</th>
          <th scope="col">Creation</th>
          <th scope="col">Modification</th>
          <th scope="col">Role</th>
          <th scope="col">Suppimer</th>
          <th scope="col">Modifier</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <th scope="row">{{user.id}}</th>
          <td>{{user.firstName}}</td>
          <td>{{user.lastName}}</td>
          <td>{{user.dateBirth}}</td>
          <td>{{user.sold}}</td>
          <td>{{user.email}}</td>
          <td>{{user.createdAt}}</td>
          <td>{{user.updatedAt}}</td>
          <td>{{user.RoleId}}</td>
          <td>
            <Button v-on:click="DeleteUser(user.id)" class="btn btn-danger">Supprimer</Button>
          </td>
          <td>
            <router-link class="btn btn-warning" :to="{path: '/updateUser/'+ user.id}">Modifier</router-link>
          </td>
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
      users: [],
      user: [],
      getToken: localStorage.getItem("token")
    };
  },
  mounted() {
    axios
      .get("http://localhost:5000/user/all")
      .then(response => (this.users = response.data));
    axios
      .get("http://localhost:5000/profile?secret_token=" + this.getToken)
      .then(response => (this.user = response.data.user));
  },
  methods: {
    DeleteUser(id) {
      axios.delete("http://localhost:5000/user/" + id);
      console.log("salut");
      document.location.reload(true);
    }
  }
};
</script>
