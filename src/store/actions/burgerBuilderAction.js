//import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (ingredientName) => {
    return {
        type: 'ADD_INGREDIENT',
        ingredientName: ingredientName
    };
};

export const removeIngredient = (ingredientName) => {
    return {
        type: 'REMOVE_INGREDIENT',
        ingredientName: ingredientName
    };
};

//Gestion du chargement asynchrone des ingredients
export const setIngredient = (ingredients) => {
    return {
        type: 'SET_INGREDIENTS',
        ingredients: ingredients
    };
};

export const initIngredientFail = () => {
    return {
        type: 'INIT_INGREDIENT_FAIL'
    }
}

export const initIngredient = () => {
    return dispatch => {
        axios.get('https://burgerbuilder-19bad.firebaseio.com/ingredients.json ')
        .then (response => {
            dispatch(setIngredient(response.data));
        } )
        .catch(error => {
            dispatch(initIngredientFail());
        } );
    };
};