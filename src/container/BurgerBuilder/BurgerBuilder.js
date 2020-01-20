import React ,{Component} from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary'; 
import Burger from  '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

const INGREDIENT_PRICES ={
        salad : 0.5,
        cheese : 0.7,
        meat : 0.3,
        bacon: 0.4 
};

class BurgerBuilder extends Component {
    state = {
        ingredients : null,
        totalPrice: 4,
        purchasable : false,
        reviewPurchase : false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('https://zipgaelia.firebaseio.com/ingredients.json')
        .then(response => {
            this.setState({ingredients: response.data});
        })
        .catch(error => {
            this.setState({error: true});
        });
    }

    updatePurchaseStatus =  (ingredients) => {
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey];
        })
        .reduce((sum , el) =>  {
            return sum + el;

        }, 0);
        this.setState({purchasable : sum > 0});
    };
    
    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = { 
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({totalPrice : newPrice , ingredients: updatedIngredients});
        this.updatePurchaseStatus(updatedIngredients);
    };

    removeIngredientHandler =(type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount - 1;
        const updatedIngredients = { 
            ...this.state.ingredients
        };
        if(oldCount <=0) {
            return;
        } 
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({totalPrice : newPrice , ingredients: updatedIngredients});
        this.updatePurchaseStatus(updatedIngredients);
    };

    purchaseHandler= () => {
        this.setState({reviewPurchase: true})
    };

    purchaseCancelHandler= () => {
        this.setState({reviewPurchase: false})
    };

    purchaseContinueHandler= () => {
        // alert("Your Burger will be ready soon!");
        // this.setState({loading: true});
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice.toFixed(2),
        //     customer: {
        //         name: 'Diego',
        //         address : {
        //             street : 'Hello st 1',
        //             zipCode: '12345',
        //             country: 'Korea'
        //         },
        //         email: 'abcdefg@yopmail.com'
        //     },
        //     deliveryMethod: 'Express'
        // }
        // axios.post('/orders.json' , order)
        // .then(response => {
        //     this.setState({loading: false , reviewPurchase: false});
        // })
        // .catch(error => {
        //     this.setState({loading: false, reviewPurchase: false});
        // }); 
        

    };

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary =null;

        let burger = this.state.error ? <p>something went wrong with the server!</p> : <Spinner />;

        if(this.state.ingredients) {
            burger =  (
                <Aux>
                <Burger ingredients= {this.state.ingredients}/>
                <BuildControls
                    ingredientAdded= {this.addIngredientHandler} 
                    ingredientRemoved= {this.removeIngredientHandler}
                    disabled= {disabledInfo}
                    price= {this.state.totalPrice}
                    checkOut= {this.state.purchasable}
                    reviewed= {this.purchaseHandler}/>
                </Aux>
            );
            orderSummary = <OrderSummary 
            ingredients= {this.state.ingredients}  
            purchaseCancelled= {this.purchaseCancelHandler}
            purchaseContinued= {this.purchaseContinueHandler}
            price= {this.state.totalPrice} />;
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

export default withErrorHandler(BurgerBuilder, axios);

