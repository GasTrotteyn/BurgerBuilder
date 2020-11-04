import * as actionTypes from "../actions/actionsTypes";
import { updatedObject } from "../utillity";
const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
};

const authStart = (state, action) => {
    return updatedObject(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
    return updatedObject(state, {
        token: action.token,
        userId: action.userId,
        loading: false,
        error: null,
    });
};

const authFail = (state, action) => {
    return updatedObject(state, { error: action.error, loading: false, token: null });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state, action);
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        case actionTypes.AUTH_FAIL:
            return authFail(state, action);
        default:
            return state;
    }
};

export default reducer;