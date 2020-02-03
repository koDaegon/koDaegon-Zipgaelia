import React, { Component } from 'react';
import axios from '../../../axios-order';
import classes from './Payment.module.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class Payment extends Component {

    state = {
        orderForms: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    placeholder: 'Zipcode'
                },
                value: '',
                validation: {
                    required: true,
                    maxLength: 5,
                    minLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'express' , displayName: 'Express'},
                        {value: 'regular', displayName: 'Regular'}
                        ]
                },
                value: 'Express',
                validation: {},
                valid: true,
            }
        },
        loading: false,
        overallFormValid: false
    }

    checkValidation(value , rules) {
        let isValid = true;
        
        if(rules.required)
        {
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength)
        {
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength)
        {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    onChangeHandler = (event , inputIdentifier) => {
        const updatedOrderForm  = {
            ...this.state.orderForms
        }   
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = this.checkValidation(updatedFormElement.value ,updatedFormElement.validation);
        

        let allValid = true;
        for(let inputIdentifier in updatedOrderForm){
            allValid = updatedOrderForm[inputIdentifier].valid && allValid;   
        }
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        
        this.setState({
            orderForms : updatedOrderForm,
            overallFormValid : allValid
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
                            {formElementsArray.map(formElement => (
                                <Input
                                    key ={formElement.id} 
                                    valueName ={formElement.id}
                                    inputtype={formElement.config.elementType} 
                                    elementConfig={formElement.config.elementConfig}
                                    value={formElement.config.value}
                                    changed={(event)=>this.onChangeHandler(event, formElement.id)}
                                    shouldValidate={formElement.config.validation}
                                    inValid={!formElement.config.valid}
                                    usedForm={formElement.config.touched}
                                />
                            ))}
                        </form>
                        <Button disabled= {!this.state.overallFormValid} btnType="Success" clicked={this.paymentHandler}>Checkout</Button>
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