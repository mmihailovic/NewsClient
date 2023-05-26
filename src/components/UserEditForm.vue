<template>
    <div class="container">
    <form>
  <div class="form-group">
    <label for="exampleFormControlInput1">Ime</label>
    <input type="text" v-model="ime" class="form-control" id="exampleFormControlInput1">
  </div>
  <div class="form-group">
    <label for="exampleFormControlTextarea1">Prezime</label>
    <input type="text" class="form-control" v-model="prezime" id="exampleFormControlTextarea1"/>
  </div>
  <div class="form-group">
    <label for="exampleFormControlInput1">Email</label>
    <input type="email" v-model="novEmail" class="form-control" id="exampleFormControlInput2">
  </div>
  <div class="form-group">
    <label for="exampleFormControlSelect1">Tip</label>
    <select class="form-control" id="exampleFormControlSelect1" v-model="tip">
      <option>ADMIN</option>
      <option>CONTENT_CREATOR</option>
    </select>
  </div>
</form>
<button class="btn btn-primary kreiraj" @click="kreirajKorisnika">Sacuvaj izmene</button>
</div>
</template>

<script>
export default {
    data() {
        return {
            ime:'',
            prezime:'',
            email:'',
            novEmail:'',
            tip:''
        }
    },
    created() {
        const korisnik = JSON.parse(this.$route.query.korisnik);
        this.ime = korisnik.ime
        this.prezime = korisnik.prezime
        this.email = korisnik.email
        this.novEmail = korisnik.email
        this.tip = korisnik.tip
    },  
    methods: {
        kreirajKorisnika() {
            console.log(this.email)
            console.log(this.novEmail)
            console.log(this.ime)
            console.log(this.prezime)
            console.log(this.tip)
            this.$axios.post('/api/users/update', {
                email:this.email,
                newEmail:this.novEmail,
                ime: this.ime,
                prezime: this.prezime,
                tip: this.tip
            }, {headers: { 'Access-Control-Allow-Origin': '*'}})
            .then(() => {
                this.$router.push('/cms/korisnici');
            })
        }
    }
}
</script>
<style scope>

.kreiraj {
    margin-top: 50px;
}
</style>