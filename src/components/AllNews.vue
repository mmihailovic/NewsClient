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
          <tr v-for="(news,index) in showList" :key="index">
            <td @click="otvoriNoviTab(news.id)">{{ news.title }}</td>
            <td>{{ news.author }}</td>
            <td>{{ formatDate(news.date) }}</td>
            <td><button class="btn btn-success" @click="editNews(news)">Edit</button></td>
            <td><button class="btn btn-danger" @click="deleteNews(news.id)">Delete</button></td>
          </tr>
          </tbody>
        </table>
        <pagination v-model="page" :records="newsList.length" :per-page="3" @paginate="onChangePage"></pagination>
    </div>
</template>

<script>
import Pagination from 'vue-pagination-2'
export default {
    name:"AllNews",
    components:{Pagination},
    data() {
        return {
            newsList:[],
            page:1,
            showList:[]
        }
    },
    created() {
        this.$axios.get(`/api/news`, { headers: {'Access-Control-Allow-Origin': '*'}})
        .then((response) => {
            this.newsList = response.data;
        });

        this.$axios.get(`/api/news/page/${this.page}`, { headers: {'Access-Control-Allow-Origin': '*'}})
      .then((response) => {
        // this.newsList = response.data;  
        this.showList = response.data
        console.log(response)
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
        },
        onChangePage(pageOfItems) {
            // update page of items

            this.page = pageOfItems;
            console.log(pageOfItems)
            this.$axios.get(`/api/news/page/${this.page}`, { headers: {'Access-Control-Allow-Origin': '*'}})
      .then((response) => {
        // this.newsList = response.data;  
        this.showList = response.data
        console.log(response)
      });
            console.log(this.page)
        }
    }
}
</script>