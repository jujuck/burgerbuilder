import React from 'react';
import classes from './Input.css';

const Input = (props) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];

    //Vérification de la validité de l'input
    if (props.invalid && props.shouldValidate) {
        inputClasses.push(classes.Invalid)
    }

    //création des élements du formulaire contact récupération par ContactData
    switch (props.elementType) {
        case ('input') :
            inputElement = <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value} 
                onChange={props.changed} />;
            break;
        case ('textarea'):
            inputElement = <textarea 
                className={inputClasses.join(' ')}
                {...props.elementConfig} 
                value={props.value}  
                onChange={props.changed} />;
            break;
        //Création de l'élement select avec ces options
        case ('select'):
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed} >
                    {props.elementConfig.options.map(option => (
                        <option key ={option.value} value={option.value} >
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value}  
                onChange={props.changed} />;
    }


    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
}

export default Input;