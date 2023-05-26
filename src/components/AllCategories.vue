<template>
    <div class="container">
        <h1>All news</h1>

        <button class="btn btn-primary" @click="openForm">Create category</button>

        <table class="table">
          <thead>
          <tr>
            <th scope="col">Ime</th>
            <th scope="col">Opis</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(kategorija,index) in categories" :key="index">
            <td @click="otvoriNoviTab(kategorija.ime)">{{ kategorija.ime }}</td>
            <td>{{ kategorija.opis }}</td>
            <td><button class="btn btn-success" @click="editCategory(kategorija)">Edit</button></td>
            <td><button class="btn btn-danger" @click="deleteCategory(kategorija.ime)">Delete</button></td>
          </tr>
          </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name:"AllCategories",
    data() {
        return {
            categories:[]
        }
    },
    created() {
        this.$axios.get(`/api/category`, { headers: {'Access-Control-Allow-Origin': '*'}})
        .then((response) => {
            this.categories = response.data;
        });
    },
    methods: {
        otvoriNoviTab(id) {
            this.$router.push("/cms/kategorije/" + id)
        },
        deleteCategory(id) {
            this.$axios.delete(`/api/category/` + id, { headers: {'Access-Control-Allow-Origin': '*'}})
            .then(()=>{
                this.$axios.get(`/api/category`, { headers: {'Access-Control-Allow-Origin': '*'}})
        .then((response) => {
            console.log(response.data)
            this.categories = response.data;
        });
            })
        },
        openForm() {
            this.$router.push('/cms/kategorije/add');
        },
        editCategory(selectedNews) {
            console.log(selectedNews)
            this.$router.push({path:'/cms/kategorije/edit',query: { kategorija: JSON.stringify(selectedNews)}});
        }
    }
}
</script>