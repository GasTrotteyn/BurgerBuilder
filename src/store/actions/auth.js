import axios from "axios";

import * as actionTypes from "./actionsTypes";
import info from "../apiKey.json";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    };
};

export const authSuccess = (token, userId) => {
    //esero tener un token y pasarlo al store
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId,
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
    };
};

export const auth = (email, password, isSignUp) => {
    return (dispatch) => {
        //acá llamré al backend y devolveré el token con authSuccess
        dispatch(authStart());
        const apiKey = info.apiKey;
        const data = {
            email: email,
            password: password,
            returnSecureToken: true,
        };
        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
        if (!isSignUp) {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
        }
        axios
            .post(url + apiKey, data)
            .then((resp) => {
                console.log(resp);
                dispatch(authSuccess(resp.data.idToken, resp.data.localId));
            })
            .catch((error) => {
                dispatch(authFail(error.response.data.error));
            });
    };
};
