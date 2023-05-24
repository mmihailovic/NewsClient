<template>
    <div class="container">
        <h1>NEWS</h1>
        <div v-for="(news,index) in newsList" :key="index">
            <News :news="news"></News>
        </div>
    </div>
  </template>
  
  <script>
  import News from "../components/News";
  
  export default {
    components: {News},
    data() {
      return {
        newsList: []
      }
    },
    created() {
      this.$axios.get('/api/news/page/1', { headers: {'Access-Control-Allow-Origin': '*'}})
      .then((response) => {
        this.newsList = response.data;
      });
    },
  }
  </script>