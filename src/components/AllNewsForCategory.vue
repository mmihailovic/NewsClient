<template>
    <div class="container">
        <h1>All news</h1>

        <button class="btn btn-primary" @click="openForm">Create news</button>

        <table class="table">
          <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Author</th>
            <th scope="col">Date</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(news,index) in newsList" :key="index">
            <td @click="otvoriNoviTab(news.id)">{{ news.title }}</td>
            <td>{{ news.author }}</td>
            <td>{{ formatDate(news.date) }}</td>
            <td><button class="btn btn-success" @click="editNews(news)">Edit</button></td>
            <td><button class="btn btn-danger" @click="deleteNews(news.id)">Delete</button></td>
          </tr>
          </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name:"AllNews",
    data() {
        return {
            naziv:'',
            newsList:[]
        }
    },
    created() {
        this.naziv = this.$route.params.kategorija;
        this.$axios.get(`/api/news/category/` + this.naziv, { headers: {'Access-Control-Allow-Origin': '*'}})
        .then((response) => {
            this.newsList = response.data;
        });
    },
    methods: {
        otvoriNoviTab(id) {
            const ruta = this.$router.resolve({ path: '/news/' + id });
            window.open(ruta.href, '_blank');
        },
        deleteNews(id) {
            this.$axios.delete(`/api/news/` + id, { headers: {'Access-Control-Allow-Origin': '*'}})
            .then(()=>{
                this.$axios.get(`/api/news`, { headers: {'Access-Control-Allow-Origin': '*'}})
        .then((response) => {
            this.newsList = response.data;
        });
            })
        },
        openForm() {
            this.$router.push('/cms/vesti/add');
        },
        editNews(selectedNews) {
            console.log(selectedNews)
            this.$router.push({path:'/cms/vesti/edit',query: { news: JSON.stringify(selectedNews)}});
        }
    }
}
</script>