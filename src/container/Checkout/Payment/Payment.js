import React, { Component } from 'react';
import axios from '../../../axios-order';
import classes from './Payment.module.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

class Payment extends Component {

    state = {
        loading: false,
        name: '',
        email: '',
        address: {
            street: '',
            zipCode: ''
        }
    }
    paymentHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice.toFixed(2),
            customer: {
                name: 'Diego',
                address : {
                    street : 'Hello st 1',
                    zipCode: '12345',
                    country: 'Korea'
                },
                email: 'abcdefg@yopmail.com'
            },
            deliveryMethod: 'Express'
        }
        axios.post('/orders.json' , order)
        .then(response => {
            this.setState({loading: false});
        })
        .catch(error => {
            this.setState({loading: false});
        }); 
        console.log(order);
        console.log(this.props);
        this.props.history.push('/');
    }
    
    render() {
        let form = <div>Please input your information for payment
                        <form>
                            Full name: <input className={classes.Input} type="text" name="name" placeholder="Full Name"></input>
                            <br /> Email: <input className={classes.Input} type="text" name="email" placeholder="email"></input>
                            <br /> Street: <input className={classes.Input} type="text" name="address_street" placeholder="Street"></input>
                            <br /> ZipCode: <input className={classes.Input} type="text" name="address_zipCode" placeholder="Zipcode"></input>
                        </form>
                        <Button btnType="Success" clicked={this.paymentHandler}>Checkout</Button>
                    </div>;

        if(this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.Payment}>
                {form}
            </div>
        );
    }
}

export default Payment;