// import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';


//Mise en place de l'espace commande avec envoie des infos sur la base de données et gestion des erreurs
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


//Mise en place de l'espace Order (récupération des commadnes usr la bases de données, affichages et gestion des erreurs)
export const fetchOrderSuccess = (orders) => {
    return {
        type: 'FETCH_ORDERS_SUCCESS',
        orders: orders
    };
};

export const fetchOrdersFail = (error) => {
    return {
        type: 'FETCH_ORDERS_FAIL',
        error: error
    };
};

export const fetchOrderStart = () => {
    return {
        type: 'FETCH_ORDERS_START'
    };
};

export const fetchOrders = () => {
    return dispatch => {
        //Lancement de la fonction Spinner
        dispatch(fetchOrderStart());
        //Récupération des données et gestion des erreurs
        axios.get('/orders.json')
        .then(res => {
            const fetchedOrders = [];
            for (let key in res.data) {
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                });
            }
            dispatch(fetchOrderSuccess(fetchedOrders))

        })
        .catch(err => {
            dispatch(fetchOrdersFail(err));
        })
    }
}