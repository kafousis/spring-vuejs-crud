import { createStore } from 'vuex'
import router from "../router";
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
    genres: [],
    publishers: [],

    isSaveBtnDisabled: false,
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
    selectBookById(state, id) {
      if (id == 0) {
        state.selectedBook = { "publisherDetails": {}, "genreDetails": {}, "authorsDetails": [{}] }
        state.isSaveBtnDisabled = false
      } else {

        // in case of refresh state.books.length == 0
        if (state.books.length > 0) {
          state.selectedBook = state.books.find(book => book.id === id);
          state.isSaveBtnDisabled = false
        } else {
          state.selectedBook = { "publisherDetails": {}, "genreDetails": {}, "authorsDetails": [{}] };
          state.isSaveBtnDisabled = true;
        }
        //console.log(state.selectedBook)
      }
    },
    updateAuthors(state, authors) {
      state.authors = authors;
    },
    updateGenres(state, genres) {
      state.genres = genres;
    },
    updatePublishers(state, publishers) {
      state.publishers = publishers;
    },
    updateTitle(state, title) {
      state.selectedBook.title = title;
    },
    updateFirstAuthor(state, authorId) {
      state.selectedBook.authorsDetails[0].id = authorId;
      delete state.selectedBook.authorsDetails[0].fullName
      delete state.selectedBook.authorsDetails[0].country
      //console.log(state.selectedBook)
    },
    updateSecondAuthor(state, authorId) {
      if (state.selectedBook.authorsDetails.length == 2) {
        state.selectedBook.authorsDetails[1].id = authorId;
        delete state.selectedBook.authorsDetails[1].fullName
        delete state.selectedBook.authorsDetails[1].country
        //console.log(state.selectedBook)
      } else {
        const author = { "id": authorId }
        // add author at the end
        state.selectedBook.authorsDetails.push(author);
        //console.log(state.selectedBook)
      }
    },
    updateGenre(state, genreId) {
      state.selectedBook.genreDetails.id = genreId
      delete state.selectedBook.genreDetails.name;
    },
    updateIsbn(state, isbn) {
      state.selectedBook.isbn = isbn;
    },
    updatePublisher(state, publisherId) {
      state.selectedBook.publisherDetails.id = publisherId
      delete state.selectedBook.publisherDetails.name;
      delete state.selectedBook.publisherDetails.country;
    },
    updateTotalPages(state, totalPages) {
      state.selectedBook.totalPages = totalPages;
    },
    updatePublishedYear(state, publishedYear) {
      state.selectedBook.publishedYear = publishedYear;
    },
    updateReferenceUris(state, { authorsUris, genreUri, publisherUri }) {
      state.selectedBook.authors = authorsUris
      state.selectedBook.genre = genreUri
      state.selectedBook.publisher = publisherUri
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

      commit('updateMessageSeverity', 'info');
      commit('updateMessageContent', 'Loading...');

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

      commit('updateMessageSeverity', 'info');
      commit('updateMessageContent', 'Loading...');

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

      commit('updateMessageSeverity', 'info');
      commit('updateMessageContent', 'Loading...');

      AuthorService.getAuthors()
        .then(response => {
          //console.log(response)
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
          //console.log(response)
          commit('updateGenres', response.data['_embedded']['genres']);
        })
        .catch(error => {
          commit('updateMessageSeverity', 'error');
          commit('updateMessageContent', error);
          commit('setSaveBtnDisabled', true);
        })
    },
    getPublishers({ state, commit }) {

      PublisherService.getPublishers()
        .then(response => {
          //console.log(response)
          commit('updatePublishers', response.data['_embedded']['publishers']);

          if (state.books.length > 0) {
            commit('updateMessageSeverity', 'success');
            commit('updateMessageContent', 'Ready to save');
          } else {
            // case of refresh
            commit('updateMessageSeverity', 'error');
            commit('updateMessageContent', 'State is lost. Please go back and try again.');
          }

        })
        .catch(error => {
          commit('updateMessageSeverity', 'error');
          commit('updateMessageContent', error);
          commit('setSaveBtnDisabled', true);
        })
    },
    updateBook({ state, commit }) {

      commit('updateMessageSeverity', 'info');
      commit('updateMessageContent', 'Loading...');

      const book = state.selectedBook

      BookService.updateBook(book, book.id)
        .then(() => {
          //console.log(response)
          commit('updateMessageSeverity', 'success');
          commit('updateMessageContent', 'Book with Id ' + book.id + ' has been updated');
        })
        .catch(error => {
          //console.log(error);
          commit('updateMessageSeverity', 'error');
          commit('updateMessageContent', error);
        })
    },
    createBook({ state, commit }) {

      commit('updateMessageSeverity', 'info');
      commit('updateMessageContent', 'Loading...');

      const book = state.selectedBook

      BookService.createBook(book)
        .then(() => {
          //console.log(response)
          commit('updateMessageSeverity', 'success');
          commit('updateMessageContent', 'Book has been created');
          router.push('/books')
        })
        .catch(error => {
          //console.log(error);
          commit('updateMessageSeverity', 'error');
          commit('updateMessageContent', error);
        })
    },
  },

  // computed properties for stores

  getters: {
  },
  modules: {
  }
})
