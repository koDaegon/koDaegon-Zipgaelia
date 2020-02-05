import React ,{Component} from 'react';
import {connect} from 'react-redux';
import * as actionType from '../../store/action';
//import {Link} from 'react-router-dom';
import Aux from '../../hoc/Auxiliary/Auxiliary'; 
import Burger from  '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';


class BurgerBuilder extends Component {
    state = {
        reviewPurchase : false,
        loading: false,
        error: false
    }

    componentDidMount() {
        console.log(this.props);
        // axios.get('https://zipgaelia.firebaseio.com/ingredients.json')
        // .then(response => {
        //     this.setState({ingredients: response.data});
        // })
        // .catch(error => {
        //     this.setState({error: true});
        // });
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

        let burger = this.state.error ? <p>something went wrong with the server!</p> : <Spinner />;

        if(this.props.ings) {
            burger =  (
                <Aux>
                <Burger ingredients= {this.props.ings}/>
                <BuildControls
                    ingredientAdded= {this.props.onIngredientAdded} 
                    ingredientRemoved= {this.props.onIngredientRemoved}
                    disabled= {disabledInfo}
                    price= {this.props.totalPrice}
                    checkOut= {this.updatePurchaseStatus(this.props.ings)}
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
        totalPrice: state.totalPrice
    }
}

const mapDispatchtoProps = (dispatch) => {
    return {
        onIngredientAdded: (ingType) => dispatch({type: actionType.ADD_INGREDIENT, ingredientType : ingType}),
        onIngredientRemoved: (ingType) => dispatch({type: actionType.REMOVE_INGREDIENT, ingredientType : ingType})    
    }
}

export default connect(mapStatetoProps ,mapDispatchtoProps)(withErrorHandler(BurgerBuilder, axios));

