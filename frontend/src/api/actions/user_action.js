import axios from 'axios';

const LOGIN_USER = "login_user";
const REGISTER_USER = "register_user";
const AUTH_USER = "auth_user";
const CHECK_ID = 'checkid_user';
const CHECK_NICK = 'checknick_user';
const CHECK_PHONE = 'checkphone_user';
const UPDATE_USER = 'update_user';

export function loginUser(dataToSubmit){
    const request = axios.post('/api/users/login',dataToSubmit)
    .then(response => response.data)

    return {
        type : LOGIN_USER,
        payload : request
    }
}

export function registerUser(dataToSubmit){
    const request = axios.post('/api/users/register',dataToSubmit)
    .then(response => response.data)

    return {
        type : REGISTER_USER,
        payload : request
    }
}

export function auth(dataToSubmit){
    const request = axios.get('/api/users/auth')
    .then(response => response.data)

    return {
        type : AUTH_USER,
        payload : request
    }
}

export function checkId(dataToSubmit){
    const request = axios.post('/api/users/checkId',dataToSubmit)
    .then(response => response.data)
    
    return {
        type : CHECK_ID,
        payload : request
    }
}

export function checkNick(dataToSubmit){
    const request = axios.post('/api/users/checkNick',dataToSubmit)
    .then(response => response.data)
    
    return {
        type : CHECK_NICK,
        payload : request
    }
}

export function checkPhone(dataToSubmit){
    const request = axios.post('/api/users/checkPhone',dataToSubmit)
    .then(response => response.data)
    
    return {
        type : CHECK_PHONE,
        payload : request
    }
}

export function updateUser(dataToSubmit){
    const request = axios.post('/api/users/updateUser',dataToSubmit)
    .then(response => response.data)
    
    return {
        type : UPDATE_USER,
        payload : request
    }
}
