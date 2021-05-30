import axios from 'axios';

const GET_USER = "get_user";

export function getUser(dataToSubmit){
    const request = axios.get('/api/users/get')
    .then(response => response.data)

    return {
        type : GET_USER,
        payload : request
    }
}