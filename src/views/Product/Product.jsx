import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import { userActions } from '../../actions';
import { listProduct } from '../../constants';
var QRCode = require('qrcode.react');


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

 

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class Product extends React.Component {

    constructor() {
        super();
        this.state = {
            productInfo: [],
            showModal: false,
            pass: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount()
    {
        let id = this.props.match.params.id;
        this.setState({productInfo: listProduct[id]});
    }
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }


    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }

    handleLike(index, event) {
        try {
            if(this.props.user && this.props.user.username)
            {
               
                const ContractDemo = web3.eth.contract(abi);
                const contractInstance = ContractDemo.at('0x17e9d10dd785fc34d98f0e491a9639f5cdc3f26f');
                let num = 1;
                if(listProduct[index] && listProduct[index].donate)
                {
                    num = listProduct[index].donate;
                }
                web3.personal.unlockAccount('0x1b1321ff4df14d41caaed7189762b1c8f49452de', 'chien12d@', 600);
                let TxHash = contractInstance.transfer(this.props.user.username, 1, { from: '0x1b1321ff4df14d41caaed7189762b1c8f49452de' });
                alert("TxHash: "+ TxHash +"!!!");
            }
        } catch (err) {
            console.log(err);
        }
       
    }


    handleCheckout(event)
    {
        if(this.props && this.props.user)
        {
        
            let  eth = parseInt(web3.eth.getBalance(this.props.user.username).toString()) / 1000000000000000000;
            let price = this.state.productInfo.price;
            if(eth > price)
            {
                this.setState({ showModal: true });
                //web3.personal.unlockAccount('0x1b1321ff4df14d41caaed7189762b1c8f49452de', 'chien12d@', 600);
                //let txH = contractInstance.transfer(this.props.user.username, this.state.productInfo.donate, { from: '0x1b1321ff4df14d41caaed7189762b1c8f49452de' });


                //let TxHash = web3.eth.sendTransaction({from: this.props.user.username ,to: "0x1b1321ff4df14d41caaed7189762b1c8f49452de", "gas": "0x76c0", "gasPrice": "0x9184e72a000", "value": "0x" + price.toString(16)});
                //alert(TxHash);
            }else
            {
                alert("Not enough money !!!");
            }
           
            
        }
    }

    handleChange(event) {
        const pass = event.target.value;
        this.setState({pass: pass});
    }

    handleClose(event) {
        this.setState({ showModal: false });
    }

    handleShow(event) {
        this.setState({ showModal: true });
    }


    handleSubmit(event)
    {
        let price = this.state.productInfo.price;
        try {
            let check = web3.personal.unlockAccount(this.props.user.username, this.state.pass, 600);
            console.log(this.props.user.username + '|' + this.state.pass);
            if(check)
            {
                web3.personal.unlockAccount('0x1b1321ff4df14d41caaed7189762b1c8f49452de', 'chien12d@', 600);
                let txH = contractInstance.transfer(this.props.user.username, this.state.productInfo.donate, { from: '0x1b1321ff4df14d41caaed7189762b1c8f49452de' });

                web3.personal.unlockAccount(this.props.user.username, this.state.pass, 600);
                let TxHash = web3.eth.sendTransaction({from: this.props.user.username ,to: "0x1b1321ff4df14d41caaed7189762b1c8f49452de", "gas": "0x76c0", "gasPrice": "0x9184e72a000", "value": "0x" + price.toString(16)});
                this.setState({ showModal: false });
                alert("Success !!!" + TxHash);
            }
            else
            {
                alert("Invalid pass.");
            }
        } catch (error) {
            console.log(error);
        }
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


                <div className="static-modal">
                    <Modal
                      isOpen={this.state.showModal}
                      onRequestClose={this.handleClose.bind(this)}
                      style={customStyles}
                      contentLabel="Account"
                    >
                        <div class="modal-content">
                          <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" onClick={this.handleClose.bind(this)}>&times;</button>
                          </div>
                          <div class="modal-body">
                            <div className={'form-group'}>
                                    <label htmlFor="password">Passphrase</label>
                                    <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
                                    
                            </div>
                           
                          </div>
                          <div class="modal-footer">
                            <button type="button" onClick={this.handleSubmit.bind(this)} className="btn btn-success btn-block dim mb-3">Submit</button>
                          </div>
                        </div>

                      
                    </Modal>
             
                
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

const connectedProduct = connect(mapStateToProps)(Product);
export { connectedProduct as Product };