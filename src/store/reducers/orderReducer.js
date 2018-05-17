//import * as actionTypes from '../actions/actionTypes;
import updateObject from '../utility'; //updateObject
//import { fetchOrderStart } from '../actions/orderAction';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData, { id: action.orderid } );
            return updateObject( state, { 
                loading: false,
                orders: state.orders.concat(newOrder),
                purchased: true
            } );
}

const fetchOrdersSuccess = (state,action) => {
    return updateObject( state, { 
        loading: false, 
        orders: action.orders
    } );
}

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        //Récupération des données et envoie à la base de données
        case 'PURCHASE_BURGER_SUCCESS':
            return purchaseBurgerSuccess(state, action);

        //Gestion des erreurs lors de l'envoi à la base de données
        case 'PURCHASE_BURGER_FAIL':
            return updateObject( state, { loading: false, } );

        //Envoie du spinner d'attente  des données: gestion asynchrone
        case 'PURCHASE_BURGER-START':
            return updateObject( state, { loading: true, } );

        //Retour à l'espace acceuil
        case 'PURCHASE_INIT':
            return updateObject( state, { purchase: false, } );

        //Envoie du spinner d'attente des données: gestion asynchrone
        case 'FETCH_ORDERS_START':
            return updateObject( state, { loading: true, } );

        //Stockage des commandes et affichage
        case 'FETCH_ORDERS_SUCCESS':
            return fetchOrdersSuccess(state, action);

        //Gestion des erreurs lors du chargement des données
        case 'FETCH_ORDERS_FAIL':
            return updateObject( state, { loading: false, } );
    
        default: return state;
    }
};

export default orderReducer;