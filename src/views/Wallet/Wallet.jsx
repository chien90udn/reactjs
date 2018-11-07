import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../../actions';
import axios from 'axios';
import LoadingScreen  from '../../components/common/LoadingScreen.js';

var HttpHeaderProvider = require('httpheaderprovider');

var headers = {
  "Access-Control-Allow-Credential": "true"
}
var provider = new HttpHeaderProvider('http://52.194.193.223:8545', headers);

//
import { default as Web3 } from 'web3';
var keythereum = require("keythereum");

class Wallet extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                password: ''
            },
            newAccount: {
                address : null,
                privateKey : null 
            },
            submitted: false,
            display_loading: false, 
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        if(this.state.user.password.length >= 6)
        {
            this.setState({ submitted: true,
                            display_loading: true });
            try {
                // window.web3 = new Web3(new Web3.providers.HttpProvider("http://52.194.193.223:8545"));
                window.web3 = new Web3();
                web3.setProvider(provider);

                // window.web3 = new Web3(web3.currentProvider);
             
                let newUser = web3.personal.newAccount(this.state.user.password);

             
                this.state.newAccount.address = newUser;
                axios.get('http://52.194.193.223/api/index.php?address=' + newUser)
                      .then(function (response) {

                        // handle success
                        var privateKey = keythereum.recover(this.state.user.password, response.data);
                        this.setState({
                            newAccount: {
                                  ...this.state.newAccount,
                                  privateKey: privateKey.toString('hex')
                            }
                        });
                      }.bind(this));
               
            } catch (err) {
               console.log(err);
            }
            this.setState({display_loading: false });
        }
          
    }

    render() {
        const { registering  } = this.props;
        const { user, submitted } = this.state;
        return (
            <div className="col-md-10 offset-md-1">
                <h2 className="text-center">Create New Wallet</h2>
                {(this.state.newAccount && this.state.newAccount.address) ?
                    <form name="form">
                        <label className="text-center">Save Your <span>Private Key</span>.</label>
                        <div className="form-group">
                             <label >Address</label>
                              <input type="text" disabled className="form-control"  defaultValue={this.state.newAccount.address}/>
                        </div>
                        <div className="form-group">
                             <label >privateKey</label>
                              <input type="text" disabled className="form-control"  defaultValue={this.state.newAccount.privateKey}/>
                        </div>
                        <div className="form-group">
                            <p> You using address register account! </p>
                            **Do not lose it!** It cannot be recovered if you lose it.<br />

                            **Do not share it!** Your funds will be stolen if you use this file on a malicious/phishing site.<br />

                            **Make a backup!** Secure it like the millions of dollars it may one day be worth.<br />
                        </div>
                        <div className="form-group">
                            <Link to="/register" className="btn btn-link">Register</Link>
                            <Link to="/login" className="btn btn-link">Login</Link>
                        </div>
                    </form>
                    :
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                            <label htmlFor="password">Enter a password</label>
                            <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
                            {submitted && !user.password &&
                                <div className="help-block">Your password must be at least 9 characters. Please ensure it is a strong password.</div>
                            }
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary dim btn-lg fa-3x p-xl pt-40">Create New Wallet</button>
                            {registering && 
                                <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                            }
                            <Link to="/register" className="btn btn-link">Register</Link>
                            <Link to="/login" className="btn btn-link">Login</Link>
                        </div>
                    </form>
                    
                }
             <LoadingScreen display={this.state.display_loading} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { registering } = state.registration;
    return {
        registering
    };
}

const connectedWallet = connect(mapStateToProps)(Wallet);
export { connectedWallet as Wallet };