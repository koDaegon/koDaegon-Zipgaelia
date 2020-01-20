import React from 'react';
import Burger from '../../Burger/Burger';
import classes from './CheckoutSummary.module.css';
import Button from '../../UI/Button/Button';

const checkoutSummary =(props) => {
    console.log(props);
    return (
        <div className= {classes.CheckoutSummary}>
            <h1>Almost Done!!</h1>
            <div style={{width: '100%' , margin: 'auto'}}>
                <Burger ingredients= {props.ingredients} />
            </div>
            <Button btnType='Danger' clicked={props.purchseCanceled}>Cancel</Button>
            <Button btnType='Success'clicked={props.purchseContinued}>Continue</Button>
        </div>
    )
}

export default checkoutSummary;