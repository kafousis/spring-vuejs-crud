import axios from 'axios';

class BookService {
    getBooks() { return axios.get('/api/books?size=200&projection=bookDetail&sort=title,asc') }
}

export default new BookService();