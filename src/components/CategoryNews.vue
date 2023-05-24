<template>
    <div class="container">
        <h1>{{this.naziv}}</h1>
        <div v-for="(news,index) in newsList" :key="index">
            <News :news="news"></News>
        </div>
    </div>
</template>

<script>
import News from './News.vue';
export default {
    name:"CategoryComponent",
    components:{
        News
    },
    data(){
        return {
            naziv:'',
            newsList:[]
        }
    },
    created() {
        this.naziv = this.$route.params.category;
        this.$axios.get(`/api/news/category/${this.naziv}`, { headers: {'Access-Control-Allow-Origin': '*'}})
        .then((response) => {
            this.newsList = response.data;
        });
  },watch: {
    '$route.params.category': function(newCategory) {
      this.naziv = newCategory;
      this.$axios.get(`/api/news/category/${this.naziv}`, { headers: {'Access-Control-Allow-Origin': '*'}})
      .then((response) => {
        this.newsList = response.data;
      });
    }
  },
}
</script>