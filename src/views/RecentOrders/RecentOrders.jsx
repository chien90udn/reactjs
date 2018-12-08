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
            submitted: false
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
                axios.get('http://52.199.160.114/api/example/api.php?action=checkToken&token=' + token)
                      .then(function (response) {
                            if(response.data)
                            {
                                if (typeof web3 !== 'undefined') {
                                    window.web3 = new Web3();
                                    web3.setProvider(provider);
                                }
                                const ContractDemo = web3.eth.contract(abi);
                                const contractInstance = ContractDemo.at('0x17e9d10dd785fc34d98f0e491a9639f5cdc3f26f');
                                let num = 1;
                                let index = 0;
                                if(listProduct[index] && listProduct[index].donate)
                                {
                                    num = listProduct[index].donate;
                                }
                                web3.personal.unlockAccount('0x1b1321ff4df14d41caaed7189762b1c8f49452de', 'chien12d@', 600);
                                let TxHash = contractInstance.transfer(username, 1, { from: '0x1b1321ff4df14d41caaed7189762b1c8f49452de' });
                                alert("TxHash: "+ TxHash +"!!!");  
                                axios.get('http://52.199.160.114/api/example/api.php?action=delToken&token=' + token)
                                    .then(function (response) { 

                                    }.bind(this)); 
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