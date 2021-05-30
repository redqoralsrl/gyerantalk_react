const CHAT_SERVER = 'chat_server';
const AFTER_POST_MESSAGE = 'after_post_message';
const CHECK_CHAT = 'check_chat';

export default function(state={},action){
    switch(action.type){
        case CHAT_SERVER:
            return { ...state, chats: action.payload }
        case AFTER_POST_MESSAGE:
                return { ...state, chats: state.chats.concat(action.payload) }
        case CHECK_CHAT:
                return { ...state, check: action.payload }
        default:
            return state;
    }
}