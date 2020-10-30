import * as actionsTypes from "../actions/actionsTypes";

const initialState = {
    orders: [],
    loading: false,
    purchased: false,
    loadingOrders: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.id,
            };
            return {
                ...state,
                loading: false,
                purchased: true,
                orders: state.orders.concat(newOrder),
            };

        case actionsTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading: false,
            };
        case actionsTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true,
            };
        case actionsTypes.PURCHASE_BURGER_INIT:
            return {
                ...state,
                purchased: false,
            };
        case actionsTypes.FETCH_ORDERS_START:
            return {
                ...state,
                loadingOrders: true,
            };
        case actionsTypes.SET_ORDERS:
            console.log("orders seteadas por fetch!!!!");
            return {
                ...state,
                loadingOrders: false,
                orders: action.orders,
            };
        case actionsTypes.SHOW_ERROR_FETCHING_ORDERS:
            return {
                ...state,
                loadingOrders: false,
            };

        default:
            return state;
    }
};

export default reducer;
