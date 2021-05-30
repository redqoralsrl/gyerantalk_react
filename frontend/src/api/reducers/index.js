import { combineReducers } from 'redux';
import user from './user_reducer';
import friend from './friend_reducer';
import chat from './chat_reducer';
import socket from './socket_reducer';
const rootReducer = combineReducers({
    user,
    friend,
    chat,
    socket
})

export default rootReducer;