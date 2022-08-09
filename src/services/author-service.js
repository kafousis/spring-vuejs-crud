import axios from 'axios';

class AuthorService {
    getAuthors() { return axios.get('/api/authors?size=100&sort=fullName,asc') }
}

export default new AuthorService();