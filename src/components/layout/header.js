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
            <div className="row border-bottom">
                <nav className="navbar navbar-static-top white-bg" role="navigation" style={{marginBottom: 0}}>


                      	<div className="container-fluid">
                        	<div className="navbar-header">
	                          	<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
		                            <span className="sr-only">Toggle navigation</span>
		                            <span className="icon-bar"></span>
		                            <span className="icon-bar"></span>
		                            <span className="icon-bar"></span>
	                          	</button>
                        	</div>



                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                          <ul className="nav navbar-nav">

                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle active" data-toggle='dropdown'>
                                    <i className="fa fa-th-large"></i> 案件 <span className="caret"></span>
                                </a>
                                <ul className='dropdown-menu' role='menu' aria-labelledby='dropdownMenu' style={{ paddingTop: "1rem", paddingBottom: ".8rem" }}>
                                    <li><Link to="/plans/top"><span className="nav-label">新規に追加</span></Link></li>
                                    <li><Link to="/plans/list"><span className="nav-label">案件一覧</span></Link></li>
                                    <li><Link to="/plans/status_board">案件ステータス</Link></li>
                                </ul>
                            </li>

                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle active" data-toggle='dropdown'>
                                    <i className="fa fa-th-large"></i> 作業場 <span className="caret"></span>
                                </a>
                                <ul className='dropdown-menu' role='menu' aria-labelledby='dropdownMenu' style={{ paddingTop: "1rem", paddingBottom: ".8rem" }}>
                                    <li><Link to="/gantt/chart"><span className="nav-label">作業日程表</span></Link></li>
                                </ul>
                            </li>


                            <li >
                                <Link to="plan/mediamap"><i className="fa fa-th-large"></i> <span className="nav-label">媒体マップ</span></Link>
                            </li>

                             <li >
                                <Link to="/performances"><i className="fa fa-th-large"></i> <span className="nav-label">実績</span></Link>
                            </li>
                            
                        </ul>
                        <ul className="nav navbar-nav navbar-right-buttons">
                            { ( this.state.right_buttons ) ?
                                this.state.right_buttons.map( ( e, i ) => <li key={i}>{ e }</li> ) : <li className="empty"></li>
                            }
                        </ul>
                        <ul className="nav navbar-top-links navbar-right">
                            <li>
                                <a href="#" onClick={ } >
                                    <i className="fa fa-sign-out"></i> Log out
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
      );
    }
}

const mapStateToProps = ( state ) => ({ user: state.user });
export default connect(mapStateToProps)(Header)