//import * as actionTypes from './actionTypes;
import axios from 'axios';


//Création des fonctions créator
export const authStart = () => {
    return {
        type: 'AUTH_START'
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: 'AUTH_SUCCESS',
        idToken: token,
        userId: userId 
    };
};

export const authFail = (error) => {
    return {
        type: 'AUTH_FAIL',
        error: error
    };
};


//Envoie de la fonction de deconnexion
export const logout = () => {
    return {
        type: 'AUTH_LOGOUT'
    };
};

//Vérifiaction du temps de connexion pour le checkout et evnoie de la fonction de deconnexion
export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000)
    };
};

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        //Mise en place du spinner d'attent
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        //Vérification si l'utilisateur est connecté
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDRXL-iI84DmIofhBfYXxaLKM4POItRLlo'
        if (!isSignUp) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDRXL-iI84DmIofhBfYXxaLKM4POItRLlo'
        }

        axios.post(url, authData)
        //Gestion de l'authentification réussie
        .then(response => {
            console.log(response)
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(checkAuthTimeout(response.data.expiresIn))
        })
        //Gestion de l'erreur
        .catch(err => {
            console.log(err.response.data.error)
            dispatch(authFail(err.response.data.error));
        })
    }
}