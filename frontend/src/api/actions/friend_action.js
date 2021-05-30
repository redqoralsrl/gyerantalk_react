import axios from 'axios';

const SEARCH_USER = "search_user";
const ADD_USER = "add_user";
const SHOW_FRIEND = 'show_friend';

export function searchFriend(dataToSubmit){
    const request = axios.post('/api/users/friendSearch',dataToSubmit)
    .then(response => response.data)

    return {
        type : SEARCH_USER,
        payload : request
    }
}

export function friendAdd(dataToSubmit){
    const request = axios.post('/api/users/addFriend',dataToSubmit)
    .then(response => response.data)

    return {
        type : ADD_USER,
        payload : request
    }
}

export function getFriendList(dataToSubmit){
    const request = axios.post('/api/users/showList',dataToSubmit)
    .then(response => response.data)

    return {
        type : SHOW_FRIEND,
        payload : request
    }
}
