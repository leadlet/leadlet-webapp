import React from 'react';
import { connect } from 'react-redux';

import { userActions } from '../../actions/index';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                login: '',
                password: ''
            },
            submitted: false
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

        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;
        if (user.login && user.password) {
            dispatch(userActions.register(user, this.props));
        }
    }

    render() {
        return (
            <div className="container-fluid login-wrapper">
                <div className="row full-height">
                    <div className="col-md-6 full-height no-padding">
                        <div className="login-left full-height no-padding">
                            <div className="welcome-area center-center ">
                                <div className="logo">
                                    <img src="img/theme/logo-dark.png" alt="Company Logo" />
                                </div>
                                <div className="headline">
                                    <h3>Sign Up To Panel</h3>
                                </div>
                                <form className="login-form" onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <input type="email" className="form-control" name="login" placeholder="E-mail" required="" onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control" name="password" placeholder="Password" required="" onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-air btn-pill btn-purple">Sign Up</button>
                                    </div>
                                </form>
                            </div>
                            <div className="login-bottom">
                                <p>Already have an account? <a href="/login">Sign In</a></p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 full-height no-padding">
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
    const { registering } = state.registration;
    return {
        registering
    };
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export { connectedRegisterPage as RegisterPage };