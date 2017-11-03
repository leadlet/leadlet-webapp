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
        if ( user.login && user.password ) {
            dispatch(userActions.register(user, this.props));
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
                        <h2 className="logo-name">Leadlet</h2>
                    </div>
                    <h3>Register to Leadlet</h3>
                    <p>Create account to see it in action.</p>
                    <form className="m-t" role="form" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input type="email" className="form-control" name="login" placeholder="E-mail" required="" onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" name="password" placeholder="Password" required="" onChange={this.handleChange} />
                        </div>
                        <button type="submit" className="btn btn-primary block full-width m-b">Register</button>

                        <p className="text-muted text-center"><small>Already have an account?</small></p>
                        <a className="btn btn-sm btn-white btn-block" href="/login">Login</a>
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