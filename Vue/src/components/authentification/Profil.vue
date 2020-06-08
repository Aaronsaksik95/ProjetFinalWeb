<template>
  <div>
    <h1 class="mt-5">Mon profil</h1>
    <div class="w-50 bg-light mt-3 p-5 mx-auto shadow">
      <form>
        <div class="form-group">
          <label>Prénom</label>
          <input type="text" class="form-control" v-model="theUser.firstName" placeholder="Aaron" />
        </div>
        <div class="form-group">
          <label>Nom</label>
          <input type="text" class="form-control" v-model="theUser.lastName" placeholder="Saksik" />
        </div>
        <div class="form-group">
          <label>Date de naissance</label>
          <input type="date" class="form-control" v-model="theUser.dateBirth" />
        </div>
        <div class="form-group">
          <label>Solde</label>
          <input type="number" class="form-control" v-model="theUser.sold" placeholder="10000" />
        </div>
        <div class="form-group">
          <label>Email</label>
          <input
            type="email"
            class="form-control"
            v-model="theUser.email"
            placeholder="exemple@gmail.com"
          />
        </div>
        <button type="submit" v-on:click="updateProf()" class="btn btn-primary">Modifier</button>
      </form>
    </div>
    <div class="w-25 bg-danger mt-3 p-5 mx-auto shadow">
      <button class="btn btn-light" v-on:click="deleteProf()">Supprimer mon profil.</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      theUser: [],
      user: [],
      getToken: localStorage.getItem("token"),
      output: []
    };
  },
  mounted() {
    axios
      .get("http://localhost:5000/user/" + this.$route.params.id)
      .then(response => (this.theUser = response.data));
    axios
      .get("http://localhost:5000/profile?secret_token=" + this.getToken)
      .then(response => (this.user = response.data.user));
  },
  methods: {
    async updateProf() {
      await axios.put("http://localhost:5000/user/" + this.$route.params.id, {
        firstName: this.theUser.firstName,
        lastName: this.theUser.lastName,
        dateBirth: this.theUser.dateBirth,
        sold: this.theUser.sold,
        email: this.theUser.email
      });
    },
    async deleteProf() {
      window.location.href = "/deleteProf/" + this.theUser.id;
    }
  }
};
</script>
