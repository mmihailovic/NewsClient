<template>
  <div v-if="news" class="container vest">
    <h2>{{news.title}}</h2>
    <p class="autor"> {{ news.author }}</p>
    <p class="datum">{{formatDate(news.date)}}</p>
    <p class="kategorija">{{ news.category }}</p>
    <p>{{ news.text}}</p>

    <form @submit.prevent="postComment">
  <div class="form-group">
    <label for="usernameInput">Username</label>
    <input type="text" v-model="username" class="form-control" id="usernameInput" aria-describedby="emailHelp" placeholder="Enter username">
  </div>
  <div class="form-group">
    <label for="commentInput">Comment</label>
    <input type="text" v-model="text" class="form-control" id="textInput" placeholder="Text">
  </div>
  <button type="submit" class="btn btn-primary">Add comment</button>
</form>
    <div v-if="comments && comments.length > 0">
      <h4>Comments</h4>
    <div v-for="(comm,index) in comments" :key="index" class="comment">
            <p class="author"> Author : {{ comm.autor }}</p>
            <p class="text"> Text: {{ comm.text }}</p>
            <p class="date"> Date: {{ formatDate(comm.date) }}</p>
        </div>
      </div>

      <div v-if="tags && tags.length > 0">
        <h4>Tags</h4>
        <div class="tag-container">
          <router-link v-for="(tag,index) in tags" :key="index" class="tag" :to="{ path: '/tag/' + tag.kljucnaRec }">{{ tag.kljucnaRec }}</router-link>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  name: "CompleteNews",
  data() {
    return {
      id:null,
      news:null,
      tags:null,
      comments:null,
      username:null,
      text:null
    }
  },
  created() {
    this.id = this.$route.params.id
    console.log(this.$route.params.id)
    this.$axios.get(`/api/news/${this.id}`, { headers: {'Access-Control-Allow-Origin': '*'}})
        .then((response) => {
            this.news = response.data;
            console.log(response.data)
        });

    this.$axios.get(`/api/tag/news/${this.id}`, { headers: {'Access-Control-Allow-Origin': '*'}})
    .then((response) => {
        this.tags = response.data;
        console.log(response.data)
    });

    this.$axios.get(`/api/comments/news/${this.id}`, { headers: {'Access-Control-Allow-Origin': '*'}})
    .then((response) => {
        this.comments = response.data;
        console.log(response.data)
    });
  },
  methods: {
    postComment() {
          console.log(this.username)
          console.log(this.text)
          this.$axios.post('/api/comments', {
            vest_id: this.news.id,
            text: this.text,
            autor: this.username
          }).then(() => {
            this.$axios.get(`/api/comments/news/${this.id}`, { headers: {'Access-Control-Allow-Origin': '*'}})
    .then((response) => {
        this.comments = response.data;
        console.log(response.data)
    });
          })
    }
  }

}
</script>

<style scoped>
  .comment {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}

.comment .author {
  font-weight: bold;
  margin-bottom: 5px;
}

.comment .text {
  margin-bottom: 5px;
}

.comment .date {
  font-size: 0.8rem;
  color: #888;
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

.vest {
  margin-bottom: 20px;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.vest h2 {
  font-size: 24px;
  margin-bottom: 10px;
  color: #333333;
}

.vest p {
  margin-bottom: 10px;
  color: #666666;
}

.vest .datum {
  font-size: 14px;
  font-style: italic;
  color: #999999;
}

.vest .autor {
  font-size: 16px;
  font-weight: bold;
  color: #333333;
}

.vest .kategorija {
  font-size: 16px;
  color: #888888;
}
</style>