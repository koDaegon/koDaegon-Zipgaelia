import React, { Component } from 'react';
import {connect} from 'react-redux';

import * as actions from '../../../store/actions/index';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../../axios-order';

import classes from './Payment.module.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {updatedObject, checkValidation} from '../../../shared/utility';

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
        overallFormValid: false
    }

    onChangeHandler = (event , inputIdentifier) => {
        const updatedFormElement = updatedObject(this.state.orderForms[inputIdentifier] , {
            value: event.target.value,
            touched: true,
            valid: checkValidation(event.target.value ,this.state.orderForms[inputIdentifier].validation)
        });
        
        const updatedOrderForm = updatedObject(this.state.orderForms, {
            [inputIdentifier] : updatedFormElement
        });

        let allValid = true;
        for(let inputIdentifier in updatedOrderForm){
            allValid = updatedOrderForm[inputIdentifier].valid && allValid;   
        }
        
        this.setState({
            orderForms : updatedOrderForm,
            overallFormValid : allValid
        })
    };


    paymentHandler = (event) => {
        event.preventDefault();
        let customerInfo = {};
        for(let element in this.state.orderForms) {
            customerInfo[element] = this.state.orderForms[element].value
        }

        const order = {
            ingredients: this.props.ings,
            price: (this.props.totalPrice).toFixed(2),
            orderData: customerInfo,
            userId: this.props.userId
        }
        // console.log(order);
        // console.log(this.props);
        //this.props.history.push('/');
        this.props.onBurgerStart(order, this.props.token);
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
                                    inputType={formElement.config.elementType} 
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

        if(this.props.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.Payment}>
                {form}
            </div>
        );
    }
}

const mapStatetoProps =(state) => {
    return  {
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        purchased: state.order.purchased,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchtoProps = (dispatch) => {
    return {
        onBurgerStart: (orderData, token)=>dispatch(actions.purchaseBurger(orderData, token))
    }
}

export default connect(mapStatetoProps , mapDispatchtoProps)(withErrorHandler(Payment,axios));