import React from 'react';
import Aux from '../../../hoc/Auxiliary'


const orderSummary =(props) => {
    const ingredientSummary = Object.keys(props.ingredients)
    .map(igKey => {
        return (
            <li> <span style={{textTransform:'capitalize'}}>{igKey}</span> : {props.ingredients[igKey]}</li>
        );
    });
    return (
        <Aux> 
            <h3>ORDER SUMMARY</h3>
            <p>Here is your details of ur fabulous burger !!</p>
            <ul>
                {ingredientSummary}
            </ul>
        </Aux>
    )
};

export default orderSummary;