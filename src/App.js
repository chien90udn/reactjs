import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from './helpers';
import { alertActions } from './actions';
import { PrivateRoute } from './components';
import { HomePage } from './views/HomePage';
import { LoginPage } from './views/LoginPage';
import { RegisterPage } from './views/RegisterPage';
import { Header } from './components/layout/header';
import { Admin } from './views/Admin';
import { Wallet } from './views/Wallet';
import { Product } from './views/Product';
import { Account } from './views/Account';
import { Checkout } from './views/Checkout';
import { Reward } from './views/Reward';
import { List } from './views/List';

class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        const { alert } = this.props;
        localStorage.setItem('user', true);
        console.log(localStorage.getItem('user'));
        return (
            <div className="jumbotron">
                
                <div className="container">
                    <div className="col-sm-10 offset-md-1">
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Router history={history}>
                            <div>
                                <Header />
                                <PrivateRoute exact path="/" component={HomePage} />
                                <Route path="/login" component={LoginPage} />
                                <Route path="/register" component={RegisterPage} />
                                <Route path="/admin" component={Admin} />
                                <Route path="/list" component={List} />
                                <Route path="/wallet" component={Wallet} />
                                <Route path="/product/:id" component={Product} />
                                <Route path="/account" component={Account} />
                                <Route path="/checkout/:id" component={Checkout} />
                                <Route path="/reward" component={Reward} />
                                <Route path="/reward/:token" component={Reward} />

                                
                            </div>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 