<template>
  <div id="produit">
    <div v-if="this.post">
      <h1 class="mt-5">{{post.name}}</h1>
      <div class="w-75 mx-auto border p-5">
        <img src="../assets/fortnite.jpg" class="card-img-top" alt="..." />
        <a class="float-left mt-3 d-flex text-danger" v-on:click="Like(post.id)">
          <p class="h3 mr-1">{{like}}</p>
          <img src="../assets/heart.png" class="img" alt />
        </a>
        <div class="card-body">
          <p class="card-text">{{post.description}}</p>
          <button class="btn btn-primary" v-on:click="addPanier(post.id)">Panier</button>
        </div>
      </div>
      <div class="mt-5 w-50 mx-auto">
        <form>
          <div class="form-group w-100 mx-auto d-flex">
            <input
              type="text"
              class="w-100 border-left-0 border-right-0 border-top-0"
              v-model="content"
              placeholder="Tapez un commentaire..."
            />
            <button class="btn btn-info ml-4" v-on:click="addCommentaire(post.id)">Envoyer</button>
          </div>
        </form>
      </div>
      <div class="mt-5">
        <div v-for="com in commentaires" :key="com.id" class="w-50 mx-auto mt-5">
          <div class="d-flex justify-content-between">
            <div class="d-flex">
              <h6 class>{{com.userName}}</h6>
              <small class="font-weight-light ml-1 text-info">{{com.date}}</small>
            </div>
            <button
              v-if="com.UserId == user.id"
              class="btn btn-light float-right"
              v-on:click="deleteCom(com.id)"
            >
              <img class="img2" src="../assets/trash.png" alt />
            </button>
          </div>
          <div class="d-flex justify-content-between">
            <h7 class="font-weight-light float-left">{{com.content}}</h7>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <h2>Aucun article à ce nom</h2>
      <a class="h2 text-info" href="/">Retour à l'accueil</a>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Produits",
  el: "#produits",
  data: function() {
    return {
      post: [],
      userAuth: [],
      user: [],
      like: [],
      content: "",
      commentaires: [],
      getToken: localStorage.getItem("token"),
      output: []
    };
  },
  async mounted() {
    await axios
      .get("http://localhost:5000/produit/name/" + this.$route.params.name)
      .then(response => (this.post = response.data));
    await axios
      .get("http://localhost:5000/profile?secret_token=" + this.getToken)
      .then(response => (this.userAuth = response.data.user));
    await axios
      .get("http://localhost:5000/user/" + this.userAuth.id)
      .then(response => (this.user = response.data));
    await axios
      .get("http://localhost:5000/produit/" + this.post.id + "/commentaire")
      .then(response => (this.commentaires = response.data.reverse()));
    await axios
      .get("http://localhost:5000/produit/note/count/" + this.post.id)
      .then(response => (this.like = response.data));
  },
  methods: {
    addPanier(id) {
      let currentObj = this;
      this.axios
        .post("http://localhost:5000/panier/" + id, {
          UserId: this.user.id
        })
        .then(function(response) {
          currentObj.output = response.data;
        })
        .catch(function(error) {
          currentObj.output = error;
        });
      document.location.reload(true);
    },
    addCommentaire(id) {
      let currentObj = this;
      this.axios
        .post("http://localhost:5000/produit/" + id + "/commentaire", {
          content: this.content,
          UserId: this.userAuth.id,
          userName: this.user.firstName
        })
        .then(function(response) {
          currentObj.output = response.data;
        })
        .catch(function(error) {
          currentObj.output = error;
        });
      document.location.reload(true);
    },
    Like(id) {
      //   console.log("coucou");
      //   this.axios
      //     .get("http://localhost:5000/produit/" + id + "/note", {
      //       UserId: this.userAuth.id
      //     })
      //     .then(response => (this.like = response.data));
      //   console.log(this.like);
      //   if (this.like == null) {
      this.axios.post("http://localhost:5000/produit/" + id + "/note", {
        UserId: this.userAuth.id
      });
      document.location.reload(true);

      //   } else {
      //     this.axios.delete(
      //       "http://localhost:5000/produit/" +
      //         id +
      //         "/" +
      //         this.userAuth.id +
      //         "/note"
      //     );
      //   }
    },

    deleteCom(id) {
      this.axios.delete("http://localhost:5000/produit/commentaire/" + id);
      document.location.reload(true);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.img {
  width: 30px;
  height: 30px;
}
.img2 {
  width: 20px;
  height: 20px;
}
</style>
