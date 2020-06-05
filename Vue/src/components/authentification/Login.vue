// localStorage.getItem('YourItem')
// localStorage.removeItem('YourItem')
<template>
  <div>
    <h1 class="mt-5">Connexion</h1>
    <div class="w-50 bg-light mt-3 p-5 mx-auto shadow" id="login">
      <form @submit="formSubmit">
        <div class="form-group">
          <label>Email</label>
          <input type="email" class="form-control" v-model="email" placeholder="exemple@gmail.com" />
        </div>
        <div class="form-group">
          <label>Mot de passe</label>
          <input type="password" class="form-control" v-model="password" placeholder="*********" />
        </div>
        <button type="submit" class="btn btn-info h-25">Connexion</button>
        <router-link class="link p-2" to="/signup">Inscription</router-link>
      </form>
      <p class="text-info">{{info}}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  el: "#login",
  data: function() {
    return {
      email: "",
      password: "",
      token: "",
      info: "",
      user: [],
      getToken: localStorage.getItem("token")
    };
  },
  mounted() {
    if (localStorage.token) {
      this.token = localStorage.token;
    }
  },
  watch: {
    token(newToken) {
      localStorage.token = newToken;
    }
  },
  methods: {
    async formSubmit(e) {
      localStorage.removeItem("token");
      e.preventDefault();
      let currentObj = this;
      await this.axios
        .post("http://localhost:5000/login/", {
          email: this.email,
          password: this.password
        })
        .then(function(response) {
          (currentObj.token = response.data[0].token),
            (currentObj.info = response.data[1].info),
            console.log(currentObj);
        })
        .catch(function(error) {
          currentObj.token = error;
        });
      axios
        .get("http://localhost:5000/profile?secret_token=" + this.getToken)
        .then(response => (this.user = response.data.user));
      window.location.href = "/";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
