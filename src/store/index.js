import { createStore } from 'vuex'
import BookService from '../services/book-service';
import AuthorService from '../services/author-service';
import GenreService from '../services/genre-service';
import PublisherService from '../services/publisher-service';

export default createStore({

  // data

  state: {
    books: [],
    selectedBook: null,
    messageSeverity: 'info',
    messageContent: 'Loading...',
    displayDeleteBookDialog: false,

    authors: [],
    firstAuthor: null,
    secondAuthor: null,

    genres: [],
    genre: null,

    publishers: [],
    publisher: null,

    isSaveBtnDisabled: false
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
    },
    updateAuthors(state, authors) {
      state.authors = authors;
    },
    selectFirstAuthor(state, author) {
      state.firstAuthor = author;
    },
    selectSecondAuthor(state, author) {
      state.secondAuthor = author;
    },
    updateGenres(state, genres) {
      state.genres = genres;
    },
    selectGenre(state, genre) {
      state.genre = genre;
    },
    updatePublishers(state, publishers) {
      state.publishers = publishers;
    },
    selectPublisher(state, publisher) {
      state.publisher = publisher;
    },
    setSaveBtnDisabled(state, disabled) {
      state.isSaveBtnDisabled = disabled;
    }
  },

  // methods that cannot change state data, asychronous code (e.g. api calls)
  // receive a context object which contains mutations, state, getters, actions
  // dispach an action

  actions: {
    getBooks({ commit }) {

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
    },
    getAuthors({ commit }) {

      AuthorService.getAuthors()
        .then(response => {
          console.log(response)
          commit('updateAuthors', response.data['_embedded']['authors']);
        })
        .catch(error => {
          commit('updateMessageSeverity', 'error');
          commit('updateMessageContent', error);
          commit('setSaveBtnDisabled', true);
        })
    },
    getGenres({ commit }) {

      GenreService.getGenres()
        .then(response => {
          console.log(response)
          commit('updateGenres', response.data['_embedded']['genres']);
        })
        .catch(error => {
          commit('updateMessageSeverity', 'error');
          commit('updateMessageContent', error);
          commit('setSaveBtnDisabled', true);
        })
    },
    getPublishers({ commit }) {

      PublisherService.getPublishers()
        .then(response => {
          console.log(response)
          commit('updatePublishers', response.data['_embedded']['publishers']);

          commit('updateMessageSeverity', 'success');
          commit('updateMessageContent', 'Ready to save');
        })
        .catch(error => {
          commit('updateMessageSeverity', 'error');
          commit('updateMessageContent', error);
          commit('setSaveBtnDisabled', true);
        })
    },
  },

  // computed properties for stores

  getters: {
  },
  modules: {
  }
})
