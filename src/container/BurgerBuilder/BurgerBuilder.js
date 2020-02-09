import React ,{Component} from 'react';
import {connect} from 'react-redux';
// import * as actionType from '../../store/actions/actionType';
//import {Link} from 'react-router-dom';
import Aux from '../../hoc/Auxiliary/Auxiliary'; 
import Burger from  '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as bugerBuilderActions from '../../store/actions/index';


class BurgerBuilder extends Component {
    state = {
        reviewPurchase : false,
        loading: false,
    }

    componentDidMount() {
        console.log(this.props);
        this.props.onInitIngredients();
    }

    componentDidUpdate () {
        console.log('Update');
        console.log(this.props);
        
    }

    updatePurchaseStatus= (ingredients) => {
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey];
        })
        .reduce((sum , el) => {
            return sum + el;
        }, 0);
        return sum > 0;
    };
    

    purchaseHandler= () => {
        this.setState({reviewPurchase: true})
    };

    purchaseCancelHandler= () => {
        this.setState({reviewPurchase: false})
    };

    purchaseContinueHandler= () => {
        this.props.history.push('/checkout');
    };

    render() {
        const disabledInfo = {
            ...this.props.ings
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary =null;

        let burger = this.props.error ? <p>something went wrong with the server!</p> : <Spinner />;

        if(this.props.ings) {
            burger =  (
                <Aux>
                <Burger ingredients= {this.props.ings}/>
                <BuildControls
                    ingredientAdded= {this.props.onIngredientAdded} 
                    ingredientRemoved= {this.props.onIngredientRemoved}
                    disabled= {disabledInfo}
                    price= {this.props.totalPrice}
                    checkOut= {this.props.counter>0 ? true : false}
                    reviewed= {this.purchaseHandler}/>
                </Aux>
            );
            orderSummary = <OrderSummary 
            ingredients= {this.props.ings}  
            purchaseCancelled= {this.purchaseCancelHandler}
            purchaseContinued= {this.purchaseContinueHandler}
            price= {this.props.totalPrice} />;
        }

        if(this.state.loading) {
            orderSummary = <Spinner/>;
        }
        return(
            <Aux>
                <Modal show= {this.state.reviewPurchase} modalClosed= {this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>            
                 {burger}
            </Aux>
        );
    }
}
const mapStatetoProps = (state) => {
    return {
        ings: state.ingredients,
        totalPrice: state.totalPrice,
        counter: state.ingCounter,
        error: state.error
    }
}

const mapDispatchtoProps = (dispatch) => {
    return {
        onIngredientAdded: (ingType) => dispatch(bugerBuilderActions.addIngredient(ingType)),
        onIngredientRemoved: (ingType) => dispatch(bugerBuilderActions.removeIngredient(ingType)),
        onInitIngredients: () => dispatch(bugerBuilderActions.fetchIngredients())    
    }
}

export default connect(mapStatetoProps ,mapDispatchtoProps)(withErrorHandler(BurgerBuilder, axios));

