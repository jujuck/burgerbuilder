import React from 'react';
import classes from './Order.css'

const Order = (props) => {
    return (
        <div className={classes.Order}>
            <p>Ingredients: Salad 1</p>
            <p>Price: <strong>7 €</strong></p>
        </div>
    );
}

export default Order;