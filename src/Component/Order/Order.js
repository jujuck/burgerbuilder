import React from 'react';
import classes from './Order.css'

const Order = (props) => {
    const ingredients = [];
    console.log(props.ingredients)

    //Création d'un tableau pour la gestion des ingredients et prix
    //Objectif : affichage dans la page order
    for (let ingredientName in props.ingredients) {
        ingredients.push(
            {name: ingredientName, 
            amount: props.ingredients[ingredientName]
            }
        )
    }

    const ingredientOutput = ingredients.map(ig => {
        return <span className={classes.Span} key={ig.name}>{ig.name} ({ig.amount})</span>
    })


    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>{Number.parseFloat(props.price).toFixed(2)} € </strong></p>
        </div>
    );
}

export default Order;