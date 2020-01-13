import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://zipgaelia.firebaseio.com/'
});

export default instance;