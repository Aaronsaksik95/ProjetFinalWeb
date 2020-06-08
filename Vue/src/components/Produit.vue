<template>
  <div id="produit">
    <div v-if="this.post">
      <h1 class="mt-5">{{post.name}}</h1>
      <div class="w-75 mx-auto border pt-5 pl-5 pr-5">
        <img :src="post.image" class="card-img-top" alt="..." />
        <div>
          <a
            v-if="this.commande.length != 0"
            class="float-left mt-3 d-flex text-danger"
            v-on:click="Like(post.id)"
          >
            <p class="h3 mr-1">{{like}}</p>
            <img src="../assets/heart.png" class="img" alt />
          </a>
          <div v-else class="float-left mt-3 d-flex text-danger">
            <p v-if="this.user.RoleId" class="h3 mr-1">{{like}}</p>
            <img src="../assets/heart.png" class="img" alt />
          </div>
        </div>
        <h5 class="card-text m-5">{{post.description}}</h5>

        <div class="card-body d-flex justify-content-between">
          <div v-if="this.user.RoleId">
            <button class="btn btn-light" v-on:click="addPanier(post.id)">
              <img class="img" src="../assets/food-basket.png" alt />
            </button>
          </div>

          <div v-else>
            <router-link class="btn btn-info m-3" to="/login">Se Connecter</router-link>
            <router-link class="text-info m-3" to="/signup">S'inscrire</router-link>
          </div>
          <h3 class="text-info border-bottom border-dark">{{post.price}} €</h3>
        </div>
      </div>
      <div v-if="this.commande.length != 0" class="mt-5 w-50 mx-auto">
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
            <div class="float-right w-50 d-flex justify-content-between">
              <div class="float-right">
                <button
                  v-if="com.UserId == user.id"
                  class="btn btn-light"
                  v-on:click="deleteCom(com.id)"
                >
                  <img class="img2" src="../assets/trash.png" alt />
                </button>
                <button
                  v-if="com.UserId == user.id"
                  v-on:click="Display(com.id)"
                  class="btn btn-light"
                >
                  <img class="img2" src="../assets/edit.png" alt />
                </button>
              </div>

              <div class v-if="display == com.id">
                <form>
                  <input class="form-control" v-model="newCom" type="text" id />
                  <button
                    v-on:click="updateCom(com.id)"
                    class="btn btn-light"
                    type="submit"
                  >Modifier</button>
                </form>
              </div>
            </div>
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
      image: [],
      like: [],
      oneLike: [],
      content: "",
      newCom: "",
      commande: [],
      display: false,
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
    await axios
      .get(
        "http://localhost:5000/produit/" +
          this.post.id +
          "/" +
          this.user.id +
          "/note"
      )
      .then(response => (this.oneLike = response.data));
    await axios
      .get(
        "http://localhost:5000/commande/" + this.user.id + "/" + this.post.id
      )
      .then(response => (this.commande = response.data));
    console.log("commande", this.commande);
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
      console.log("us", this.user.id);
      if (this.oneLike) {
        this.axios.delete(
          "http://localhost:5000/produit/" + id + "/" + this.user.id + "/note"
        );
        document.location.reload(true);
      } else {
        this.axios.post("http://localhost:5000/produit/" + id + "/note", {
          UserId: this.userAuth.id
        });
        document.location.reload(true);
      }
    },

    deleteCom(id) {
      this.axios.delete("http://localhost:5000/produit/commentaire/" + id);
      document.location.reload(true);
    },
    updateCom(id) {
      this.axios.put("http://localhost:5000/produit/commentaire/" + id, {
        content: this.newCom
      });
      document.location.reload(true);
    },
    async Display(id) {
      if (this.display == id) {
        this.display = "";
      } else {
        this.display = id;
      }
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
