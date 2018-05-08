import React, {Component} from 'react';
import Aux from '../../Hoc/Aux';
import Burger from '../../Component/Burger/Burger';
import BuildControls from '../../Component/Burger/BuildControls/BuildControls';
import Modal from '../../Component/UI/Modal/Modal';
import OrderSummary from '../../Component/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICE = {
    salad: 0.5,
    cheese: 0.5,
    meat: 1.5,
    bacon: 1
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 6,
        purchasable: false,
        purchasing: false
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            },0);
        this.setState({purchasable: sum > 0});     
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
        this.updatePurchaseState(updatedIngredients);
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
        this.updatePurchaseState(updatedIngredients);
    }
    
    purshaseHandler = () => {
        this.setState({purchasing : true})
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
                <Modal show={this.state.purchasing}>
                    <OrderSummary ingredients={this.state.ingredients} />
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientSoustract={this.removeIngredientHandler}
                    disabled={disabledInfo} 
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purshaseHandler} />
                
            </Aux>
        );
    }
}

export default BurgerBuilder;