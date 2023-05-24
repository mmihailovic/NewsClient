<template>
    <div class="loginDiv">
    <form @submit.prevent="login">
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" v-model="username" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" v-model="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
  </div>
  <button type="submit" class="btn btn-primary">Login</button>
</form>
<p v-if="error" class="error">Pogresni kredencijali!</p>
</div>
</template>

<script>
export default {
    name:"LoginComponent",
    data(){
      return {
        username:'',
        password:'',
        error:false
      }
    },
    methods:{
        login() {
          console.log(this.username)
          console.log(this.password)
          this.$axios.post('/api/users/login', {
            username: this.username,
            password: this.password
          }).then(response => {
            localStorage.setItem('jwt', response.data.jwt)
            this.$router.push("/cms");
          }).catch(error => {
            console.log(error)
            this.error = true
          })
        }
    }
}
</script>
<style scoped>
.loginDiv {
    width:50%;
}
.error {
  color: red;
}
</style>
