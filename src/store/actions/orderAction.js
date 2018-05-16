// import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: 'PURCHASE_BURGER_SUCCESS',
        orderId: id,
        orderData: orderData
    };
};

export const purchaseBurgerFail = (error) => {
    return {
        type: 'PURCHASE_BURGER_FAIL',
        error: error
    };
};

export const purchaseBurgerStart = () => {
    return {
        type: 'PURCHASE_BURGER-START'
    }
}

export const purchaseBurger = (orderData) => {
    return dispatch => {
        //Lancement de la fonction pour le spinner avec loading => true
        dispatch(purchaseBurgerStart())
        //Envoi vers la base de données
        axios.post('/orders.json', orderData)
        .then(response => {
            dispatch(purchaseBurgerSuccess(response.data.name, orderData ) );
        } )
        .catch(error => {
            dispatch(purchaseBurgerFail(error) );
        } );
    }
};

export const purchaseInit = () => {
    return {
        type: 'PURCHASE_INIT'
    };
};