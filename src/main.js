// https://www.primefaces.org/primevue/setup

import 'primevue/resources/themes/nova-vue/theme.css'   //theme
import 'primevue/resources/primevue.min.css'            //core css
import 'primeicons/primeicons.css'                      //icons
import 'primeflex/primeflex.css';                       // primeflex

import axios from 'axios';
// becase of CORS error we need to have the same origin
// requests are sent to backend server (see vue.config.js)
axios.defaults.baseURL = 'http://localhost:3000';

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import PrimeVue from 'primevue/config';
import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Message from 'primevue/message';

const app = createApp(App);

app.use(router);
app.use(store);

// ripple is an optional animation for the supported components
// Outlined & Filled Input Styles, add {inputStyle: 'filled'}
app.use(PrimeVue, { ripple: true })

app.component('Toolbar', Toolbar);
app.component('Button', Button);
app.component('Card', Card);
app.component('Message', Message);

app.mount('#app');