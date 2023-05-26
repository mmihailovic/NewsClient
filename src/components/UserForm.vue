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
    <input type="email" v-model="email" class="form-control" id="exampleFormControlInput2">
  </div>
  <div class="form-group">
    <label for="exampleFormControlSelect1">Tip</label>
    <select class="form-control" id="exampleFormControlSelect1" v-model="tip">
      <option>ADMIN</option>
      <option>CONTENT_CREATOR</option>
    </select>
  </div>
  <div class="form-group">
    <label for="exampleFormControlInput1">Sifra</label>
    <input type="password" v-model="sifra" class="form-control" id="exampleFormControlInput3">
  </div>
  <div class="form-group">
    <label for="exampleFormControlInput1">Potvrdi sifru</label>
    <input type="password" v-model="ponovljenaSifra" class="form-control" id="exampleFormControlInput4">
  </div>
</form>
<p v-if="greska">Sifre se ne poklapaju!</p>
<button class="btn btn-primary kreiraj" @click="kreirajKorisnika">Kreiraj korisnika</button>
</div>
</template>

<script>
export default {
    data() {
        return {
            ime:'',
            prezime:'',
            email:'',
            tip:'',
            sifra:'',
            ponovljenaSifra:'',
            greska:false
        }
    },
    methods: {
        kreirajKorisnika() {
            if(this.sifra === this.ponovljenaSifra) {
                this.$axios.post('/api/users/register', {
                    username: this.email,
                    password: this.sifra,
                    ime: this.ime,
                    prezime: this.prezime,
                    tip: this.tip
                }, {headers: { 'Access-Control-Allow-Origin': '*'}})
                .then(() => {
                    this.$router.push('/cms/korisnici');
                })
            }
            else {
                this.greska = true
            }
        }
    }
}
</script>
<style scope>

.kreiraj {
    margin-top: 50px;
}
</style>