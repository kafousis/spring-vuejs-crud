# Spring - Vue.js CRUD example
A Vue.js application which performs CRUD operations.

## The Books REST API
The Vue.js application makes REST calls to the [Books REST API](https://github.com/kafousis/books-rest-api) and performs the following CRUD operations:
- Get saved books
- Create new book
- Update existing book
- Delete existing book

## Software Stack
- Vue.js 3
- PrimeVue
- PrimeFlex
- Vue Router
- Vuex state management
- Axios HTTP Client
- Vuelidate 2

> The project was built with Node v16 and Vue CLI v5.0.8.

## Run project
```
npm install
npm run serve
```

> The application runs at port 3000 by default. In order for the application to be able to reach the Books REST API, **if you used any port other than 8080**, you need to change the [vue.config.js file](https://github.com/kafousis/spring-vuejs-crud/blob/main/vue.config.js) according to the appropriate IP and port.