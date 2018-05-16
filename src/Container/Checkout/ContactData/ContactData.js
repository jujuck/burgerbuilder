import React, {Component} from 'react';
import { connect } from 'react-redux';

import axios from '../../../axios-orders';
import Button from '../../../Component/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../Component/UI/Spinner/Spinner';
import Input from '../../../Component/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Votre Nom'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
            },
            street : {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Votre rue'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Votre Code Postal'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
            },
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Votre ville'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
            },
            email:{
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Votre email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'rapide', displayValue: 'Rapide'},
                        {value: 'economique', displayValue: 'Economique'}
                    ]
                },
                value: 'rapide',
                valid: true
            },
        },
        formIsValid: false,
        loading: false
    }

    //Fonction d'envoi des élements dans la base de données
    orderHandler = (event) => {
        event.preventDefault();
         this.setState({loading : true});
         //récupération des élements Name et value définie dans le state
         const formData = {};
         for (let formElementIdentifier in this.state.orderForm) {
             formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
         }
         //Récupération du prix et des ingrédients
         const order = {
             ingredients : this.props.ings,
             price: this.props.price,
             orderData: formData
         }

         //Envoi vers la base de données
         axios.post('/orders.json', order)
             .then(response => {this.setState({ loading: false})
            this.props.history.push('/')
         })
             .catch(error => {this.setState({ loading: false})
         });
    }

    //Vérification du formulaire avant envoie
    ckeckValidity(value, rules) {
        let isValid = true;

        //Régle 1 simple : entrée d'un caractère
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        //Règle 2 pour zip code avec longueur définie par minimum et max
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }
        console.log(isValid)
        return isValid;
    }

    //Gestion des changements dans le formualaire
    InputChangeHandler = (event, inputIdentifier) => {
        //Copie de l'élément State dans une constante
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        //Copie de l'element défine par son id dans la copie du state
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        //Modification de la valeur de l'element définie
        updatedFormElement.value = event.target.value;
        if (updatedFormElement !== 'deliveryMethod') {
            updatedFormElement.valid = this.ckeckValidity(updatedFormElement.value, updatedFormElement.validation);
        }
        //Réintroduction de l'element Identifié dans la copie du state
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        //Vérification de l'ensemble des elements du tableau
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }

        //Modification du state par réintroduction de sa copie
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    render() {

        //création d'un tableau pour les inputs
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }


        //Mise en forme conditionnelle de l'espace form en fonction du state, envoie vers Input
        let form = ( 
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value} 
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        changed={(event) => this.InputChangeHandler(event, formElement.id)}/>
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid} clicked={this.orderHandler}>Commandez</Button>
            </form>);
        if (this.state.loading) {
            form = <Spinner />;
        }

        return (
            <div className={classes.ContactData}>
                <h4>Entrez vos coordonées</h4>
                {form}
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        ings: state.ingredients, //Récupération du state du reducer
        price: state.totalPrice
    }
}
           
export default connect(mapStateToProps)(ContactData);
           