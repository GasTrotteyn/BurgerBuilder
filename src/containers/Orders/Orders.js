import React, { Component } from "react";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import Order from "../../components/Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrdersStart();
        this.props.onFetchOrders(this.props.token);
    }

    render() {
        const ordersToShow = (
            <div>
                {this.props.orders.map((order) => (
                    <Order key={order.id} ingredients={order.ingredients} price={order.price} />
                ))}
            </div>
        );
        let orders = !this.props.loading ? ordersToShow : <Spinner />;
        return orders;
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.ord.orders,
        loading: state.ord.loadingOrders,
        token: state.auth.token,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrdersStart: () => dispatch(actions.fetchOrdersStart()),
        onFetchOrders: (token) => {
            dispatch(actions.fetchOrders(token));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
