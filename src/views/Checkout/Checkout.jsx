import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import {validateEmail}  from '../../components/common/helpers';
var QRCode = require('qrcode.react');
import { userActions } from '../../actions';

class Checkout extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());

        this.state = {
            username: '',
            password: '',
            submitted: false,
            show_qr_code: false,
            url_code : 'weixin://wxpay/bizpayurl?pr=W8hWg4X'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && validateEmail(username)) {
            this.setState({ show_qr_code: true });
            try {
                
                axios.get('http://52.199.160.114/api/example/api.php?action=createCodeURL')
                      .then(function (response) {
                            this.setState({ url_code: response });
                            console.log("Get URL CODE OK");
                            console.log(response);
                        axios.get('http://52.199.160.114/api/example/api.php?action=sendMail&email=' + username)
                              .then(function (response) {
                                // handle success
                                console.log(response);
                            }.bind(this));
                    }.bind(this));
            } catch (err) {
               console.log(err);
            }
        }
    }

    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;
       
        return (
            <div className="col-md-10 offset-md-1">
                <h2 className="text-center">Checkout</h2>
                <div style={{
                            display: ( !this.state.show_qr_code ? 'block' : 'none' )
                        }}>
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                            <label htmlFor="username">Email</label>
                            <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
                            {submitted && (!username || !validateEmail(username))  &&
                                <div className="help-block">Email is required</div>
                            }
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary">Payment</button>
                        </div>
                    </form>
                </div>
                <div style={{
                            display: ( !this.state.show_qr_code ? 'none' : 'block' )
                        }}>
                    <div id="qrcodeforwechat" className="card-text">
                        QR Code For Wechat Pay: 
                        <img src={"http://52.199.160.114/api/example/qrcode.php?data=" + this.state.url_code} />
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedCheckout = connect(mapStateToProps)(Checkout);
export { connectedCheckout as Checkout }; 