//import * as actionTypes from '../actions/burgerBuilderAction';
import { updateObject } from '../utility';


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

const addIngredient = (state, action) => {
    //Etape 1: update des ingredients
    const updateIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1}
    const updatedIngredients = updateObject(state.ingredients, updateIngredient)
    //Etape 2: retunr de l'update générale du state (ingrédient et price)
    const updatedState = {
        ingredients : updatedIngredients,
        totalPrice : state.totalPrice + INGREDIENT_PRICE[action.ingredientName]
    }
    return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
    //Etape 1: update des ingredients
    const updateIng = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1}
    const updatedIngs = updateObject(state.ingredients, updateIng)
    //Etape 2: retunr de l'update générale du state (ingrédient et price)
    const updateState = {
        ingredients : updatedIngs,
        totalPrice : state.totalPrice - INGREDIENT_PRICE[action.ingredientName]
    }
    return updateObject(state, updateState);
};

const setIngredient = (state, action) => {
    return updateObject( state, { 
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        totalPrice: 6,
        error: false
    } );
};

const reducer = ( state = initialState, action ) => {
    switch (action.type) {
        case 'ADD_INGREDIENT':
            return addIngredient (state, action);
    
        case 'REMOVE_INGREDIENT':
            return removeIngredient (state, action);
            
        case 'SET_INGREDIENTS':
            return setIngredient (state, action);

        case 'INIT_INGREDIENT_FAIL' :
            return updateObject( state, {error: true} );

        default: 
            return state;
    }
};

export default reducer;