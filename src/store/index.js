import { createStore } from 'vuex'
import BookService from '../services/book-service';

export default createStore({

  // data

  state: {
    books: [],
    messageSeverity: 'info',
    messageContent: 'Loading...',
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
    },
    updateMessageSeverity(state, severity) {
      state.messageSeverity = severity;
    },
    updateMessageContent(state, content) {
      state.messageContent = content;
    }
  },

  // methods that cannot change state data, asychronous code (e.g. api calls)
  // receive a context object which contains mutations, state, getters, actions
  // dispach an action

  actions: {
    getBooks({ commit }) {
      console.log('action -> getBooks')

      BookService.getBooks()
        .then(response => {
          console.log(response)
          commit('getBooks', response.data['_embedded']['books'])
          commit('updateMessageSeverity', 'success')
          commit('updateMessageContent', response.data['_embedded']['books'].length + ' books fetched')
        })
        .catch(error => {
          console.log(error)
          commit('updateMessageSeverity', 'error')
          commit('updateMessageContent', error)
        })
    }
  },
  modules: {
  }
})
