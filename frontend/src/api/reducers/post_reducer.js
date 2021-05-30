const GET_POSTS = 'get_posts';
const CREATE_POST = 'create_post';
const VIEW_POST = 'view_post'
const UPDATE_POST = 'update_post';

export default function(state={}, action){
    switch (action.type) {
        case GET_POSTS:
            return {...state, posts : action.payload}
        case CREATE_POST:
            return {...state, post : action.payload}
        case VIEW_POST:
            return {...state, post : action.payload}
        case UPDATE_POST:
            return {...state, post : action.payload}
        default:
            return state;
    }
}