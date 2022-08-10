require('./bootstrap');

window.Vue = require('vue').default;
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.component('todo', require('./components/Todo.vue').default);

Vue.use(VueAxios, axios)

const app = new Vue({
    el: '#app',
});
