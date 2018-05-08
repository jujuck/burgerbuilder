import React, {Component} from 'react';
import Aux from '../../Hoc/Aux';
import Burger from '../../Component/Burger/Burger';
import BuildControls from '../../Component/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4
    }

    addIngredientHandler = (type) => {
        //Réinitialisation des ingredients
        const oldCount = this.state.ingredients[type];
        const updatedCounted = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCounted;
        
        //Calcul du montant après ajour d'ingredient
        const priceAddition = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        
        //Mise à jour du state
        this.setState({totalPrice : newPrice, ingredients: updatedIngredients})
    }
    
    removeIngredientHandler = (type) => {
        //Réinitialisation des ingredients
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCounted = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCounted;
        
        //Recalcul du prix
        const priceSoustraction = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceSoustraction;
        
        //Mise à jour du state
        this.setState({ totalPrice : newPrice, ingredients : updatedIngredients})
    }

    render() {
        //Désactivation du bouton less si absence de l'ingredient concerné
        const disabledInfo = {
            ...this.state.ingredients
        };
        
        //Vérification si la valeur de l'ingrédient est supérieur à zéro
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key]<= 0
        }
            
            
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientSoustract={this.removeIngredientHandler}
                    disabled={disabledInfo} />
            </Aux>
        );
    }
}

export default BurgerBuilder;