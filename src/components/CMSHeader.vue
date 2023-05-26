<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-primary">
  <a class="navbar-brand" href="#">Navbar</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavDropdown">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <router-link to="/cms/vesti" class="nav-link">Vesti</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/cms/kategorije" class="nav-link">Kategorije</router-link>
      </li>
      <li v-if="tip === 'ADMIN'" class="nav-item">
        <router-link to="/cms/korisnici" class="nav-link">Korisnici</router-link>
      </li>
      <li class="nav-item">
        <a class="nav-link">{{ime}}</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" @click="logout">Logout</a>
      </li>
    </ul>
  </div>
</nav>
</template>

<script>
export default {
    data() {
        return {
            ime:'',
            tip:''
        }
    },
    created() {
        const jwtToken = localStorage.getItem('jwt');
        if (jwtToken) {
            const decoded = JSON.parse(atob(jwtToken.split('.')[1]));
            this.ime = decoded.sub;
            this.tip = decoded.tip;
        }
    },
    methods: {
        logout() {
            localStorage.removeItem("jwt")
            this.$router.push('/login')
        }
    }
}
</script>