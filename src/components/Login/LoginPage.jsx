import React from 'react';
import { connect } from 'react-redux';

import { login, logout } from '../../actions/user.actions';
import { getAccount } from '../../actions/account.actions';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.props.logout();

        this.state = {
            username: '',
            password: '',
            submitted: false
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
        if (username && password) {
            // TODO passing props is workaround
            this.props.login(username, password, this.props, this.props.getAccount);
        }
    }

    render() {
        return (
            <div className="container-fluid login-wrapper">
                <div className="row full-height">
                    <div className="col-md-5 full-height no-padding">
                        <div className="login-left full-height no-padding">

                            <div className="welcome-area center-center ">
                                <div className="logo">
                                    <img src="img/theme/logo-dark.png" alt="Leadonly Logo" />
                                </div>
                                <div className="headline">
                                    <h3>Sign In To Panel</h3>
                                </div>
                                <form className="login-form" onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <input type="email" className="form-control" placeholder="Username" name="username" required="" onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control" placeholder="Password" name="password" required="" onChange={this.handleChange} />
                                    </div>
                                    <div className="form-gorup">
                                        <a href="/#" className="forgot-password">
                                            Forgot password?
                                        </a>
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-air btn-pill btn-purple">Sign In</button>
                                    </div>
                                </form>
                            </div>
                            <div className="login-bottom">
                                <p>Don't have an account yet? <a href="https://merchant.leadonly.co/#/login?action=signup">Sign Up</a></p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-7 full-height no-padding">
                        <div className="login-right full-height no-padding">
                            <div className="login-text">
                                <h3>Your Lead Management Partner</h3>
                                <p>Single platform integrating various ad channels to measure conversion performance and track end to end customer journey.</p>
                            </div>
                        </div>
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

const connectedLoginPage = connect(mapStateToProps, { login, getAccount, logout })(LoginPage);
export { connectedLoginPage as LoginPage }; 