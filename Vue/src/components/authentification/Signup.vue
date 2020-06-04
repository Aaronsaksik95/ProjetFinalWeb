<template>
  <div class="w-25 mx-auto" id="signup">
    <form class="" @submit="formSubmit">
      <div class="form-group">
        <label>Prénom</label>
        <input type="text" class="form-control" v-model="firstName" placeholder="Aaron" />
      </div>
      <div class="form-group">
        <label>Nom</label>
        <input type="text" class="form-control" v-model="lastName" placeholder="Saksik" />
      </div>
      <div class="form-group">
        <label>Date de naissance</label>
        <input type="date" class="form-control" v-model="dateBirth" />
      </div>
      <div class="form-group">
        <label>Solde</label>
        <input type="number" class="form-control" v-model="sold" placeholder="10000" />
      </div>
      <div class="form-group">
        <label>Email</label>
        <input type="email" class="form-control" v-model="email" placeholder="exemple@gmail.com" />
      </div>
      <div class="form-group">
        <label>Mot de passe</label>
        <input type="password" class="form-control" v-model="password" placeholder="10000" />
      </div>

      <button type="submit" class="btn btn-info h-25">Inscription</button>
      <router-link class="link p-2" to="/login">Connexion</router-link>
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

</style>
