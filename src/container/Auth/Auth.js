import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

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
                    type: 'email',
                    placeholder: 'Email Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
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
                    required: true,
                    minLength: 6
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
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangeHandler = (event , controlsName) => {
        const updatedControls  = {
            ...this.state.controls,
            [controlsName]: {
                ...this.state.controls[controlsName],
                value: event.target.value,
                valid: this.checkValidation(event.target.value ,this.state.controls[controlsName].validation),
                touched: true
            }
        }
        this.setState({
            controls: updatedControls
        })
    };

    onSubmitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value);
    }

    render() {
        let formElementsArray = [];
        for(let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form = <div>
                        {formElementsArray.map(formElement => (
                            <Input
                                key ={formElement.id} 
                                valueName ={formElement.id}
                                inputType={formElement.config.elementType} 
                                elementConfig={formElement.config.elementConfig}
                                value={formElement.config.value}
                                shouldValidate={formElement.config.validation}
                                inValid={!formElement.config.valid}
                                usedForm={formElement.config.touched}
                                changed={(event)=>this.inputChangeHandler(event, formElement.id)}
                            />
                        ))}
                    </div>;
        //  if(this.props.loading) {
        //     form = <Spinner />
        // }

        return (
            <div className={classes.Auth}>
                <form onSubmit={this.onSubmitHandler}>
                    {form}
                    <Button 
                        btnType="Success" 
                    >
                        Login
                    </Button>
                </form>
            </div>
        )
    }    
}

const mapDispatchtoProps = (dispatch) => {
    return {
        onAuth: (email, password) => dispatch(actions.auth(email,password))
    }
}

export default connect(null, mapDispatchtoProps)(Auth);