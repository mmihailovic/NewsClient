<template>
    <div class="container">
        <h1>All news</h1>

        <button class="btn btn-primary" @click="openForm">Create user</button>

        <table class="table">
          <thead>
          <tr>
            <th scope="col">Ime</th>
            <th scope="col">Prezime</th>
            <th scope="col">Email</th>
            <th scope="col">Tip</th>
            <th scope="col">Edit</th>
            <th scope="col">Aktivacija</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(user,index) in usersList" :key="index">
            <td>{{ user.ime }}</td>
            <td>{{ user.prezime }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.tip }}</td>
            <td><button class="btn btn-success" @click="editNews(user)">Edit</button></td>
            <td v-if="user.tip === 'CONTENT_CREATOR'">
                <button v-if="user.aktivan === false" class="btn btn-success" @click="setStatus(user)">Aktiviraj</button>
                <button v-else class="btn btn-danger" @click="setStatus(user)">Deaktiviraj</button>
            </td>
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
            usersList:[]
        }
    },
    created() {
        this.$axios.get(`/api/users`, { headers: {'Access-Control-Allow-Origin': '*'}})
        .then((response) => {
            this.usersList = response.data;
        });
    },
    methods: {
        openForm() {
            this.$router.push('/cms/korisnici/add');
        },
        editNews(selectedNews) {
            console.log(selectedNews)
            this.$router.push({path:'/cms/korisnici/edit',query: { korisnik: JSON.stringify(selectedNews)}});
        },
        setStatus(user) {
            this.$axios.post(`/api/users/status`, {username:user.email, aktivan: !user.aktivan},{ headers: {'Access-Control-Allow-Origin': '*'}})
            .then(() => {
                this.$axios.get(`/api/users`, { headers: {'Access-Control-Allow-Origin': '*'}})
                .then((response) => {
                    this.usersList = response.data;
                });
            });
        }
    }
}
</script>