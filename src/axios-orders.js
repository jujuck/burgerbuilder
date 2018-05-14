import axios from 'axios';

const Instance = axios.create ({
    baseURL: 'https://burgerbuilder-19bad.firebaseio.com/ '
});

export default Instance;