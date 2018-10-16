import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../actions';
import { listProduct } from '../../constants';


class Account extends React.Component {
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
                                                            Price: <p className="text-danger btn-block">0 ETH</p>
                                                            </div>
                                                            <div className="col-12">
                                                            Donate: <p className="text-primary btn-block">0 TOKEN</p>
                                                            </div>
                                                        </div>
                                                
                                                <div className="col">
                                                    <Link class="btn dim btn-success btn-block" to='/product/'>Detail</Link>
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

const connectedAccount = connect(mapStateToProps)(Account);
export { connectedAccount as Account };