import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../actions';
import {validateEmail}  from '../../components/common/helpers';

// Import libraries we need.
import { default as Web3 } from 'web3'
import { default as contract } from 'truffle-contract'
import { listProduct } from '../../constants';

// Import our contract artifacts and turn them into usable abstractions.
import demooken_artifacts from '../../build/contracts/DEMOToken.json';
import axios from 'axios';

var parsed = JSON.parse(JSON.stringify(demooken_artifacts));
var abi = parsed.abi;

var HttpHeaderProvider = require('httpheaderprovider');

var headers = {
  "Access-Control-Allow-Credential": "true"
}
var provider = new HttpHeaderProvider('http://52.194.193.223:8545', headers);


class RecentOrders extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());

        this.state = {
            email: '',
            submitted: false,
            order_history: [],
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { email } = this.state;
        const { dispatch } = this.props;
        if (email && validateEmail(email)) {
            
            try {
                axios.get('http://18.179.53.198/api/example/api.php?action=getListOrder&email=' + email)
                      .then(function (response) {
                            if(response.data)
                            {
                                console.log(response.data);
                            }
                            else
                            {
                               alert('Token not found!'); 
                            }
                    }.bind(this));            
            } catch (err) {
                console.log(err);
            }
        }
    }

    render() {
        console.log("dasssss");
        const { loggingIn } = this.props;
        const { email, token, submitted } = this.state;
        return (
            <div className="col-md-10 offset-md-1">
                <h2 className="text-center">Recent Orders</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
                        <label htmlFor="email">Email</label>
                        <input type="text" className="form-control" name="email" value={email} onChange={this.handleChange} />
                        {submitted && (!email || !validateEmail(email)) &&
                            <div className="help-block">Email is required</div>
                        }
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary">Check</button>
                    </div>
                </form>
                {this.state.order_history.map((order, index) =>
                                <div className="col-12 col-md-6 col-lg-4 pb-2">
                                    <div className="card">
                                        <img className="card-img-top" src={"public/assets/images/" + index}/>
                                        <div className="card-body">
                                            <h4 className="card-title"><a href={'/#/product/' + index} >{index}</a></h4>
                                            
                                        </div>
                                    </div>
                                </div>
                    )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedRecentOrders = connect(mapStateToProps)(RecentOrders);
export { connectedRecentOrders as RecentOrders }; 