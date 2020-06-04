<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="/">Home</a>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav w-100">
          <div class="collapse navbar-collapse">
            <li class="nav-item active" v-if="this.user.RoleId == null">
              <router-link class="nav-link" to="/login">Connexion</router-link>
            </li>
            <li class="nav-item active" v-if="this.user.RoleId == null">
              <router-link class="nav-link" to="/signup">Inscription</router-link>
            </li>
            <li class="nav-item active" v-if="this.user.RoleId == 2 || this.user.RoleId == 1 ">
              <router-link class="nav-link" to="/logout">Déconnexion</router-link>
            </li>
            <li class="nav-item" v-if="this.user.RoleId == 2 || this.user.RoleId == 1 ">
              <router-link class="nav-link" :to="{path: '/profile/'+ user.id}">Profil</router-link>
            </li>
            <li class="nav-item" v-if="this.user.RoleId == 2">
              <router-link class="nav-link" to="/produitAdmin">Admin</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/">Contact</router-link>
            </li>
            <form class="d-flex ml-5 mt-3 ">
            <div class="form-group mr-3">
              <input type="text" class="form-control" placeholder="Recherchez un jeu..."/>
            </div>
            <button type="submit" class="btn btn-info h-25">Rechercher</button>
          </form>
          </div>
          <li class="nav-item float-right mt-3 d-flex" v-if="this.user.RoleId == 2 || this.user.RoleId == 1 ">
            <router-link class="nav-link pr-1" to="/panier">Panier</router-link>
            <small class="border border-info rounded-circle h-50 p-1">{{count}}</small>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      user: [],
      getToken: localStorage.getItem("token"),
      count: ""
    };
  },
  mounted() {
    axios
      .get("http://localhost:5000/profile?secret_token=" + this.getToken)
      .then(response => (this.user = response.data.user));
    console.log(this.user);
    axios
      .get("http://localhost:5000/panier/count/" + this.user.id)
      .then(response => (this.count = response.data));
  },
  methods: {}
};
</script>