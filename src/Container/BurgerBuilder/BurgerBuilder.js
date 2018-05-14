import React, {Component} from 'react';
import Aux from '../../Hoc/Aux/Aux';
import Burger from '../../Component/Burger/Burger';
import BuildControls from '../../Component/Burger/BuildControls/BuildControls';
import Modal from '../../Component/UI/Modal/Modal';
import OrderSummary from '../../Component/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../Component/UI/Spinner/Spinner';
import withErrorHandler from '../../Hoc/withErrorHandler/withErrorHandler';


const INGREDIENT_PRICE = {
    salad: 0.5,
    cheese: 0.5,
    meat: 1.5,
    bacon: 1
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 6,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount () {
        axios.get('https://burgerbuilder-19bad.firebaseio.com/ingredients.json ')
            .then (response => {
                this.setState({ingredients : response.data});
            })
            .catch(error => {
                this.setState({error: true})
            });
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
    
    purchaseHandler = () => {
        this.setState({purchasing : true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing : false})
    }

    pusrchaseContinueHandler = () => {
        //alert("Vous souhaitez continuer")
        this.setState({loading : true})
        const order = {
            ingredients : this.state.ingredients,
            price: this.state.totalPice,
            costumer : {
                name: 'JYRLG',
                adresse: {
                    street : 'TestStreet',
                    zipcode: '12341234',
                    country: 'USA'
                },
                email:'test@test.com',
            },
            deliveryMethod: 'fastest'
            
        }
        axios.post('/orders.json', order)
            .then(response => {this.setState({ loading: false, purchasing : false })
        })
            .catch(error => {this.setState({ loading: false, purchasing : false })
        });
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

        //Modification du modal lors de l'envoi vers firebase
        let orderSummary = null;
        if (this.state.ingredients) {
            orderSummary = <OrderSummary 
            ingredients={this.state.ingredients}
            purchaseCancel={this.purchaseCancelHandler}
            purchaseContinue={this.pusrchaseContinueHandler}
            finalPrice={this.state.totalPrice} />
        }
        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        //Modification affichage en attente des données ingredients
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />
        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientSoustract={this.removeIngredientHandler}
                    disabled={disabledInfo} 
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
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

export default withErrorHandler(BurgerBuilder, axios);