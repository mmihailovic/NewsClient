import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../pages/HomePage.vue'),
    props:true,
    children: [
      {
        path: 'home',
        component: () => import(/* webpackChunkName: "about" */ '../components/LatestNews.vue')
      },{
        path: 'category/:category',
        component: () => import(/* webpackChunkName: "about" */ '../components/CategoryNews.vue')
      },{
        path: 'news/:id',
        component: () => import(/* webpackChunkName: "about" */ '../components/CompleteNews.vue'),
        props:true
      },
      {
        path: 'najcitanije',
        component: () => import(/* webpackChunkName: "about" */ '../components/Najcitanije.vue')
      },
      {
        path: 'tag/:tag',
        component: () => import(/* webpackChunkName: "about" */ '../components/TagNews.vue')
      }
    ],
  },
  {
    path: '/cms',
    name: 'CMS',
    meta: {
      authRequired: true,
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../pages/CMS.vue'),
    children: [
      {
        path:'vesti',
        meta: {
          authRequired: true,
        },
        component: () => import(/* webpackChunkName: "about" */ '../components/AllNews.vue'),
      },
      {
        path:'vesti/add',
        meta: {
          authRequired: true,
        },
        component: () => import(/* webpackChunkName: "about" */ '../components/NewsForm.vue'),
      },
      {
        path:'vesti/edit',
        meta: {
          authRequired: true,
        },
        component: () => import(/* webpackChunkName: "about" */ '../components/NewsEditForm.vue'),
      },
      {
        path:'kategorije',
        meta: {
          authRequired: true,
        },
        component: () => import(/* webpackChunkName: "about" */ '../components/AllCategories.vue')
      },
      {
        path:'kategorije/add',
        meta: {
          authRequired: true,
        },
        component: () => import(/* webpackChunkName: "about" */ '../components/CategoryForm.vue')
      },
      {
        path:'kategorije/edit',
        meta: {
          authRequired: true,
        },
        component: () => import(/* webpackChunkName: "about" */ '../components/CategoryEditForm.vue')
      },
      {
        path:'kategorije/:kategorija',
        meta: {
          authRequired: true,
        },
        component: () => import(/* webpackChunkName: "about" */ '../components/AllNewsForCategory.vue')
      },
      {
        path:'korisnici',
        meta: {
          authRequired: true,
        },
        component: () => import(/* webpackChunkName: "about" */ '../components/AllUsers.vue')
      },
      {
        path:'korisnici/add',
        meta: {
          authRequired: true,
        },
        component: () => import(/* webpackChunkName: "about" */ '../components/UserForm.vue')
      },
      {
        path:'korisnici/edit',
        meta: {
          authRequired: true,
        },
        component: () => import(/* webpackChunkName: "about" */ '../components/UserEditForm.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../components/Login.vue')
  },

]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.authRequired) {
    const jwt = localStorage.getItem('jwt');

    if (!jwt) {
      console.log('nema jwt')
      next("/login");
      return;
    }
  }

  next();
});

export default router
