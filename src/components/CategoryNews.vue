<template>
    <div class="container">
        <h1>{{this.naziv}}</h1>
        <div v-for="(news,index) in showList" :key="index" @click="switchToNews(news)">
            <News :news="news"></News>
        </div>
        <pagination v-model="page" :records="newsList.length" :per-page="3" @paginate="onChangePage"></pagination>
        <!-- <jw-pagination :items="newsList" @changePage="onChangePage"></jw-pagination> -->
        <!-- <Pagination></Pagination> -->
    </div>
</template>

<script>
import News from './News.vue';
// import Pagination from './Pagination.vue'
import Pagination from 'vue-pagination-2'

export default {
    name:"CategoryComponent",
    components:{
        News,
        Pagination
    },
    data(){
        return {
            naziv:'',
            newsList:[],
            showList:[],
            page:1,
        }
    },
    created() {
        this.naziv = this.$route.params.category;
        this.$axios.get(`/api/news/category/${this.naziv}`, { headers: {'Access-Control-Allow-Origin': '*'}})
        .then((response) => {
            this.newsList = response.data;
        });

        this.$axios.get(`/api/news/category/${this.naziv}/page/${this.page}`, { headers: {'Access-Control-Allow-Origin': '*'}})
      .then((response) => {
        // this.newsList = response.data;  
        this.showList = response.data
        console.log(response)
      });
  },watch: {
    '$route.params.category': function(newCategory) {
      this.page = 1
      this.naziv = newCategory;
      this.$axios.get(`/api/news/category/${this.naziv}`, { headers: {'Access-Control-Allow-Origin': '*'}})
      .then((response) => {
        this.newsList = response.data;
      });

      this.$axios.get(`/api/news/category/${this.naziv}/page/${this.page}`, { headers: {'Access-Control-Allow-Origin': '*'}})
      .then((response) => {
        // this.newsList = response.data;  
        this.showList = response.data
        console.log(response)
      });
    }


  },
  methods:{
    onChangePage(pageOfItems) {
            // update page of items

            this.page = pageOfItems;
            console.log(pageOfItems)
            this.$axios.get(`/api/news/category/${this.naziv}/page/${this.page}`, { headers: {'Access-Control-Allow-Origin': '*'}})
      .then((response) => {
        // this.newsList = response.data;  
        this.showList = response.data
        console.log(response)
      });
            console.log(this.page)
        },
        switchToNews(newsToShow) {
        console.log(newsToShow)
        this.$router.push({path:'/news/' + newsToShow.id}); console.log('a')
      }
  }
}
</script>