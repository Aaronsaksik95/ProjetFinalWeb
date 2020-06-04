<script>
export default {
  mounted() {
    localStorage.removeItem('token')
    window.location.href = "/login";
  }
};
</script>