import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

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



class ProductPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            display_loading: false, 
        };
    }

    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

    handleLike(index, event) {
        this.setState({display_loading: true });
        try {
            if(this.props.user && this.props.user.username)
            {
                if (typeof web3 !== 'undefined') {
                    window.web3 = new Web3();
                    web3.setProvider(provider);
                }
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
        this.setState({display_loading: false });  
    }

    render() {
        const { user, users } = this.props;
        return (
            <div className="col-md-12">

                <h3>List Products</h3>

                {listProduct &&
                    <div className="col">
                        <div className="row">
                            {listProduct.map((product, index) =>
                                <div className="col-12 col-md-6 col-lg-4">
                                    <div className="card">
                                        <img className="card-img-top" src={jpegDemo}/>
                                        <div className="card-body">
                                            <h4 className="card-title"><a href={'/#/product/' + index} title="{product.name}">{product.name}</a></h4>
                                            <p className="card-text">QR Code: 
                                                <QRCode value={document.location.href + '#/product/' + index} />
                                            </p>
                                            <div className="row">
                                                { (product.flag_type == 1) ?
                                                        <div className="col">
                                                            <div className="col">
                                                            Price: <p className="text-danger btn-block">{product.price} ETH</p>
                                                            </div>
                                                            <div className="col">
                                                            Donate: <p className="text-primary btn-block">{product.donate} TOKEN</p>
                                                            </div>
                                                        </div>
                                                    
                                                    :
                                                        <div className="col">
                                                        Price: <p className="text-danger btn-block">{product.token} TOKEN</p>
                                                        </div>

                                                }
                                                

                                                <div className="col">
                                                    <button type="button" onClick={this.handleLike.bind(this, index)} className="btn btn-primary btn-block dim mb-3">Like</button>
                                                </div>
                                                <div className="col">
                                                    <Link class="btn dim btn-success btn-block" to={'/product/' + index}>Detail</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
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

const connectedHomePage = connect(mapStateToProps)(ProductPage);
export { connectedHomePage as ProductPage };