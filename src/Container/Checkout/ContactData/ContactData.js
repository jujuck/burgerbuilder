import React, {Component} from 'react';
import axios from '../../../axios-orders';
import Button from '../../../Component/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../Component/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        adress: {
            street: '',
            zipcode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
         this.setState({loading : true})
         const order = {
             ingredients : this.props.ingredients,
             price: this.props.price,
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
             .then(response => {this.setState({ loading: false})
            this.props.history.push('/')
         })
             .catch(error => {this.setState({ loading: false})
         });
    }

    render() {
        let form = ( 
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="name" />
                <input className={classes.Input} type="email" name="email" placeholder="email" />
                <input className={classes.Input} type="text" name="street" placeholder="street" />
                <input className={classes.Input} type="text" name="zipcode" placeholder="zipcode" />
                <Button 
                    btnType="Success"
                    clicked={this.orderHandler}>Commandez</Button>
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
           
export default ContactData;
           