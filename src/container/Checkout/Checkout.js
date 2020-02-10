import React, { Component } from 'react';
import {Route, Redirect} from 'react-router-dom';
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
        let summary = <Redirect to="/"/>
        if(this.props.ings){
            const purchasedRedirect = this.props.purchased ? <Redirect to='/' /> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary 
                    ingredients= {this.props.ings}
                    purchseCanceled= {this.purchseCanceledHandler}
                    purchseContinued= {this.purchseContinuedHandler} />
                    <Route 
                    path={`${this.props.match.url}/payment`} 
                    component={Payment} />  
                </div>
            );
        }
        return (
            <div>        
               {summary}
            </div>
        )
    }

}

const mapStatetoProps= (state) => {
    return {
        ings : state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased
    } 
}

export default connect(mapStatetoProps)(Checkout);