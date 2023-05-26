<template>
    <div class="container">
    <form>
  <div class="form-group">
    <label for="exampleFormControlInput1">Ime</label>
    <input type="text" v-model="novoIme" class="form-control" id="exampleFormControlInput1">
  </div>
  <div class="form-group">
    <label for="exampleFormControlTextarea1">Opis</label>
    <textarea class="form-control" v-model="opis" id="exampleFormControlTextarea1" rows="3"></textarea>
  </div>
</form>
<button class="btn btn-primary kreiraj" @click="kreirajVest">Sacuvaj izmene</button>
</div>
</template>

<script>
export default {
    data() {
        return {
            ime:'',
            novoIme:'',
            opis:''
        }
    },
    created() {
        const kategorija = JSON.parse(this.$route.query.kategorija);
        this.ime = kategorija.ime;
        this.novoIme = kategorija.ime;
        this.opis = kategorija.opis;

        console.log(kategorija);
    },
    methods: {
        kreirajVest() {
            console.log(this.ime)
            console.log(this.novoIme)
            console.log(this.opis)
            this.$axios.post('/api/category/' + this.ime, {
                ime: this.ime,
                novoIme: this.novoIme,
                opis: this.opis
            }, {headers: { 'Access-Control-Allow-Origin': '*'}})
            .then(() => {
                this.$router.push('/cms/kategorije');
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