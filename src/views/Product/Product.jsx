import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../actions';
import { listProduct } from '../../constants';
var QRCode = require('qrcode.react');

const HDWalletProvider = require("truffle-hdwallet-provider-privkey");
const privKeys = ["c6fbe1bc141bd504c1c2fc81601e71eef136a6756889a64640bf3cdfc621416e"]; 
const provider = new HDWalletProvider(privKeys, 'http://54.95.196.101:8545');
import jpegDemo from '../../../public/assets/images/img.jpeg';
var fs = require('fs');

//
import { default as Web3 } from 'web3';
import { default as contract } from 'truffle-contract';

var keythereum = require("keythereum");

// Import our contract artifacts and turn them into usable abstractions.
import demooken_artifacts from '../../build/contracts/DEMOToken.json'


var parsed = JSON.parse(JSON.stringify(demooken_artifacts));
var abi = parsed.abi;


// MetaCoin is our usable abstraction, which we'll use through the code below.
const DEMOToken = contract(demooken_artifacts)

const YourContract = new web3.eth.contract(abi, "0x437aeffa148fc863977ce904ed666179a8760590");


class Product extends React.Component {

    constructor() {
        super();
        this.state = {
            productInfo: []
        }
    }

    componentWillMount()
    {
        let id = this.props.match.params.id;
        this.setState({productInfo: listProduct[id]});
    }
    componentDidMount() {
        this.props.dispatch(userActions.getAll());

        // if (typeof web3 !== 'undefined') {

        //     window.web3 = new Web3(new Web3.providers.HttpProvider("http://54.95.196.101:8545"));
        //     const ContractDemo = web3.eth.contract(abi);

        //     const contractInstance = ContractDemo.at('0x8e3ee419aece76bdb32b3281cc6322a5f2765007');

        //     web3.personal.unlockAccount('0x437aeffa148fc863977ce904ed666179a8760590', 'chien123456', 600);
          

        //     console.log("0x5037239f158db3599bab1ec9907f3cf6f5b7786c: " + contractInstance.balanceOf.call('0x5037239f158db3599bab1ec9907f3cf6f5b7786c').toString())
              

        // } else {
        //     window.web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'))
        // }
    }

    handleCheckout(event)
    {
        if(this.props && this.props.user)
        {
            contractInstance.transfer("0x5037239f158db3599bab1ec9907f3cf6f5b7786c", this.state.productInfo.donate, { from: '0x437aeffa148fc863977ce904ed666179a8760590' });
        }
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }

    render() {
        const { user, users } = this.props;
        return (
            <div className="col-md-12">

                <h3>Products Detail</h3>

                {this.state.productInfo &&
                    <div className="col">
                        <div className="row">
                           
                                <div className="col-md-8 offset-md-2">
                                    <div className="card">
                                        <img className="card-img-top" src={jpegDemo}/>
                                        <div className="card-body">
                                            <h4 className="card-title"><a title="{this.state.productInfo.name}">{this.state.productInfo.name}</a></h4>

                                            <div className="row">
                                                { (this.state.productInfo.flag_type == 1) ?
                                                        <div className="col-12">
                                                            <div className="col">
                                                            Price: <p className="text-danger btn-block">{this.state.productInfo.price} ETH</p>
                                                            </div>
                                                            <div className="col">
                                                            Donate: <p className="text-primary btn-block">{this.state.productInfo.donate} TOKEN</p>
                                                            </div>
                                                        </div>
                                                    
                                                    :
                                                        <div className="col">
                                                        Price: <p className="text-danger btn-block">{this.state.productInfo.token} TOKEN</p>
                                                        </div>

                                                }
                                                

                                                <div className="col">
                                                    <button type="button" className="btn btn-primary btn-block dim mb-3">Like</button>
                                                </div>
                                                <div className="col">
                                                    <button type="button" onClick={this.handleCheckout.bind(this)} className="btn btn-success btn-block dim mb-3">Checkout</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                }
                
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

const connectedProduct = connect(mapStateToProps)(Product);
export { connectedProduct as Product };