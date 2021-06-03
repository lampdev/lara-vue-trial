require('./bootstrap');

import Vue from 'vue'
import App from './AppBase.vue'
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import VueRouter from 'vue-router';
import router from '@/router';

Vue.use(VueRouter);

Vue.use({
    install (Vue, options) {
        const auth = window.localStorage.getItem('authToken');

        const config = {
            withCredentials: true,
        };

        if (auth !== null) {
            config.headers = {
                Authorization: `Bearer ${auth}`
            }
        }

        Vue.prototype.$request = axios.create(config);
    }
})

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
