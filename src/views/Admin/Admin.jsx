import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../actions';
import { listProduct } from '../../constants';


class Admin extends React.Component {

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
                
                <h3>All registered users:</h3>
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}

                {users.items &&
                    <div className="col">
                        <div className="row">
                            {users.items.map((user, index) =>
                                <div className="col-12 mb-2 p-2">
                                    <div className="card">
                                        <p>Account: {user.username} </p>
                                        <p>Balance: 0 ETH</p>
                                        <p>BalanceOf: 0 TOKEN</p>
                                        <div className="col-12">
                                            {
                                                user.deleting ? <em> - Deleting...</em>
                                                : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                                : <button className="btn btn-danger" onClick={this.handleDeleteUser(user.id)}>Delete</button>
                                            }
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

const connectedAdmin = connect(mapStateToProps)(Admin);
export { connectedAdmin as Admin};