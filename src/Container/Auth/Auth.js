import React, {Component} from 'react';
import { connect } from 'react-redux';

import Input from '../../Component/UI/Input/Input';
import Button from '../../Component/UI/Button/Button';
import * as action from '../../store/actions/indexAction';
import Spinner from '../../Component/UI/Spinner/Spinner';

import classes from './Auth.css';

class Auth extends Component {
    state = {
        controls : {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Votre email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Votre mot de passe'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        },
        isSignup: true
    }

    //Vérification du formulaire avant envoie
    checkValidity(value, rules) {
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

        //Vérification de la validité de l'email
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }
        console.log(isValid)
        return isValid;
    }

    //Vérification de la validité
    inputChangeHandler = (event, controlName) => {
        const updatedControls =  {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({ controls: updatedControls})
    }

    submitHandler = (event) => {
        const email = this.state.controls.email.value//.toString();
        const password = this.state.controls.password.value//.toString();
        event.preventDefault();
        this.props.onAuth(email, password, this.state.isSignup);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup};
        });
    }

    render () {
        //création d'un tableau pour les inputs
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        //Création du formualaire
        let form = formElementsArray.map(formElement => {
            return (
            <Input 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value} 
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                changed={(event) => this.inputChangeHandler(event, formElement.id)} />
            );
        } );

        if (this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            )
        }

        return (
            <div className={classes.Auth}>
                {errorMessage}
                <form  onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">Validez</Button> 
                </form>
                <Button 
                    clicked={this.switchAuthModeHandler}
                    btnType="Danger">{this.state.isSignup? 'S enregister': 'Se connecter'}</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(action.auth(email, password, isSignup))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Auth);