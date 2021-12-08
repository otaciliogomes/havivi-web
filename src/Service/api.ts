import axios from 'axios';

const api = axios.create({
    baseURL: "https://havivi-back-end.herokuapp.com"
});

export default api