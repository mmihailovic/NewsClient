<template>
    <div class="container">
    <form>
  <div class="form-group">
    <label for="exampleFormControlInput1">Ime</label>
    <input type="text" v-model="ime" class="form-control" id="exampleFormControlInput1">
  </div>
  <div class="form-group">
    <label for="exampleFormControlTextarea1">Opis</label>
    <textarea class="form-control" v-model="opis" id="exampleFormControlTextarea1" rows="3"></textarea>
  </div>
</form>
<button class="btn btn-primary kreiraj" @click="kreirajVest">Kreiraj kategoriju</button>
</div>
</template>

<script>
export default {
    data() {
        return {
            ime:'',
            opis:''
        }
    },
    methods: {
        kreirajVest() {
            this.$axios.post('/api/category', {
                ime: this.ime,
                opis: this.opis,
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