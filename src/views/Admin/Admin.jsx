import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../actions';
import { listProduct } from '../../constants';

import { default as Web3 } from 'web3';
import LoadingScreen  from '../../components/common/LoadingScreen.js';

// Import our contract artifacts and turn them into usable abstractions.
import demooken_artifacts from '../../build/contracts/DEMOToken.json'
import jpegDemo from '../../../public/assets/images/img.jpeg';

var parsed = JSON.parse(JSON.stringify(demooken_artifacts));
var abi = parsed.abi;

var HttpHeaderProvider = require('httpheaderprovider');

var headers = {
  "Access-Control-Allow-Credential": "true"
}
var provider = new HttpHeaderProvider('http://52.194.193.223:8545', headers);


window.web3 = new Web3();
web3.setProvider(provider);

const ContractDemo = web3.eth.contract(abi);
const contractInstance = ContractDemo.at('0x17e9d10dd785fc34d98f0e491a9639f5cdc3f26f');




class Admin extends React.Component {

    componentDidMount() {
        
        this.props.dispatch(userActions.getAll());
        
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }

    handleSendETH(username, event) {
       

        web3.personal.unlockAccount('0x1b1321ff4df14d41caaed7189762b1c8f49452de', 'chien12d@', 600);
        let TxHash = web3.eth.sendTransaction({from:'0x1b1321ff4df14d41caaed7189762b1c8f49452de' ,to:username, "gas": "0x76c0", "gasPrice": "0x9184e72a000", "value": "0xDE0B6B3A7640000"});
        alert("TxHash Admin send eth into "+ username +" :" + TxHash);
    }

    render() {
        const { user, users } = this.props;
        return (
            <div className="col-md-12">
                
                <div className="col-12">
                    <p>Address Admin: 0x1b1321ff4df14d41caaed7189762b1c8f49452de</p>
                    <p>Address contract: 0x17e9d10dd785fc34d98f0e491a9639f5cdc3f26f</p>
                    <p>Balance: {parseInt(web3.eth.getBalance('0x1b1321ff4df14d41caaed7189762b1c8f49452de').toString()) / 1000000000000000000} ETH</p>
                    <p>BalanceOf: {contractInstance.balanceOf.call('0x1b1321ff4df14d41caaed7189762b1c8f49452de').toString()} TOKEN</p>
                    
                </div>
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

const connectedAdmin = connect(mapStateToProps)(Admin);
export { connectedAdmin as Admin};