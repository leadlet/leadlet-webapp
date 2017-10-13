import React, { Component } from 'react';
import {Scrollbars} from "react-custom-scrollbars";
import {Tab, Tabs} from "react-bootstrap";

class OrganizationList extends Component {


    render() {
        return (
            <Scrollbars style={{ height: '100%' }}>
                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <tbody>
                        <tr>
                            <td className="client-avatar"><img alt="image" src="img/a2.jpg" /> </td>
                            <td><a data-toggle="tab" href="#contact-1" className="client-link">A2nthony Jackson</a></td>
                            <td> Tellus Institute</td>
                            <td className="contact-type"><i className="fa fa-envelope"> </i></td>
                            <td> gravida@rbisit.com</td>
                            <td className="client-status"><span className="label label-primary">Active</span></td>
                        </tr>
                        <tr>
                            <td className="client-avatar"><img alt="image" src="img/a3.jpg" /> </td>
                            <td><a data-toggle="tab" href="#contact-2" className="client-link">Rooney Lindsay</a></td>
                            <td>Proin Limited</td>
                            <td className="contact-type"><i className="fa fa-envelope"> </i></td>
                            <td> rooney@proin.com</td>
                            <td className="client-status"><span className="label label-primary">Active</span></td>
                        </tr>
                        <tr>
                            <td className="client-avatar"><img alt="image" src="img/a4.jpg" /> </td>
                            <td><a data-toggle="tab" href="#contact-3" className="client-link">Lionel Mcmillan</a></td>
                            <td>Et Industries</td>
                            <td className="contact-type"><i className="fa fa-phone"> </i></td>
                            <td> +432 955 908</td>
                            <td className="client-status"/>
                        </tr>
                        <tr>
                            <td className="client-avatar"><a href=""><img alt="image" src="img/a5.jpg" /></a> </td>
                            <td><a data-toggle="tab" href="#contact-4" className="client-link">Edan Randall</a></td>
                            <td>Integer Sem Corp.</td>
                            <td className="contact-type"><i className="fa fa-phone"> </i></td>
                            <td> +422 600 213</td>
                            <td className="client-status"><span className="label label-warning">Waiting</span></td>
                        </tr>
                        <tr>
                            <td className="client-avatar"><a href=""><img alt="image" src="img/a6.jpg" /></a> </td>
                            <td><a data-toggle="tab" href="#contact-2" className="client-link">Jasper Carson</a></td>
                            <td>Mone Industries</td>
                            <td className="contact-type"><i className="fa fa-phone"> </i></td>
                            <td> +400 468 921</td>
                            <td className="client-status"/>
                        </tr>
                        <tr>
                            <td className="client-avatar"><a href=""><img alt="image" src="img/a7.jpg" /></a> </td>
                            <td><a data-toggle="tab" href="#contact-3" className="client-link">Reuben Pacheco</a></td>
                            <td>Magna Associates</td>
                            <td className="contact-type"><i className="fa fa-envelope"> </i></td>
                            <td> pacheco@manga.com</td>
                            <td className="client-status"><span className="label label-info">Phoned</span></td>
                        </tr>
                        <tr>
                            <td className="client-avatar"><a href=""><img alt="image" src="img/a1.jpg" /></a> </td>
                            <td><a data-toggle="tab" href="#contact-1" className="client-link">Simon Carson</a></td>
                            <td>Erat Corp.</td>
                            <td className="contact-type"><i className="fa fa-envelope"> </i></td>
                            <td> Simon@erta.com</td>
                            <td className="client-status"><span className="label label-primary">Active</span></td>
                        </tr>
                        <tr>
                            <td className="client-avatar"><a href=""><img alt="image" src="img/a3.jpg" /></a> </td>
                            <td><a data-toggle="tab" href="#contact-2" className="client-link">Rooney Lindsay</a></td>
                            <td>Proin Limited</td>
                            <td className="contact-type"><i className="fa fa-envelope"> </i></td>
                            <td> rooney@proin.com</td>
                            <td className="client-status"><span className="label label-warning">Waiting</span></td>
                        </tr>
                        <tr>
                            <td className="client-avatar"><a href=""><img alt="image" src="img/a4.jpg" /></a> </td>
                            <td><a data-toggle="tab" href="#contact-3" className="client-link">Lionel Mcmillan</a></td>
                            <td>Et Industries</td>
                            <td className="contact-type"><i className="fa fa-phone"> </i></td>
                            <td> +432 955 908</td>
                            <td className="client-status"/>
                        </tr>
                        <tr>
                            <td className="client-avatar"><a href=""><img alt="image" src="img/a5.jpg" /></a> </td>
                            <td><a data-toggle="tab" href="#contact-4" className="client-link">Edan Randall</a></td>
                            <td>Integer Sem Corp.</td>
                            <td className="contact-type"><i className="fa fa-phone"> </i></td>
                            <td> +422 600 213</td>
                            <td className="client-status"/>
                        </tr>
                        <tr>
                            <td className="client-avatar"><a href=""><img alt="image" src="img/a2.jpg" /></a> </td>
                            <td><a data-toggle="tab" href="#contact-1" className="client-link">Anthony Jackson</a></td>
                            <td> Tellus Institute</td>
                            <td className="contact-type"><i className="fa fa-envelope"> </i></td>
                            <td> gravida@rbisit.com</td>
                            <td className="client-status"><span className="label label-danger">Deleted</span></td>
                        </tr>
                        <tr>
                            <td className="client-avatar"><a href=""><img alt="image" src="img/a7.jpg" /></a> </td>
                            <td><a data-toggle="tab" href="#contact-2" className="client-link">Reuben Pacheco</a></td>
                            <td>Magna Associates</td>
                            <td className="contact-type"><i className="fa fa-envelope"> </i></td>
                            <td> pacheco@manga.com</td>
                            <td className="client-status"><span className="label label-primary">Active</span></td>
                        </tr>
                        <tr>
                            <td className="client-avatar"><a href=""><img alt="image" src="img/a5.jpg" /></a> </td>
                            <td><a data-toggle="tab" href="#contact-3"className="client-link">Edan Randall</a></td>
                            <td>Integer Sem Corp.</td>
                            <td className="contact-type"><i className="fa fa-phone"> </i></td>
                            <td> +422 600 213</td>
                            <td className="client-status"><span className="label label-info">Phoned</span></td>
                        </tr>
                        <tr>
                            <td className="client-avatar"><a href=""><img alt="image" src="img/a6.jpg" /></a> </td>
                            <td><a data-toggle="tab" href="#contact-4" className="client-link">Jasper Carson</a></td>
                            <td>Mone Industries</td>
                            <td className="contact-type"><i className="fa fa-phone"> </i></td>
                            <td> +400 468 921</td>
                            <td className="client-status"><span className="label label-primary">Active</span></td>
                        </tr>
                        <tr>
                            <td className="client-avatar"><a href=""><img alt="image" src="img/a7.jpg" /></a> </td>
                            <td><a data-toggle="tab" href="#contact-2" className="client-link">Reuben Pacheco</a></td>
                            <td>Magna Associates</td>
                            <td className="contact-type"><i className="fa fa-envelope"> </i></td>
                            <td> pacheco@manga.com</td>
                            <td className="client-status"><span className="label label-primary">Active</span></td>
                        </tr>
                        <tr>
                            <td className="client-avatar"><a href=""><img alt="image" src="img/a1.jpg" /></a> </td>
                            <td><a data-toggle="tab" href="#contact-1" className="client-link">Simon Carson</a></td>
                            <td>Erat Corp.</td>
                            <td className="contact-type"><i className="fa fa-envelope"> </i></td>
                            <td> Simon@erta.com</td>
                            <td className="client-status"/>
                        </tr>
                        <tr>
                            <td className="client-avatar"><a href=""><img alt="image" src="img/a3.jpg" /></a> </td>
                            <td><a data-toggle="tab" href="#contact-3" className="client-link">Rooney Lindsay</a></td>
                            <td>Proin Limited</td>
                            <td className="contact-type"><i className="fa fa-envelope"> </i></td>
                            <td> rooney@proin.com</td>
                            <td className="client-status"/>
                        </tr>
                        <tr>
                            <td className="client-avatar"><a href=""><img alt="image" src="img/a4.jpg" /></a> </td>
                            <td><a data-toggle="tab" href="#contact-4" className="client-link">Lionel Mcmillan</a></td>
                            <td>Et Industries</td>
                            <td className="contact-type"><i className="fa fa-phone"> </i></td>
                            <td> +432 955 908</td>
                            <td className="client-status"><span className="label label-primary">Active</span></td>
                        </tr>
                        <tr>
                            <td className="client-avatar"><a href=""><img alt="image" src="img/a5.jpg" /></a> </td>
                            <td><a data-toggle="tab" href="#contact-1" className="client-link">Edan Randall</a></td>
                            <td>Integer Sem Corp.</td>
                            <td className="contact-type"><i className="fa fa-phone"> </i></td>
                            <td> +422 600 213</td>
                            <td className="client-status"><span className="label label-info">Phoned</span></td>
                        </tr>
                        <tr>
                            <td className="client-avatar"><a href=""><img alt="image" src="img/a2.jpg" /></a> </td>
                            <td><a data-toggle="tab" href="#contact-2" className="client-link">Anthony Jackson</a></td>
                            <td> Tellus Institute</td>
                            <td className="contact-type"><i className="fa fa-envelope"> </i></td>
                            <td> gravida@rbisit.com</td>
                            <td className="client-status"><span className="label label-warning">Waiting</span></td>
                        </tr>
                        <tr>
                            <td className="client-avatar"><a href=""><img alt="image" src="img/a7.jpg" /></a> </td>
                            <td><a data-toggle="tab" href="#contact-4" className="client-link">Reuben Pacheco</a></td>
                            <td>Magna Associates</td>
                            <td className="contact-type"><i className="fa fa-envelope"> </i></td>
                            <td> pacheco@manga.com</td>
                            <td className="client-status"/>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </Scrollbars>
        );
    }

}

export default OrganizationList;