import { createStore } from 'vuex'
import BookService from '../services/book-service';

export default createStore({

  // data

  state: {
    books: [],
    selectedBook: null,
    messageSeverity: 'info',
    messageContent: 'Loading...',
    displayDeleteBookDialog: false
  },

  // computed properties for stores

  getters: {
  },

  // methods that can change state data, only sychronous code
  // mutations expect two arguments: state and payload
  // commit a mutation

  mutations: {
    updateBooks(state, books) {
      state.books = books;
    },
    updateMessageSeverity(state, severity) {
      state.messageSeverity = severity;
    },
    updateMessageContent(state, content) {
      state.messageContent = content;
    },
    deleteBookDialogOpen(state, book) {
      state.selectedBook = book;
      state.displayDeleteBookDialog = true;
    },
    deleteBookDialogClose(state) {
      state.selectedBook = null;
      state.displayDeleteBookDialog = false;
    },
    deleteBookFromArray(state) {
      const index = state.books.findIndex(book => book.id === state.selectedBook.id);
      //console.log('Book index for deletion is ' + index);
      state.books.splice(index, 1);
    }
  },

  // methods that cannot change state data, asychronous code (e.g. api calls)
  // receive a context object which contains mutations, state, getters, actions
  // dispach an action

  actions: {
    getBooks({ commit }) {
      //console.log('action -> getBooks')

      BookService.getBooks()
        .then(response => {
          //console.log(response)
          commit('updateBooks', response.data['_embedded']['books']);
          commit('updateMessageSeverity', 'success');
          commit('updateMessageContent', response.data['_embedded']['books'].length + ' books fetched');
        })
        .catch(error => {
          //console.log(error)
          commit('updateMessageSeverity', 'error');
          commit('updateMessageContent', error);
        })
    },
    deleteBook({ state, commit }) {
      //console.log('action -> deleteBook')

      const bookId = state.selectedBook.id;

      BookService.deleteBook(bookId)
        .then(() => {
          //console.log(response)
          commit('deleteBookFromArray');
          commit('deleteBookDialogClose');

          commit('updateMessageSeverity', 'success');
          commit('updateMessageContent', 'Book with Id ' + bookId + ' has been deleted');
        })
        .catch(error => {
          //console.log(error);
          commit('updateMessageSeverity', 'error');
          commit('updateMessageContent', error);
        })
    }
  },
  modules: {
  }
})
