import React, {Component} from 'react';
import { connect } from 'react-redux';

import Order from '../../Component/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../Hoc/withErrorHandler/withErrorHandler';
import * as action from '../../store/actions/indexAction';
import Spinner from '../../Component/UI/Spinner/Spinner';

class Orders extends Component {


    //Lancement de la fonction executée par indexActions-orderReducer
    componentDidMount() {
        console.log(this.props.token)
        this.props.onFetchOrders(this.props.token); //
    }

    render () {
        //Envoi du spinner d'attente ou affichage des commandes
        let orders = <Spinner />
        if (!this.props.loading) {
            orders = this.props.orders.map(order => (
                <Order
                     key={order.id}
                     ingredients={order.ingredients}
                     price={order.price} />
            ) )
        };

        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token) => dispatch(action.fetchOrders(token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));