<template>
    <div>
        {{user}}
    </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Profil",
  el: "#profil",
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
    console.log("user", this.user);
    
  }
};
</script>
