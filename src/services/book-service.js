import axios from 'axios';

class BookService {

    getBooks() { return axios.get('/api/books?size=200&projection=bookDetail&sort=title,asc') }

    deleteBook(bookId) { return axios.delete('/api/books/' + bookId) }

    createBook(book) { return axios.post('/api/books/', book) }

    updateBook(book, bookId) { return axios.patch('/api/books/' + bookId, book) }
}

export default new BookService();