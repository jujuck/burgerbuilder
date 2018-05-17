import React, {Component} from 'react';
import { connect } from 'react-redux';

import Aux from '../Aux/Aux';
import classes from './Layout.css';
import Toolbar from '../../Component/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../Component/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: true
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        });
    }


    render () {
        return (
            <Aux>
                <Toolbar 
                    isAuth={this.props.isAuthent}
                    drawerToggleclick={this.sideDrawerToggleHandler} />
                <SideDrawer 
                    isAuth={this.props.isAuthent}
                    open={this.state.showSideDrawer} 
                    closed={this.sideDrawerClosedHandler}/>
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthent: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);