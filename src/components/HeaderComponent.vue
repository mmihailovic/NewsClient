<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-primary">
  <a class="navbar-brand" href="#">Navbar</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavDropdown">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <router-link to="/home" class="nav-link">Home page</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/najcitanije" class="nav-link">Najcitanije</router-link>
      </li>
      <li class="nav-item" v-for="(category,index) in kategorije" :key="index">
        <router-link :to="{ path: '/category/' + category.ime }" class="nav-link">{{category.ime}}</router-link>
      </li>
    </ul>
  </div>
</nav>
</template>
<script>
export default {
    name:"HeaderComponent",
    data() {
        return {
            kategorije:[]
        }
    },
    created() {
        this.$axios.get('/api/category', { headers: {'Access-Control-Allow-Origin': '*'}})
        .then((response) => {
            this.kategorije = response.data;
        });
    },
}
</script>