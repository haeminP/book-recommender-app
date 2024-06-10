import axios from 'axios';
const baseUrl = 'https://api.nytimes.com/svc/books/v3';

const api_key = process.env.REACT_APP_API_KEY;

const getGenres = () => {
    const request = axios.get(
        `${baseUrl}/lists/names.json?api-key=${api_key}`
    );
    return request.then((response) => response.data);
};

const getCurrentBestseller = (genre, date) => {
    const request = axios.get(
        `${baseUrl}/lists/${date}/${genre}.json?api-key=${api_key}`
    );
    return request.then((response) => response.data);
};

const services = {
    getGenres,
    getCurrentBestseller,
};

export default services;
