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
        isSignUp: true,
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
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }

    switchAuthMode = () => {
        this.setState(prevState =>{
            return {
                isSignUp: !prevState.isSignUp
            }
        })
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

        if(this.props.loading) {
            form = <Spinner />
        }

        let errMsg = null;

        if(this.props.error) {
            errMsg = (<p>{this.props.error.message}</p>);
        }

        return (
            <div className={classes.Auth}>
                {errMsg}
                <form onSubmit={this.onSubmitHandler}>
                    {form}
                    <Button btnType="Success" >Submit </Button>
                </form>
                <Button 
                    btnType="Danger"
                    clicked={this.switchAuthMode}
                     >SWITCH TO {this.state.isSignUp ? "SIGNIN" : "SIGNUP" } </Button>
            </div>
        )
    }    
}

const mapStateToProps = state => {
    return {
        loading : state.auth.loading,
        error: state.auth.error
    }
}

const mapDispatchtoProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(Auth);