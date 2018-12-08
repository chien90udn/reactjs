import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import {validateEmail}  from '../../components/common/helpers';
var QRCode = require('qrcode.react');
import { userActions } from '../../actions';
import LoadingScreen  from '../../components/common/LoadingScreen.js';

class Checkout extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());

        this.state = {
            email: '',
            confirm_email: '',
            submitted: false,
            show_qr_code: false,
            disabled: false,
            display_loading: false,
            url_code : 'weixin://wxpay/bizpayurl?pr=W8hWg4X'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handlePaste(e){
        this.setState({ disabled: true });
        alert("Not allowed");
        setTimeout(function(){
          this.setState({ disabled: false }); 
        }.bind(this), 500);
        return false;
    }

   
    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        const { email, confirm_email } = this.state;
        const { dispatch } = this.props;
        if (email && validateEmail(email) && email == confirm_email) {
            this.setState({ show_qr_code: true ,
                            display_loading: true});
            try {
                
                axios.get('http://18.179.53.198/api/example/api.php?action=createCodeURL')
                      .then(function (response) {
                            this.setState({ url_code: response.data });
                            console.log(response);
                        axios.get('http://18.179.53.198/api/example/api.php?action=sendMail&email=' + email)
                              .then(function (response) {
                                // handle success
                                console.log(response);
                            }.bind(this));
                        this.setState({ display_loading: false});
                    }.bind(this))
                    .catch(error => {
                        this.setState({ display_loading: false});
                    });
            } catch (err) {
               console.log(err);
               this.setState({ display_loading: false});
            }
        }
    }

    render() {
        const { loggingIn } = this.props;
        const { email ,submitted, confirm_email, disabled } = this.state;
       
        return (
            <div className="col-md-10 offset-md-1">
                <h2 className="text-center">INFO CART</h2>
                <div style={{
                            display: ( !this.state.show_qr_code ? 'block' : 'none' )
                        }}>
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
                            <label htmlFor="email">Email</label>
                            <input type="text" className="form-control" name="email" value={email} onChange={this.handleChange} />
                            {submitted && (!email || !validateEmail(email))  &&
                                <div className="help-block">Email is required</div>
                            }
                        </div>
                         <div className={'form-group' + (submitted && !confirm_email ? ' has-error' : '')}>
                            <label htmlFor="confirm_email">Confirm Email</label>
                            <input disabled = {disabled} onPaste={(e) => this.handlePaste(e)} type="text" className="form-control" name="confirm_email" value={confirm_email} onChange={this.handleChange} />
                            {submitted && (!confirm_email || !validateEmail(confirm_email))  &&
                                <div className="help-block">Confirm email is required</div>
                            }
                            {submitted && validateEmail(confirm_email) && validateEmail(email) && confirm_email != email  &&
                                <div className="help-block">Confirm email does not match</div>
                            }
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary">Proceed to checkout</button>
                        </div>
                    </form>
                </div>
                <div style={{
                            display: ( !this.state.show_qr_code ? 'none' : 'block' )
                        }}>
                    <div id="qrcodeforwechat" className="card-text">
                        QR Code For Wechat Pay: 
                        <img src={"http://18.179.53.198/api/example/qrcode.php?data=" + this.state.url_code} />
                    </div>
                </div>
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


const connectedCheckout = connect(mapStateToProps)(Checkout);
export { connectedCheckout as Checkout }; 