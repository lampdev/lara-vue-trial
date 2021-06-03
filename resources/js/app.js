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

        const client = axios.create(config);

        client.interceptors.response.use(
            response => {
                return response;
            },
            error => {
                if (error.response.status === 401 || error.response.status === 419) {
                    window.localStorage.removeItem('authToken');
                }

                return Promise.reject(error.response);
            }
        );

        Vue.prototype.$request = client;
    }
})

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
