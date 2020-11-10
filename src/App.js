import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import BurguerBuilder from "./containers/BurguerBuilder/BurguerBuilder";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";

class App extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Layout>
                        <Switch>
                            <Route path="/orders" component={Orders} />
                            <Route path="/checkout" component={Checkout} />
                            <Route path="/authorization" component={Auth} />
                            <Route path="/logout" component={Logout} />
                            <Route path="/" component={BurguerBuilder} />
                        </Switch>
                    </Layout>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
