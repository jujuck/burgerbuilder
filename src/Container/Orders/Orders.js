import React, {Component} from 'react';
import Order from '../../Component/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../Hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    //Récupération des élements dans la base de donées et stockage dans un tableau
    //Envoi des elements par props dans order
    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                this.setState({loading: false, orders: fetchedOrders});

            })
            .catch(err => {
                this.setState({loading: false});
            })
    }

    render () {
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order
                         key={order.id}
                         ingredients={order.ingredients}
                         price={order.price} />
                ))}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);