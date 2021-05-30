import axios from 'axios';

const GET_POSTS = 'get_posts';
const CREATE_POST = 'create_post';
const UPDATE_POST = 'update_post';
const VIEW_POST = 'view_post';
const DELETE_POST = 'delete_post';

export function getPosts(){
    const request = axios.get('/api/posts')
    .then(response => response.data)

    return {
        type : GET_POSTS,
        payload : request
    }
}
export function createPost(datatoSubmit){
    const request = axios.post('/api/posts', datatoSubmit)
    .then(response => response.data)

    return {
        type : CREATE_POST,
        payload : request
    }
}
export function updatePost(datatoSubmit){
    console.log('updatepost data', datatoSubmit);
    const request = axios.post(`/api/posts/${datatoSubmit.selection}`, datatoSubmit)
    .then(response => response.data)

    return {
        type : UPDATE_POST,
        payload : request
    }
}
export function viewPost(datatoSubmit){
    console.log('action process', datatoSubmit);
    const request = axios.get(`/api/posts/${datatoSubmit.selection}`, datatoSubmit)
    .then(response => response.data)

    return {
        type : VIEW_POST,
        payload : request
    }
}
export function deletePost(datatoSubmit){
    const request = axios.delete(`/api/posts/${datatoSubmit.selection}`, datatoSubmit)
    .then(response => response.data)

    return {
        type : DELETE_POST,
        payload : request
    }
}