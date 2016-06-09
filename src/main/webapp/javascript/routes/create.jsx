import React from "react";
import { Route, IndexRoute } from "react-router";

import requireAuth from "../utils/requireAuth";
import requireNoAuth from "../utils/requireNoAuth";

import Application from "../components/Application";

import WelcomePage from "../components/shop/WelcomePage";
import OrderPage from "../components/shop/OrderPage";

import SignInPage from "../components/auth/SignInPage";
import SignUpPage from "../components/auth/SignUpPage";

export default (store) => (
    <Route path="/" component={Application}>
        <IndexRoute component={WelcomePage} />

        <Route path="order/:laptopId" component={OrderPage} onEnter={requireAuth(store)} />

        <Route path="sign-in" component={SignInPage} onEnter={requireNoAuth(store)} />
        <Route path="sign-up" component={SignUpPage} onEnter={requireNoAuth(store)} />
    </Route>
);