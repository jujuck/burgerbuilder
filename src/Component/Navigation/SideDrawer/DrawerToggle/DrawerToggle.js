import React from 'react';
import classes from './DrawerToggle.css';

const DrawerToggle = (props) => {
    return (
        <div className={classes.DrawerToggle} onClick={props.click}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

export default DrawerToggle;