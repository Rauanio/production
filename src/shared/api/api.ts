import axios from 'axios';

const USER_LOCALSTORAGE_KEY = 'user';

export const $api = axios.create({
    baseURL: __API__,
    headers: {
        authorization: localStorage.getItem(USER_LOCALSTORAGE_KEY) || '',
    },
});
