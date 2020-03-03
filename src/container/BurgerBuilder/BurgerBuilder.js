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
import * as actions from '../../store/actions/index';


class BurgerBuilder extends Component {
    state = {
        reviewPurchase : false,
        loading: false,
    }

    componentDidMount() {
        this.props.onInitIngredients();
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
        if(this.props.isAuth) {
            this.setState({reviewPurchase: true})
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    };

    purchaseCancelHandler= () => {
        this.setState({reviewPurchase: false})
    };

    purchaseContinueHandler= () => {
        this.props.onInitPurchase();
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
                    reviewed= {this.purchaseHandler}
                    authenticated= {this.props.isAuth} />
                </Aux>
            );
            orderSummary = 
                <OrderSummary 
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
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        counter: state.burgerBuilder.ingCounter,
        error: state.burgerBuilder.error,
        isAuth: state.auth.token !== null
    }
}

const mapDispatchtoProps = (dispatch) => {
    return {
        onIngredientAdded: (ingType) => dispatch(actions.addIngredient(ingType)),
        onIngredientRemoved: (ingType) => dispatch(actions.removeIngredient(ingType)),
        onInitIngredients: () => dispatch(actions.fetchIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStatetoProps ,mapDispatchtoProps)(withErrorHandler(BurgerBuilder, axios));

