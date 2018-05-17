//import * as actionTypes from './actionTypes;
import axios from 'axios';


//Création des fonctions créator
export const authStart = () => {
    return {
        type: 'AUTH_START'
    };
};

export const authSuccess = (authData) => {
    return {
        type: 'AUTH_SUCCESS',
        authData: authData
    };
};

export const authFail = (error) => {
    return {
        type: 'AUTH_FAIL',
        error: error
    };
};

export const auth = (email, password) => {
    return dispatch => {
        //Mise en place du spinner d'attent
        dispatch(authStart());
        console.log(email)
        console.log(password)
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDRXL-iI84DmIofhBfYXxaLKM4POItRLlo', authData)
        //Gestion de l'authentification réussie
        .then(response => {
            console.log(response)
            dispatch(authSuccess(response.data));
        })
        //Gestion de l'erreur
        .catch(err => {
            console.log(err);
            dispatch(authFail());
        })
    }
}