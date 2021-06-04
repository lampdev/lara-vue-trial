require('./bootstrap');

import Vue from 'vue'
import App from './AppBase.vue'
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import VueRouter from 'vue-router';
import router from '@/router';

import ErrorHandler from '@/errorsHandler';
import Request from '@/request';
import Swal from 'sweetalert2';

Vue.use(VueRouter);
Vue.use(ErrorHandler);

Vue.use(Request)

Vue.use({
    install (Vue, options) {
        Vue.prototype.$alert = text => Swal.fire({
            title: 'Error!',
            text,
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
});

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
