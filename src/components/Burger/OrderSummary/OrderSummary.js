import React from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';


const orderSummary =(props) => {
    const ingredientSummary = Object.keys(props.ingredients)
    .map(igKey => {
        return (
            <li key={igKey}> <span style={{textTransform:'capitalize'}}>{igKey}</span> : {props.ingredients[igKey]}</li>
        );
    });
    return (
        <Aux> 
            <h3>ORDER SUMMARY</h3>
            <p>Here is your details of ur fabulous burger !!</p>
            <ul>
                {ingredientSummary}
            </ul>

            <h4>Total Price : ${props.price.toFixed(2)}</h4>
            <p>Do you want to CheckOut ?</p>
            <Button btnType= "Danger" clicked= {props.purchaseCancelled}>Cancel</Button>
            <Button btnType= "Success" clicked= {props.purchaseContinued}>Check-Out</Button>
        </Aux>
    )
};

export default orderSummary;