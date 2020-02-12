import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import axios from '../../axios-order';
import withErrorhandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';


class Orders extends Component {

    componentDidMount () {
        this.props.onFetchOrders();
    }
  
    render() {
        let ordersOutput = <Spinner />
        if(!this.props.loading) {
            ordersOutput = this.props.orders.map(order => (
                <Order 
                    key={order.id}
                    id={order.id}
                    ingredients={order.ingredients}
                    price={order.price}
                    />
            ))
        }
        return (
            <div>
              {ordersOutput}
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }

};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorhandler(Orders, axios));

