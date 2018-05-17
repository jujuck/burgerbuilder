import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact>Burger Builder</NavigationItem>
            <NavigationItem link="/orders">Orders</NavigationItem>
            { props.isAuth? 
                <NavigationItem link="/logout">Se déconnecter</NavigationItem>
                : <NavigationItem link="/auth">Se connecter</NavigationItem>
            }
        </ul>
    )
};

export default NavigationItems;