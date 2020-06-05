<template>
  <div>
    <h2 class="text-info">{{output}}</h2>
    <p class="h4">Vous pouvez revenir à l'<a href="/">accueil</a>.</p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      output: ""
    };
  },
  mounted() {
    let currentObj = this;
    axios.get("http://localhost:5000/*/").then(function(response) {
      currentObj.output = response.data;
    });
  }
};
</script>