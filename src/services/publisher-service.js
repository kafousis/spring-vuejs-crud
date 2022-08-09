import axios from 'axios';

class PublisherService {
    getPublishers() { return axios.get('/api/publishers?size=50&sort=name,asc') }
}

export default new PublisherService();