import Vue from 'vue'
import App from './App.vue'
import './plugins/axios'
import router from './router'


Vue.config.productionTip = false
import Pagination from 'vue-pagination-2';
Vue.component('paginationComponent', Pagination);

Vue.filter('shortText', function(value) {
    if (value.length < 10) {
      return value;
    }
    return value.slice(0, 10) + '...'
})

Vue.prototype.formatDate = function(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleString('en-US');
};


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
