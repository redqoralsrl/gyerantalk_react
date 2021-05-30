const SOCKET_SEND = 'socket_send';
const SOCKET_RECEIVE = 'socket_receive';
const SOCKET_LIST = 'socket_list';
const SOCKET_CHATINFORM = 'socket_chatinform';
const SOCKET_FRIEND_PROFILE = 'socket_profile';
const SOCKET_COUNT = 'socket_count';
const SOCKET_ALL = 'socket_all';

export default function(state={}, action){
    switch (action.type) {
        case SOCKET_SEND:
            return {...state, chats: action.payload }
        // case SOCKET_RECEIVE:
        //     let newChatList = state.chatList.slice();
        //     newChatList.push(action.data);
        //     return { ...state, chatList: newChatList };
        case SOCKET_LIST:
            return {...state, list: action.payload }
        case SOCKET_CHATINFORM:
            return {...state, inform: action.payload}
        case SOCKET_FRIEND_PROFILE:
            return {...state, indid: action.payload}
        case SOCKET_COUNT:
            return {...state, count : action.payload}
        case SOCKET_ALL:
            return {...state, ass : action.payload}
        default:
            return state;
    }
}