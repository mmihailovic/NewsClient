<template>
    <div class="container news">
  <h2 class="news-title">{{news.title}}</h2>
  <p class="news-meta">{{formatDate(news.date)}} | {{ news.category }}</p>
  <p class="news-content">{{ news.text | shortText}}</p>
</div>
</template>

<script>
export default {
    name:"NewsComponent",
    props: {
      news: {
        type: Object,
        required: true,
      },
    },
    methods: {
      formatDate(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleString('en-US');
      }
    },
    filters: {
      shortText(value) {
        if (value.length < 10) {
          return value;
        }
        return value.slice(0, 10) + '...'
      }
    }
}
</script>

<style scoped>
.news {
  background-color: #f1f1f1;
  padding: 10px;
  margin-bottom: 20px;
}

.news-title {
  font-size: 24px;
  margin-bottom: 5px;
}

.news-meta {
  font-size: 14px;
  color: #888;
  margin-bottom: 5px;
}

.news-content {
  font-size: 16px;
}
</style>