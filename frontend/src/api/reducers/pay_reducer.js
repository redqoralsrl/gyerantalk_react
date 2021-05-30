const PAY_READY = 'pay_ready';

export default function(state={}, action){
    switch (action.type) {
        case PAY_READY:
            return {...state, readyToPay: action.payload};
        default:
            return state;
    }
}