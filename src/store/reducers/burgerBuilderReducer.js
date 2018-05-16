//import * as actionTypes from '../actions/burgerBuilderAction';

const initialState = {
    ingredients: null,
    totalPrice: 6,
    error: false
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
        case 'SET_INGREDIENTS':
            return {
                ...state,
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat
                },
                error: false
            };
        case 'INIT_INGREDIENT_FAIL' :
            return {
                ...state,
                error: true
            };
        default: 
            return state;
    }
};

export default reducer;