import React from 'react';
import { connect } from 'react-redux';

import { login,logout } from '../../actions/user.actions';
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
            <div className="gray-bg">
                <div className="loginColumns animated fadeInDown">
                    <div className="row">
                        <div className="col-md-6">
                            <h2 className="font-bold">Welcome to Leadlet</h2>
                            <p>
                                Perfectly designed and precisely prepared admin theme with over 50 pages with extra new web app views.
                            </p>
                            <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                            </p>
                            <p>
                                When an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </p>
                            <p>
                                <small>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</small>
                            </p>

                        </div>
                        <div className="col-md-6">
                            <div className="ibox-content">
                                <form className="m-t" onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <input type="email" className="form-control" placeholder="Username" name="username" required="" onChange={this.handleChange}/>
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control" placeholder="Password" name="password" required="" onChange={this.handleChange}/>
                                    </div>
                                    <button type="submit" className="btn btn-primary block full-width m-b">Login</button>

                                    <a href="/#">
                                        <small>Forgot password?</small>
                                    </a>

                                    <p className="text-muted text-center">
                                        <small>Do not have an account?</small>
                                    </p>
                                    <a className="btn btn-sm btn-white btn-block" href="/register">Create an account</a>
                                </form>
                                <p className="m-t">
                                    <small>Inspinia we app framework base on Bootstrap 3 &copy; 2014</small>
                                </p>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-md-6">
                            Copyright Example Company
                        </div>
                        <div className="col-md-6 text-right">
                            <small>© 2014-2015</small>
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

const connectedLoginPage = connect(mapStateToProps,{login,getAccount,logout})(LoginPage);
export { connectedLoginPage as LoginPage }; 