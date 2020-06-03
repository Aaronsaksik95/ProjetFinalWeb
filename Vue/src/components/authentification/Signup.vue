<template>
  <div class="signup-content" id="signup">
    <form class="signup-form" @submit="formSubmit">
      <label for>FirstName</label>
      <input type="text" v-model="firstName" placeholder="Aaron" />
      <label for>LastNAme</label>
      <input type="text" v-model="lastName" placeholder="Saksik" />
      <label for>Date de naissance</label>
      <input type="date" v-model="dateBirth" />
      <label for>Solde</label>
      <input type="number" v-model="sold" placeholder="10000" />
      <label for>Adresse Email</label>
      <input type="email" v-model="email" placeholder="exemple@gmail.com" />
      <label for>Mot de passe</label>
      <input type="Password" v-model="password" placeholder="*********" />
      <label for></label>
      <div class="d-flex">
        <button type="submit" class="btn btn-info h-25">Inscription</button>
        <router-link class="link p-2" to="/login">Connexion</router-link>
      </div>
    </form>
    <p class="text-primary">{{output}}</p>
  </div>
</template>

<script>
export default {
  name: "Signup",
  el: "#signup",
  data: function() {
    return {
      firstName: "",
      lastName: "",
      dateBirth: "",
      sold: "",
      email: "",
      password: "",
      output: ""
    };
  },
  methods: {
    formSubmit(e) {
      e.preventDefault();
      let currentObj = this;
      this.axios
        .post("http://localhost:5000/signup/", {
          firstName: this.firstName,
          lastName: this.lastName,
          dateBirth: this.dateBirth,
          sold: this.sold,
          email: this.email,
          password: this.password
        })
        .then(function(response) {
          currentObj.output = response.data;
        })
        .catch(function(error) {
          currentObj.output = error;
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.link {
  padding: 40px;
}
.signup-form {
  padding: 50px;
  margin: 0 auto;
  width: 20%;
}
.signup-form input {
  display: block;
  margin: 20px 0px 20px 0px;
  width: 100%;
  height: 30px;
  border-radius: 5px;
  border: solid 1px rgb(121, 121, 121);
  text-indent: 5px;
}
.signup-form label {
}
</style>
