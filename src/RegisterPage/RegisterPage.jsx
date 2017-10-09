import React from 'react';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                login: '',
                email: '',
                firstName: '',
                lastName: '',
                companyName: '',
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
        if (user.firstName && user.lastName && user.login && user.password
                && user.password && user.companyName ) {
            dispatch(userActions.register(user));
        }
    }


    render() {
        const { registering  } = this.props;
        const { user, submitted } = this.state;
        return (
            <div className="gray-bg">

            <div className="middle-box text-center loginscreen   animated fadeInDown">
                <div>
                    <div>
                        <h1 className="logo-name">IN+</h1>
                    </div>
                    <h3>Register to IN+</h3>
                    <p>Create account to see it in action.</p>
                    <form className="m-t" role="form" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input type="text" className="form-control" name="firstName" placeholder="First Name" required="" onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" name="lastName" placeholder="Last Name" required="" onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" name="login" placeholder="Login" required="" onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <input type="email" className="form-control" name="email" placeholder="Email" required="" onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" name="companyName" placeholder="Company Name" required="" onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" name="password" placeholder="Password" required="" onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <div className="checkbox i-checks"><label> <input type="checkbox" /><i></i> Agree the terms and policy </label></div>
                        </div>
                        <button type="submit" className="btn btn-primary block full-width m-b">Register</button>

                        <p className="text-muted text-center"><small>Already have an account?</small></p>
                        <a className="btn btn-sm btn-white btn-block" href="login.html">Login</a>
                    </form>
                    <p className="m-t"> <small>Inspinia we app framework base on Bootstrap 3 &copy; 2014</small> </p>
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