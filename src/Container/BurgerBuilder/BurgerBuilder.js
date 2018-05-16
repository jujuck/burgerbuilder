import React, {Component} from 'react';
import { connect } from 'react-redux';

import Aux from '../../Hoc/Aux/Aux';
import Burger from '../../Component/Burger/Burger';
import BuildControls from '../../Component/Burger/BuildControls/BuildControls';
import Modal from '../../Component/UI/Modal/Modal';
import OrderSummary from '../../Component/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../Component/UI/Spinner/Spinner';
import withErrorHandler from '../../Hoc/withErrorHandler/withErrorHandler';
//import * as actionTypes from '../../store/actions';


class BurgerBuilder extends Component {
    state = {
        //ingredients: null,
        //totalPrice: 6,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    //Mise à jour suite à REDUX
    // componentDidMount () {
    //     axios.get('https://burgerbuilder-19bad.firebaseio.com/ingredients.json ')
    //         .then (response => {
    //             this.setState({ingredients : response.data});
    //         })
    //         .catch(error => {
    //             this.setState({error: true})
    //         });
    // }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            },0);
        //Mise à jour sutieà REDUX : this.setState({purchasable: 
            return sum > 0;     
    }
    
    //Mise à jour suite à REDUX, manage via reducer
    // addIngredientHandler = (type) => {
    //     //Réinitialisation des ingredients
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCounted = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCounted;
        
    //     //Calcul du montant après ajour d'ingredient
    //     const priceAddition = INGREDIENT_PRICE[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
        
    //     //Mise à jour du state
    //     this.setState({totalPrice : newPrice, ingredients: updatedIngredients})
    //     this.updatePurchaseState(updatedIngredients);
    // }
    
    //Mise à jour suite à REDUX,manage via reducer
    // removeIngredientHandler = (type) => {
    //     //Réinitialisation des ingredients
    //     const oldCount = this.state.ingredients[type];
    //     if (oldCount <= 0) {
    //         return;
    //     }
    //     const updatedCounted = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCounted;
        
    //     //Recalcul du prix
    //     const priceSoustraction = INGREDIENT_PRICE[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceSoustraction;
        
    //     //Mise à jour du state
    //     this.setState({ totalPrice : newPrice, ingredients : updatedIngredients})
    //     this.updatePurchaseState(updatedIngredients);
    // }
    
    purchaseHandler = () => {
        this.setState({purchasing : true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing : false})
    }

    purchaseContinueHandler = () => {
        //Mise à jour suite à REDUX
        // const queryParams = [];
        // for (let i in this.state.ingredients) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        // }

        // queryParams.push('Price=' + this.state.totalPrice);
        // const queryString = queryParams.join('&');
        this.props.history.push('/checkout')
            // pathname: '/checkout',
            // search: '?' + queryString
        //});
    }

    render() {
        //Désactivation du bouton less si absence de l'ingredient concerné
        const disabledInfo = {
            ...this.props.ings
        };
        
        //Vérification si la valeur de l'ingrédient est supérieur à zéro
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key]<= 0
        }

        //Modification du modal lors de l'envoi vers firebase
        let orderSummary = null;
        if (this.props.ings) {
            orderSummary = <OrderSummary 
            ingredients={this.props.ings}
            purchaseCancel={this.purchaseCancelHandler}
            purchaseContinue={this.purchaseContinueHandler}
            finalPrice={this.props.price} />
        }
        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        //Modification affichage en attente des données ingredients
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientSoustract={this.props.onIngredientRemoved}
                    disabled={disabledInfo} 
                    price={this.props.price}
                    purchasable={this.updatePurchaseState(this.props.ings)}
                    ordered={this.purchaseHandler}
                    />
                </Aux>
            )   
        }
            
            
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients, //transfert du state ingredients
        price: state.totalPrice

    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: 'ADD_INGREDIENT', ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: 'REMOVE_INGREDIENT', ingredientName: ingName})
    };
};

//ingName entre parenthèse donne accès à la propriété dans la fonction

export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(BurgerBuilder, axios));