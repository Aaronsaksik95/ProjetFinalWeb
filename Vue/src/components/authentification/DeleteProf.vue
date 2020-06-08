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
    axios.delete("http://localhost:5000/produit/commentaire/user/" + this.$route.params.id);
    axios.delete("http://localhost:5000/produit/note/user/" + this.$route.params.id);
    axios.delete("http://localhost:5000/panier/user/" + this.$route.params.id);
    axios.delete("http://localhost:5000/commande/user/" + this.$route.params.id)
    axios.delete("http://localhost:5000/user/" + this.$route.params.id);
    localStorage.removeItem("token");
    window.location.href = "/signup";
  }
};
</script>