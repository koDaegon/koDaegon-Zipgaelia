import React, { Component } from 'react';
import {Route} from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import Payment from '../Checkout/Payment/Payment';

class Checkout extends Component {

    state= {
        ingredients: null,
        totalPrice : 0
    }
    
    componentWillMount() {
       // console.log(this.props);
        this.parseQueryhandler();
    }

    parseQueryhandler () {
        const query = new URLSearchParams(this.props.location.search);
        const ingredientsFromBB = {};
        let priceFromBB = {};
        for(let param of query.entries()) {
            if(param[0] === 'price') {
                priceFromBB[param[0]] = +param[1];
            } else {
                ingredientsFromBB[param[0]] = +param[1];
            } 
        }
        this.setState({ingredients : ingredientsFromBB , totalPrice: priceFromBB['price'] });
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
            <div>        
                <CheckoutSummary 
                ingredients= {this.state.ingredients}
                purchseCanceled= {this.purchseCanceledHandler}
                purchseContinued= {this.purchseContinuedHandler} />
                <Route path={`${this.props.match.url}/payment`} 
                       render= {(props)=> (<Payment ingredients={this.state.ingredients} totalPrice={this.state.totalPrice} {...props}/>)}  />
            </div>
        )
    }

}

export default Checkout;