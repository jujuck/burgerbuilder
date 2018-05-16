//import * as actionTypes from './actions';

const initialState = {
    ingredients: {
        'salad': 0,
        'bacon': 0,
        'cheese': 0,
        'meat': 0
    },
    totalPrice: 6
};

const INGREDIENT_PRICE = {
    salad: 0.5,
    cheese: 0.5,
    meat: 1.5,
    bacon: 1
}

const reducer = ( state = initialState, action ) => {
    switch (action.type) {
        case 'ADD_INGREDIENT':
            return {
                ...state,//Copie de l'old state
                ingredients : {
                    ...state.ingredients,//Copie de l'object ingredient dans un nouveau object
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice : state.totalPrice + INGREDIENT_PRICE[action.ingredientName]
            };
    
        case 'REMOVE_INGREDIENT':
            return {
                ...state,//Copie de l'old state
                ingredients : {
                    ...state.ingredients,//Copie de l'object ingredient dans un nouveau
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice : state.totalPrice - INGREDIENT_PRICE[action.ingredientName]
            };
        default: 
            return state;
    }
};

export default reducer;