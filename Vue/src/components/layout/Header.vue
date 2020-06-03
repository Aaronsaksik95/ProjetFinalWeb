<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="/">Home</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav w-100">
          <div class="collapse navbar-collapse">
            <li class="nav-item active">
              <router-link class="nav-link" to="/login">Connexion</router-link>
            </li>
            <li class="nav-item active">
              <router-link class="nav-link" to="/signup">Inscription</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{path: '/profile/'+ user.id}">Profil</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/produitAdmin">Admin</router-link>
            </li>
          </div>
          <li class="nav-item float-right">
            <router-link class="nav-link" to="/panier">Panier</router-link>
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
      getToken: localStorage.getItem("token")
    };
  },
  mounted() {
    axios
      .get("http://localhost:5000/profile?secret_token=" + this.getToken)
      .then(response => (this.user = response.data.user));
  }
};
</script>