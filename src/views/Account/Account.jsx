import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../actions';
import { listProduct } from '../../constants';
import LoadingScreen  from '../../components/common/LoadingScreen.js';

// Import libraries we need.
import { default as Web3 } from 'web3'
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import demooken_artifacts from '../../build/contracts/DEMOToken.json'

var parsed = JSON.parse(JSON.stringify(demooken_artifacts));
var abi = parsed.abi;




class Account extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            eth: 0,
            token: 0,
            display_loading: false
        };
    }


    componentDidMount() {
        this.props.dispatch(userActions.getAll());
        
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }


    handleRefresh(event)
    {
        // 
        this.setState({ display_loading : true});
        try {
            if (typeof web3 !== 'undefined') {
                window.web3 = new Web3(new Web3.providers.HttpProvider("http://54.95.196.101:8545"));
            }

            const ContractDemo = web3.eth.contract(abi);
            const contractInstance = ContractDemo.at('0x8e3ee419aece76bdb32b3281cc6322a5f2765007');
            let token = contractInstance.balanceOf.call(this.props.user.username).toString();
            web3.personal.unlockAccount('0x437aeffa148fc863977ce904ed666179a8760590', 'chien123456', 600);

                if(contractInstance.transfer.call(this.props.user.username, 1, { from: '0x437aeffa148fc863977ce904ed666179a8760590' }).toString())
                {
                    alert("Transfer Success "+ "1" +" To Address: " + this.props.user.username + " !!!");
                }
            this.setState({token : token}); 
            let  eth = web3.eth.getBalance(this.props.user.username).toString();
            this.setState({eth  : eth}); 
        } catch (err) {
            console.log(err);
        }
        this.setState({ display_loading : false});
    }

    render() {
        const { user, users } = this.props;
        return (
            <div className="col-md-12">

                <h3>Account Info</h3>

                {user &&
                    <div className="col">
                        <div className="row">
                                <div className="col-md-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <h4 className="card-title">Account: {user ? user.username : ''}</h4>
                                            <div className="row">
                                               
                                                        <div className="col-12">
                                                            <div className="col-12">
                                                            Price: <p className="text-danger btn-block">{this.state.eth} ETH</p>
                                                            </div>
                                                            <div className="col-12">
                                                            Donate: <p className="text-primary btn-block">{this.state.token} TOKEN</p>
                                                            </div>
                                                        </div>
                                                
                                                <div className="col">
                                                    <button type="button" onClick={this.handleRefresh.bind(this)} className="btn btn-primary btn-block dim mb-3">Refresh</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                }
            <LoadingScreen display={this.state.display_loading} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedAccount = connect(mapStateToProps)(Account);
export { connectedAccount as Account };