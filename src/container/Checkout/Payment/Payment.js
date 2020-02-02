import React, { Component } from 'react';
import axios from '../../../axios-order';
import classes from './Payment.module.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class Payment extends Component {

    state = {
        loading: false,
        orderForms: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: '',
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    placeholder: 'Zipcode'
                },
                value: '',
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'express' , displayName: 'Express'},
                        {value: 'regular', displayName: 'Regular'}
                        ]
                },
                value: '',
            }
        }
    }
    onChangeHandler = (event , inputIdentifier) => {
        const updatedOrderForms  = {
            ...this.state.orderForms
        }   
        const updatedFormElement = {
            ...updatedOrderForms[inputIdentifier]
        }
        updatedFormElement.value = event.target.value;
        updatedOrderForms[inputIdentifier] = updatedFormElement;
        this.setState({
            orderForms : updatedOrderForms
        })
    };

    paymentHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        let customerInfo = {};
        for(let element in this.state.orderForms) {
            customerInfo[element] = this.state.orderForms[element].value
        }

        const order = {
            ingredients: this.props.ingredients,
            price: (this.props.totalPrice).toFixed(2),
            orderData: customerInfo
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
    };
    
    render() {
        let formElementsArray = [];
        for(let key in this.state.orderForms) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForms[key]
            })
        }
        let form = <div>Please input your information for the payment
                        <form onSubmit={this.paymentHandler}>
                            {formElementsArray.map(FormElement => (
                                <Input
                                    key ={FormElement.id} 
                                    inputtype={FormElement.config.elementType} 
                                    elementConfig={FormElement.config.elementConfig}
                                    value={FormElement.config.value}
                                    changed={(event)=>this.onChangeHandler(event, FormElement.id)}
                                />
                            ))}
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