import React, {Component} from 'react';
import Aux from '../../../Hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    //This could be a functional component, doesn't need to be a class

    render () {
        const ingredientsSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
                return (
                    <li key={igKey}>
                        <span style={{ textTransform : 'capitalize' }}>{igKey}</span> : {this.props.ingredients[igKey]}
                    </li>
                    )
            });

        return (
            <Aux>
                <h3>Votre Commande</h3>
                <p>Un delicieux Burger avec vos propres ingrédients : </p>
                <ul>
                    {ingredientsSummary}
                </ul>
                <p><strong>Prix global</strong> (TTC) : {this.props.finalPrice.toFixed(2)} €</p>
                <p>Continuez vers la sortie ?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancel}>Annuler</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinue}>Continuer</Button>
            </Aux>
        )
    }
};

export default OrderSummary;