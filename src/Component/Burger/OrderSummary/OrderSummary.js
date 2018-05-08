import React from 'react';
import Aux from '../../../Hoc/Aux'

const OrderSummary = (props) => {
    const ingredientsSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{ textTransform : 'capitalize' }}>{igKey}</span> : {props.ingredients[igKey]}
                </li>
                )
        });
    return (
        <Aux>
            <h3>Votre Commande</h3>
            <p>Un delicieux Burger avec vos propres ingrédients : </p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p>Continuez vers la sortie</p>
        </Aux>
    )
};

export default OrderSummary;