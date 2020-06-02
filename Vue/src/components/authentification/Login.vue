// localStorage.getItem('YourItem')
// localStorage.removeItem('YourItem')
<template>
  <div class="login-content" id="login">
    <div id="link-sign">
      <router-link class="link" to="/signup">Inscription</router-link>
      <router-link class="link" to="/login">Connexion</router-link>
    </div>
    <form class="login-form" @submit="formSubmit">
      <label for>Adresse Email</label>
      <input type="email" v-model="email" placeholder="exemple@gmail.com" />
      <label for>Mot de passe</label>
      <input type="Password" v-model="password" placeholder="*********" />
      <label for></label>
      <button type="submit">Se connecter</button>
    </form>saksik95@gmail.com
    <p>{{user.id}}</p>
    <!-- <strong>Output:</strong> -->
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
      localStorage.removeItem('token')
      e.preventDefault();
      let currentObj = this;
      await this.axios
        .post("http://localhost:5000/login/", {
          email: this.email,
          password: this.password
        })
        .then(function(response) {
          currentObj.token = response.data.token;
        })
        .catch(function(error) {
          currentObj.token = error;
        });
      axios
        .get("http://localhost:5000/profile?secret_token=" + this.getToken)
        .then(response => (this.user = response.data.user));
      console.log("user", this.user);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.link {
  padding: 40px;
}
.login-form {
  padding: 50px;
  margin: 0 auto;
  width: 20%;
}
.login-form input {
  display: block;
  margin: 20px 0px 20px 0px;
  width: 100%;
  height: 30px;
  border-radius: 5px;
  border: solid 1px rgb(121, 121, 121);
  text-indent: 5px;
}
.login-form label {
}
</style>
