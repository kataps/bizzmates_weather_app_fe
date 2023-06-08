import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css'
import '@/assets/style.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import jQuery from "jquery";
window.$  = jQuery;

import AOS from 'aos'
import 'aos/dist/aos.css'


createApp(App)
    .use(router)
    .use(AOS.init)
    .mount('#app');

import "bootstrap/dist/js/bootstrap.js"