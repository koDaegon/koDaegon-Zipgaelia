import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';


class Orders extends Component {

    state= {
        loading : true,
        orders : []
    }
    
    componentDidMount () {
        axios.get('/orders.json')
        .then(response => {
            const fetchedOrders = [];
            for (let key in response.data) {
                fetchedOrders.push({
                    id: key,
                    ...response.data[key]
                });
            }
            this.setState({orders: fetchedOrders,loading: false })                        

         }).catch(error => {
            this.setState({loading: false})
        });
    }
  
    render() {

        let ordersOutput = <Spinner />
        if(!this.state.loading) {
            ordersOutput = this.state.orders.map(order => (
                <Order 
                    key={order.id}
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

export default Orders;

