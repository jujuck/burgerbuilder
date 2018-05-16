import React, {Component} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../Component/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    //Gestion du bouton annulation
    CheckoutAnnulationHandler = () => {
        this.props.history.goBack();
    }

    //Gestion du bouton continuez
    CheckoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render () {
        //Redirection si absence d'ingredient au chargement de la page
        console.log(this.props.ings)
        let summary = <Redirect to="/" />
        
        if (this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary 
                    ingredients={this.props.ings}
                    onCheckoutAnnulation={this.CheckoutAnnulationHandler}
                    onCheckoutContinue={this.CheckoutContinueHandler}
                    />
                    <Route 
                        path={this.props.match.path + '/contact-data'} 
                        component ={ContactData}
                        //render={(props) => (<ContactData ingredients={this.props.ings} price={this.props.price} {...props} />)} => REDUX
                        />
                </div>
            );
        }

        return (
            <div>
              {summary}
            </div>
              
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients, //Récupération du state du reducer
        purchased: state.order.purchased
    }
}


export default connect(mapStateToProps)(Checkout);