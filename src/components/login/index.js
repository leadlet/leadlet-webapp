import React, { Component } from 'react';

import './style.css';

export default class Login extends Component {

    render() {
        return (
            <div className="gray-bg full-height">

                <div className="loginColumns animated fadeInDown">
                <div className="row">

                    <div className="col-md-6">
                        <h2 className="font-bold">Welcome to LeadLet </h2>

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
                            <form className="m-t" role="form" action="index.html">
                                <div className="form-group">
                                    <input type="email" className="form-control" placeholder="Username" required="" />
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control" placeholder="Password" required="" />
                                </div>
                                <button type="submit" className="btn btn-primary block full-width m-b">Login</button>

                                <a href="#">
                                    <small>Forgot password?</small>
                                </a>

                                <p className="text-muted text-center">
                                    <small>Do not have an account?</small>
                                </p>
                                <a className="btn btn-sm btn-white btn-block" href="register.html">Create an account</a>
                            </form>
                            <p className="m-t">
                                <small>Lorem Ipsum is simply typesetting industry. &copy; 2017</small>
                            </p>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-md-6">
                        Copyright LeadLet Company
                    </div>
                    <div className="col-md-6 text-right">
                        <small>© 2017-2018</small>
                    </div>
                </div>
            </div>

            </div>
        );
    }
}