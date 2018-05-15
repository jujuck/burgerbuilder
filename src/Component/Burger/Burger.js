import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {
    //Transformation de l'objet Ingredient en un tableau de tableau propriété-value
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />;
            });
        })
        .reduce((arr, currentElement) => {
            return arr.concat(currentElement)
        }, []);
    
    //Vérification de la longueur du tableau pour affichage de message
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Merci de commencer votre Burger !!! </p>
    }
    
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default Burger;