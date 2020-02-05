import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import Payment from '../Checkout/Payment/Payment';

class Checkout extends Component {
    purchseCanceledHandler =() => {
        return this.props.history.goBack();
    }
    purchseContinuedHandler =() => {
        return this.props.history.replace('/checkout/payment');
    }

    render() {
        console.log(this.props);
        return (
            <div>        
                <CheckoutSummary 
                ingredients= {this.props.ings}
                purchseCanceled= {this.purchseCanceledHandler}
                purchseContinued= {this.purchseContinuedHandler} />
                
                <Route 
                    path={`${this.props.match.url}/payment`} 
                    component={Payment}  
                />
            </div>
        )
    }

}

const mapStatetoProps= (state) => {
    return {
        ings : state.ingredients,
        price: state.totalPrice
    } 
}

export default connect(mapStatetoProps)(Checkout);