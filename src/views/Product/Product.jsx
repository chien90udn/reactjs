import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../actions';
import { listProduct } from '../../constants';


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
                                        <img className="card-img-top" src="https://dummyimage.com/600x400/55595c/fff"/>
                                        <div className="card-body">
                                            <h4 className="card-title"><a title="{this.state.productInfo.name}">{this.state.productInfo.name}</a></h4>
                                            <p className="card-text">QR Code: </p>
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
                                                    <button type="button" className="btn btn-success btn-block dim mb-3">Checkout</button>
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