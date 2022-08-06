import { createStore } from 'vuex'
import BookService from '../services/book-service';

export default createStore({

  // data

  state: {
    books: []
  },

  // computed properties for stores

  getters: {
  },

  // methods that can change state data, only sychronous code
  // mutations expect two arguments: state and payload
  // commit a mutation

  mutations: {
    getBooks(state, books) {
      state.books = books;
    }
  },

  // methods that cannot change state data, asychronous code (e.g. api calls)
  // receive a context object which contains mutations, state, getters, actions
  // dispach an action

  actions: {
    getBooks({ commit }) {
      console.log('action -> getBooks')

      return new Promise((resolve, reject) => {

        BookService.getBooks()
          .then(response => {
            console.log('success')
            commit('getBooks', response.data)
            resolve();
          })
          .catch(error => {
            console.log('error')
            reject(error);
          })
      })
    }
  },
  modules: {
  }
})
