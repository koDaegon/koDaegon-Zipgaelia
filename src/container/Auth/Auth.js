import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Email Address'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'password'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }
        },
        overallFormValid: false
    }

    checkValidation(value , rules) {
        let isValid = true;
        
        if(rules.required)
        {
            isValid = value.trim() !== '' && isValid;
        }

        return isValid;
    }

    onChangeHandler = (event , inputIdentifier) => {
        const updatedControlsForm  = {
            ...this.state.controls
        }   
        const updatedFormElement = {
            ...updatedControlsForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = this.checkValidation(updatedFormElement.value ,updatedFormElement.validation);
        

        let allValid = true;
        for(let inputIdentifier in updatedControlsForm){
            allValid = updatedControlsForm[inputIdentifier].valid && allValid;   
        }
        updatedControlsForm[inputIdentifier] = updatedFormElement;
        
        this.setState({
            controls : updatedControlsForm,
            overallFormValid : allValid
        })
    };

    render() {
        let formElementsArray = [];
        for(let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }
        console.log(formElementsArray);
        let form = <div>
                        <form >
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
                    </div>;
        //  if(this.props.loading) {
        //     form = <Spinner />
        // }

        return (
            <div className={classes.Auth}>
                {form}
                <Button 
                    disabled= {!this.state.overallFormValid} 
                    btnType="Success" 
                    //clicked={this.paymentHandler}
                >
                    Login
                </Button>
            </div>
        )
    }    

}

export default Auth;