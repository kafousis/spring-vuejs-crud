import axios from 'axios';

class GenreService {
    getGenres() { return axios.get('/api/genres?size=30&sort=name,asc') }
}

export default new GenreService();