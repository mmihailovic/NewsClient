<template>
    <div class="container">
    <form>
  <div class="form-group">
    <label for="exampleFormControlInput1">Naslov</label>
    <input type="text" v-model="naslov" class="form-control" id="exampleFormControlInput1">
  </div>
  <div class="form-group">
    <label for="exampleFormControlSelect1">Kategorija</label>
    <select class="form-control" id="exampleFormControlSelect1" v-model="kategorija">
      <option v-for="(kategorija,index) in kategorije" :key="index">{{kategorija.ime}}</option>
    </select>
  </div>
  <div class="form-group">
    <label for="exampleFormControlTextarea1">Tekst</label>
    <textarea class="form-control" v-model="tekst" id="exampleFormControlTextarea1" rows="3"></textarea>
  </div>
  <div class="form-group">
    <label for="exampleFormControlInput1">Tag</label>
    <input type="text" v-model="tag" class="form-control" id="exampleFormControlInput1">
  </div>
  <button @click="dodajTag" class="btn btn-primary">Dodaj tag</button>
</form>

<div v-if="tagovi && tagovi.length > 0">
        <h4>Tags</h4>
        <div class="tag-container">
          <p v-for="(tag,index) in tagovi" :key="index" class="tag">{{ tag }} <button @click="removeItem(index)" class="tag-remove">x</button></p>
        </div>
</div>
<button class="btn btn-primary kreiraj" @click="kreirajVest">Kreiraj vest</button>
</div>
</template>

<script>
export default {
    data() {
        return {
            kategorije:[],
            tagovi:[],
            kategorija:null,
            naslov:'',
            tekst:'',
            tag:'',
            id:null,
        }
    },
    created() {
        this.$axios.get(`/api/category`, { headers: {'Access-Control-Allow-Origin': '*'}})
        .then((response) => {
            this.kategorije = response.data;
        });
    },
    methods: {
        removeItem(index) {
            this.tagovi.splice(index, 1);
        },
        dodajTag() {
            this.tagovi.push(this.tag)
            this.tag=''
        },
        kreirajVest() {
            this.$axios.post('/api/news', {
                title: this.naslov,
                text: this.tekst,
                author: JSON.parse(atob(localStorage.getItem('jwt').split('.')[1])).sub,
                category: this.kategorija
            }, {headers: { 'Access-Control-Allow-Origin': '*'}})
            .then(response => {
                if(this.tagovi.length > 0) {
                const requestData = this.tagovi.map(tag => ({ kljucnaRec: tag, vest_id: response.data.id }));

                const headers = {
                'Access-Control-Allow-Origin': '*',
                // Dodajte ostale headere koje želite da prosledite
                };
                console.log(this.tagovi)
                this.$axios.post('/api/tag/news/' + response.data.id,requestData,{headers})
                .then(() => {
                    this.$router.push('/cms/vesti');
                });
            }
            })
        }
    }
}
</script>
<style scope>
.form-container {
  max-width: 400px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  font-weight: bold;
}

.form-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-submit {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.form-submit:hover {
  background-color: #45a049;
}

.form-tags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.form-tag {
  background-color: #f2f2f2;
  color: #333;
  padding: 6px 12px;
  margin-right: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
}

.tag-container {
  display: flex;
  flex-wrap: wrap;
}

.tag {
  background-color: #ccc;
  padding: 5px 20px;
  margin-right: 10px;
  margin-bottom: 10px;
  border-radius: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-decoration: none;
  color: inherit;
}

.tag:last-child {
  margin-right: 0;
}

.tag:hover {
  background-color: #aaa;
}

.tag-remove {
  position: relative;
  background:transparent;
  border: none;
  top: -5px;
  right: -10px;
  cursor: pointer;
}

.kreiraj {
    margin-top: 50px;
}
</style>