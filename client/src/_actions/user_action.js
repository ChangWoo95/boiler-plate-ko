import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from './types';

export function loginUser(dataToSubmit) {

    //해당 정보값들을 서버로 보냄
    const request = axios.post('/api/users/login', dataToSubmit)
        .then(response => response.data)
    return { //nextstate를 위해 reducer에 보냄
        type: LOGIN_USER,
        payload: request
    }
}

export function registerUser(dataToSubmit) {

    //해당 정보값들을 서버로 보냄
    const request = axios.post('/api/users/register', dataToSubmit)
        .then(response => response.data)
    return { //nextstate를 위해 reducer에 보냄
        type: REGISTER_USER,
        payload: request
    }
}

export function auth() {

    //해당 정보값들을 서버로 보냄
    const request = axios.get('/api/users/auth')
        .then(response => response.data)
    return { //nextstate를 위해 reducer에 보냄
        type: AUTH_USER,
        payload: request
    }
}