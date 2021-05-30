import axios from 'axios';

const CHAT_SERVER = 'chat_server';
const AFTER_POST_MESSAGE = 'after_post_message';
const GET_FRIEND = 'get_friend';
const CHECK_CHAT = 'check_chat';

export function getChats(dataToSubmit){
    const request = axios.post('/api/chats/getChat', dataToSubmit)
    .then(response => response.data)

    return {
        type : CHAT_SERVER,
        payload : request
    }
}

export function afterPostMessage(data){

    return {
        type: AFTER_POST_MESSAGE,
        payload: data
    }
}

export function getFriend(data){
    const request = axios.post('/api/chats/friend', data)
        .then(response => response.data)

    return {
        type : GET_FRIEND,
        payload : request
    }
}

export function checkMember(data){
    const request = axios.post('/api/chats/checkMember', data)
        .then(response => response.data)

    return {
        type : CHECK_CHAT,
        payload : request
    }
}