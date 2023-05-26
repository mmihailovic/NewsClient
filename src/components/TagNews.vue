<template>
    <div class="container">
        <h1>{{this.naziv}}</h1>
        <div v-for="(news,index) in showList" :key="index" @click="switchToNews(news)">
            <News :news="news"></News>
        </div>
        <pagination v-model="page" :records="newsList.length" :per-page="3" @paginate="onChangePage"></pagination>
    </div>
</template>

<script>
import News from './News.vue';
import Pagination from 'vue-pagination-2'

export default {
    name:"TagNews",
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
        this.naziv = this.$route.params.tag;
        this.$axios.get(`/api/news/tag/${this.naziv}`, { headers: {'Access-Control-Allow-Origin': '*'}})
        .then((response) => {
            this.newsList = response.data;
        });

        this.$axios.get(`/api/news/tag/${this.naziv}/page/${this.page}`, { headers: {'Access-Control-Allow-Origin': '*'}})
      .then((response) => {
        // this.newsList = response.data;  
        this.showList = response.data
        console.log(response)
      });
  },watch: {
    '$route.params.tag': function(newCategory) {
      this.naziv = newCategory;
      this.$axios.get(`/api/news/tag/${this.naziv}`, { headers: {'Access-Control-Allow-Origin': '*'}})
      .then((response) => {
        this.newsList = response.data;
      });

      this.$axios.get(`/api/news/tag/${this.naziv}/page/${this.page}`, { headers: {'Access-Control-Allow-Origin': '*'}})
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
            this.$axios.get(`/api/news/tag/${this.naziv}/page/${this.page}`, { headers: {'Access-Control-Allow-Origin': '*'}})
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