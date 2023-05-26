<template>
    <div class="container">
        <h1>NEWS</h1>
        <div v-for="(news,index) in newsList" :key="index" @click="switchToNews(news)">
            <News :news="news"></News>
        </div>
    </div>
</template>

<script>
import News from './News.vue';
export default {
    name:"NajcitanijeComponent",
    components:{News},
    data() {
        return {
            newsList: []
        }
    },
    created() {
      this.$axios.get('/api/news/top10', { headers: {'Access-Control-Allow-Origin': '*'}})
      .then((response) => {
        this.newsList = response.data;
      });
    },
    methods:{
      switchToNews(newsToShow) {
        console.log(newsToShow)
        this.$router.push({path:'/news/' + newsToShow.id}); console.log('a')
      }
    }
}
</script>