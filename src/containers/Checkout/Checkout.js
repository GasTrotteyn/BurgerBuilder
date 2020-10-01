import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: null,
        totalPrice: 0,
    }
    componentWillMount() {
        let updatedIngredients = {};
        let updatedPrice = 0;
        const query = new URLSearchParams(this.props.location.search);
        for (let param of query.entries()) {
            if (param[0] === 'price') {
                updatedPrice = param[1];
            } else {
                updatedIngredients[param[0]] = +param[1]
            }
        }
        //console.log(updatedIngredients);
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedPrice
        });
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace({ pathname: '/checkout/contact-data' });
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
                <Route
                    path={this.props.match.path + '/contact-data'}
                    render={(props) => (<ContactData
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice}
                        {...props} />)} />
            </div>
        )
    }
};

export default Checkout;