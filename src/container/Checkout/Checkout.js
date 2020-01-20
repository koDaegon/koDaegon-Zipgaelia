import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {

    state= {
        ingredients: {
            cheese : 1,
            bacon : 1,
            salad: 1,
            meat : 1
        }
    }
    componentDidMount() {
       // console.log(this.props);
        this.parseQueryhandler();
    }

    parseQueryhandler () {
        const query = new URLSearchParams(this.props.location.search);
        const ingredientsFromBB = {};
        for(let param of query.entries()) {
            ingredientsFromBB[param[0]] = +param[1];
        }
        this.setState({ingredients : ingredientsFromBB});
    }
    
    purchseCanceledHandler =() => {
        return this.props.history.goBack();
    }
    purchseContinuedHandler =() => {
        return this.props.history.replace('/checkout/payment');
    }



    render() {
        console.log(this.props);
        return (
            <CheckoutSummary 
            ingredients= {this.state.ingredients}
            purchseCanceled= {this.purchseCanceledHandler}
            purchseContinued= {this.purchseContinuedHandler} />
        )
    }

}

export default Checkout;