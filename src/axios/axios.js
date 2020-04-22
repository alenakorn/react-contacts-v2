import axios from 'axios';

export default axios.create({
    baseURL: 'https://react-contacts-7eb9f.firebaseio.com/'
})