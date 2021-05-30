const SEARCH_USER = "search_user";
const ADD_USER = "add_user";
const SHOW_FRIEND = 'show_friend';

export default function(state={}, action){
    switch (action.type) {
        case SEARCH_USER:
            return {...state, friend : action.payload}
        case ADD_USER:
            return {...state, plus : action.payload}
        case SHOW_FRIEND:
            return {...state, Myfriend : action.payload}
        default:
            return state;
    }
}