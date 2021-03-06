import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../actions';
import { listProduct } from '../../constants';


class HomePage extends React.Component {
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

                <h3>List Products</h3>

                {listProduct &&
                    <div className="col">
                        <div className="row">
                            {listProduct.map((product, index) =>
                                <div className="col-12 col-md-6 col-lg-4">
                                    <div className="card">
                                        <img className="card-img-top" src="https://dummyimage.com/600x400/55595c/fff"/>
                                        <div className="card-body">
                                            <h4 className="card-title"><a href={'/product/' + index} title="{product.name}">{product.name}</a></h4>
                                            <p className="card-text">QR Code: </p>
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
                                                    <button type="button" className="btn btn-primary btn-block dim mb-3">Like</button>
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

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };