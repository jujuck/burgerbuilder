//import * as actionTypes from '../actions/actionTypes;

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'PURCHASE_BURGER_SUCCESS':
            const newOrder = {
                ...action.orderData,
                id: action.orderid
            };
            return {
                ...state,
                loading: false,
                orders: state.orders.concat(newOrder),
                purchased: true
            };
        case 'PURCHASE_BURGER_FAIL':
            return {
                ...state,
                loading: false,
            };
        case 'PURCHASE_BURGER-START':
            return {
                ...state,
                loading: true
            };
        case 'PURCHASE_INIT':
            return {
                ...state,
                purchased: false

            }
        default: return state;
    }
};

export default orderReducer;