import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../pages/HomePage.vue'),
    children: [
      {
        path: 'home',
        component: () => import(/* webpackChunkName: "about" */ '../components/AllNews.vue')
      },{
        path: 'category/:category',
        component: () => import(/* webpackChunkName: "about" */ '../components/CategoryNews.vue')
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
    component: () => import(/* webpackChunkName: "about" */ '../pages/CMS.vue')
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
