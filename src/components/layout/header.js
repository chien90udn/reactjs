import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../actions';
import { typeProduct } from '../../constants';

class Header extends React.Component {

    componentDidMount() {

        this.props.dispatch(userActions.getAll());
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }


    render() {
        const { user, users } = this.props;
        return (
        <div>
        	<nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        		<Link className="navbar-brand" to="/">Market Blockchain</Link>
		      	<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample03" aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation">
		        	<span className="navbar-toggler-icon"></span>
		      	</button>

		      <div className="collapse navbar-collapse" id="navbarsExample03">
		        <ul className="navbar-nav mr-auto">
		        	<li className="nav-item active">
		            	<Link class="nav-link" to="/admin">Admin</Link>
		          	</li>

		        	<li className="nav-item active">
		            	<Link class="nav-link" to="/wallet">Create New Wallet</Link>
		          	</li>

		          	<li className="nav-item active">
		            	<Link class="nav-link" to="/account">Account</Link>
		          	</li>
		          {user ?
		          	<li className="nav-item active">
		            	<Link class="nav-link" to="/login">Logout</Link>
		          	</li>
		          	:
		          	<li className="nav-item active">
		            	<Link class="nav-link" to="/login">Login</Link>
		          	</li>
		          }
		        </ul>
		        
		      </div>
		    </nav>
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

const connectedHeader = connect(mapStateToProps)(Header);
export { connectedHeader as Header };