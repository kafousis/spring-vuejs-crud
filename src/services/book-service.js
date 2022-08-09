import axios from 'axios';

class BookService {

    getBooks() { return axios.get('/api/books?size=200&projection=bookDetail&sort=title,asc') }

    deleteBook(bookId) { return axios.delete('/api/books/' + bookId) }
}

export default new BookService();