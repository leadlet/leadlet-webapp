import React, { Component } from 'react';

import './style.css';

export default class Home extends Component {

    render() {
        const divStyle = {
            marginBottom: 0
        };

        return (
            <div className="">

            <div id="wrapper">

                <nav className="navbar-default navbar-static-side" role="navigation">
                    <div className="sidebar-collapse">
                        <ul className="nav metismenu" id="side-menu">
                            <li className="nav-header">
                                <div className="dropdown profile-element">
                                    <span>
                                        <img alt="image" className="img-circle" src="img/profile_small.jpg" />
                                    </span>
                                    <a data-toggle="dropdown" className="dropdown-toggle" href="#">
                            <span className="clear"> <span className="block m-t-xs"> <strong className="font-bold">David Williams</strong>
                             </span> <span className="text-muted text-xs block">Art Director <b className="caret"></b></span> </span> </a>
                                    <ul className="dropdown-menu animated fadeInRight m-t-xs">
                                        <li><a href="profile.html">Profile</a></li>
                                        <li><a href="contacts.html">Contacts</a></li>
                                        <li><a href="mailbox.html">Mailbox</a></li>
                                        <li className="divider"></li>
                                        <li><a href="login.html">Logout</a></li>
                                    </ul>
                                </div>
                                <div className="logo-element">
                                    IN+
                                </div>
                            </li>
                            <li>
                                <a href="index.html"><i className="fa fa-th-large"></i> <span className="nav-label">Dashboards</span> <span className="fa arrow"></span></a>
                                <ul className="nav nav-second-level collapse">
                                    <li><a href="index.html">Dashboard v.1</a></li>
                                    <li><a href="dashboard_2.html">Dashboard v.2</a></li>
                                    <li><a href="dashboard_3.html">Dashboard v.3</a></li>
                                    <li><a href="dashboard_4_1.html">Dashboard v.4</a></li>
                                    <li><a href="dashboard_5.html">Dashboard v.5 </a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="layouts.html"><i className="fa fa-diamond"></i> <span className="nav-label">Layouts</span></a>
                            </li>
                            <li>
                                <a href="#"><i className="fa fa-bar-chart-o"></i> <span className="nav-label">Graphs</span><span className="fa arrow"></span></a>
                                <ul className="nav nav-second-level collapse">
                                    <li><a href="graph_flot.html">Flot Charts</a></li>
                                    <li><a href="graph_morris.html">Morris.js Charts</a></li>
                                    <li><a href="graph_rickshaw.html">Rickshaw Charts</a></li>
                                    <li><a href="graph_chartjs.html">Chart.js</a></li>
                                    <li><a href="graph_chartist.html">Chartist</a></li>
                                    <li><a href="c3.html">c3 charts</a></li>
                                    <li><a href="graph_peity.html">Peity Charts</a></li>
                                    <li><a href="graph_sparkline.html">Sparkline Charts</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="mailbox.html"><i className="fa fa-envelope"></i> <span className="nav-label">Mailbox </span><span className="label label-warning pull-right">16/24</span></a>
                                <ul className="nav nav-second-level collapse">
                                    <li><a href="mailbox.html">Inbox</a></li>
                                    <li><a href="mail_detail.html">Email view</a></li>
                                    <li><a href="mail_compose.html">Compose email</a></li>
                                    <li><a href="email_template.html">Email templates</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="metrics.html"><i className="fa fa-pie-chart"></i> <span className="nav-label">Metrics</span>  </a>
                            </li>
                            <li>
                                <a href="widgets.html"><i className="fa fa-flask"></i> <span className="nav-label">Widgets</span></a>
                            </li>
                            <li>
                                <a href="#"><i className="fa fa-edit"></i> <span className="nav-label">Forms</span><span className="fa arrow"></span></a>
                                <ul className="nav nav-second-level collapse">
                                    <li><a href="form_basic.html">Basic form</a></li>
                                    <li><a href="form_advanced.html">Advanced Plugins</a></li>
                                    <li><a href="form_wizard.html">Wizard</a></li>
                                    <li><a href="form_file_upload.html">File Upload</a></li>
                                    <li><a href="form_editors.html">Text Editor</a></li>
                                    <li><a href="form_autocomplete.html">Autocomplete</a></li>
                                    <li><a href="form_markdown.html">Markdown</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="#"><i className="fa fa-desktop"></i> <span className="nav-label">App Views</span>  <span className="pull-right label label-primary">SPECIAL</span></a>
                                <ul className="nav nav-second-level collapse">
                                    <li><a href="contacts.html">Contacts</a></li>
                                    <li><a href="profile.html">Profile</a></li>
                                    <li><a href="profile_2.html">Profile v.2</a></li>
                                    <li><a href="contacts_2.html">Contacts v.2</a></li>
                                    <li><a href="projects.html">Projects</a></li>
                                    <li><a href="project_detail.html">Project detail</a></li>
                                    <li><a href="activity_stream.html">Activity stream</a></li>
                                    <li><a href="teams_board.html">Teams board</a></li>
                                    <li><a href="social_feed.html">Social feed</a></li>
                                    <li><a href="clients.html">Clients</a></li>
                                    <li><a href="full_height.html">Outlook view</a></li>
                                    <li><a href="vote_list.html">Vote list</a></li>
                                    <li><a href="file_manager.html">File manager</a></li>
                                    <li><a href="calendar.html">Calendar</a></li>
                                    <li><a href="issue_tracker.html">Issue tracker</a></li>
                                    <li><a href="blog.html">Blog</a></li>
                                    <li><a href="article.html">Article</a></li>
                                    <li><a href="faq.html">FAQ</a></li>
                                    <li><a href="timeline.html">Timeline</a></li>
                                    <li><a href="pin_board.html">Pin board</a></li>
                                </ul>
                            </li>
                            <li className="active">
                                <a href="#"><i className="fa fa-files-o"></i> <span className="nav-label">Other Pages</span><span className="fa arrow"></span></a>
                                <ul className="nav nav-second-level">
                                    <li><a href="search_results.html">Search results</a></li>
                                    <li><a href="lockscreen.html">Lockscreen</a></li>
                                    <li><a href="invoice.html">Invoice</a></li>
                                    <li><a href="login.html">Login</a></li>
                                    <li><a href="login_two_columns.html">Login v.2</a></li>
                                    <li><a href="forgot_password.html">Forget password</a></li>
                                    <li><a href="register.html">Register</a></li>
                                    <li><a href="404.html">404 Page</a></li>
                                    <li><a href="500.html">500 Page</a></li>
                                    <li className="active"><a href="empty_page.html">Empty page</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="#"><i className="fa fa-globe"></i> <span className="nav-label">Miscellaneous</span><span className="label label-info pull-right">NEW</span></a>
                                <ul className="nav nav-second-level collapse">
                                    <li><a href="toastr_notifications.html">Notification</a></li>
                                    <li><a href="nestable_list.html">Nestable list</a></li>
                                    <li><a href="agile_board.html">Agile board</a></li>
                                    <li><a href="timeline_2.html">Timeline v.2</a></li>
                                    <li><a href="diff.html">Diff</a></li>
                                    <li><a href="pdf_viewer.html">PDF viewer</a></li>
                                    <li><a href="i18support.html">i18 support</a></li>
                                    <li><a href="sweetalert.html">Sweet alert</a></li>
                                    <li><a href="idle_timer.html">Idle timer</a></li>
                                    <li><a href="truncate.html">Truncate</a></li>
                                    <li><a href="password_meter.html">Password meter</a></li>
                                    <li><a href="spinners.html">Spinners</a></li>
                                    <li><a href="spinners_usage.html">Spinners usage</a></li>
                                    <li><a href="tinycon.html">Live favicon</a></li>
                                    <li><a href="google_maps.html">Google maps</a></li>
                                    <li><a href="datamaps.html">Datamaps</a></li>
                                    <li><a href="social_buttons.html">Social buttons</a></li>
                                    <li><a href="code_editor.html">Code editor</a></li>
                                    <li><a href="modal_window.html">Modal window</a></li>
                                    <li><a href="clipboard.html">Clipboard</a></li>
                                    <li><a href="text_spinners.html">Text spinners</a></li>
                                    <li><a href="forum_main.html">Forum view</a></li>
                                    <li><a href="validation.html">Validation</a></li>
                                    <li><a href="tree_view.html">Tree view</a></li>
                                    <li><a href="loading_buttons.html">Loading buttons</a></li>
                                    <li><a href="chat_view.html">Chat view</a></li>
                                    <li><a href="masonry.html">Masonry</a></li>
                                    <li><a href="tour.html">Tour</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="#"><i className="fa fa-flask"></i> <span className="nav-label">UI Elements</span><span className="fa arrow"></span></a>
                                <ul className="nav nav-second-level collapse">
                                    <li><a href="typography.html">Typography</a></li>
                                    <li><a href="icons.html">Icons</a></li>
                                    <li><a href="draggable_panels.html">Draggable Panels</a></li> <li><a href="resizeable_panels.html">Resizeable Panels</a></li>
                                    <li><a href="buttons.html">Buttons</a></li>
                                    <li><a href="video.html">Video</a></li>
                                    <li><a href="tabs_panels.html">Panels</a></li>
                                    <li><a href="tabs.html">Tabs</a></li>
                                    <li><a href="notifications.html">Notifications & Tooltips</a></li>
                                    <li><a href="helper_classes.html">Helper css classes</a></li>
                                    <li><a href="badges_labels.html">Badges, Labels, Progress</a></li>
                                </ul>
                            </li>

                            <li>
                                <a href="grid_options.html"><i className="fa fa-laptop"></i> <span className="nav-label">Grid options</span></a>
                            </li>
                            <li>
                                <a href="#"><i className="fa fa-table"></i> <span className="nav-label">Tables</span><span className="fa arrow"></span></a>
                                <ul className="nav nav-second-level collapse">
                                    <li><a href="table_basic.html">Static Tables</a></li>
                                    <li><a href="table_data_tables.html">Data Tables</a></li>
                                    <li><a href="table_foo_table.html">Foo Tables</a></li>
                                    <li><a href="jq_grid.html">jqGrid</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="#"><i className="fa fa-shopping-cart"></i> <span className="nav-label">E-commerce</span><span className="fa arrow"></span></a>
                                <ul className="nav nav-second-level collapse">
                                    <li><a href="ecommerce_products_grid.html">Products grid</a></li>
                                    <li><a href="ecommerce_product_list.html">Products list</a></li>
                                    <li><a href="ecommerce_product.html">Product edit</a></li>
                                    <li><a href="ecommerce_product_detail.html">Product detail</a></li>
                                    <li><a href="ecommerce-cart.html">Cart</a></li>
                                    <li><a href="ecommerce-orders.html">Orders</a></li>
                                    <li><a href="ecommerce_payments.html">Credit Card form</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="#"><i className="fa fa-picture-o"></i> <span className="nav-label">Gallery</span><span className="fa arrow"></span></a>
                                <ul className="nav nav-second-level collapse">
                                    <li><a href="basic_gallery.html">Lightbox Gallery</a></li>
                                    <li><a href="slick_carousel.html">Slick Carousel</a></li>
                                    <li><a href="carousel.html">Bootstrap Carousel</a></li>

                                </ul>
                            </li>
                            <li>
                                <a href="#"><i className="fa fa-sitemap"></i> <span className="nav-label">Menu Levels </span><span className="fa arrow"></span></a>
                                <ul className="nav nav-second-level collapse">
                                    <li>
                                        <a href="#">Third Level <span className="fa arrow"></span></a>
                                        <ul className="nav nav-third-level">
                                            <li>
                                                <a href="#">Third Level Item</a>
                                            </li>
                                            <li>
                                                <a href="#">Third Level Item</a>
                                            </li>
                                            <li>
                                                <a href="#">Third Level Item</a>
                                            </li>

                                        </ul>
                                    </li>
                                    <li><a href="#">Second Level Item</a></li>
                                    <li>
                                        <a href="#">Second Level Item</a></li>
                                    <li>
                                        <a href="#">Second Level Item</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="css_animation.html"><i className="fa fa-magic"></i> <span className="nav-label">CSS Animations </span><span className="label label-info pull-right">62</span></a>
                            </li>
                            <li className="landing_link">
                                <a target="_blank" href="landing.html"><i className="fa fa-star"></i> <span className="nav-label">Landing Page</span> <span className="label label-warning pull-right">NEW</span></a>
                            </li>
                            <li className="special_link">
                                <a href="package.html"><i className="fa fa-database"></i> <span className="nav-label">Package</span></a>
                            </li>
                        </ul>

                    </div>
                </nav>

                <div id="page-wrapper" className="gray-bg">
                    <div className="row border-bottom">
                        <nav className="navbar navbar-static-top" role="navigation" style={{marginBottom:0}} >
                            <div className="navbar-header">
                                <a className="navbar-minimalize minimalize-styl-2 btn btn-primary " href="#"><i className="fa fa-bars"></i> </a>
                                <form role="search" className="navbar-form-custom" action="search_results.html">
                                    <div className="form-group">
                                        <input type="text" placeholder="Search for something..." className="form-control" name="top-search" id="top-search"/>
                                    </div>
                                </form>
                            </div>
                            <ul className="nav navbar-top-links navbar-right">
                                <li>
                                    <span className="m-r-sm text-muted welcome-message">Welcome to INSPINIA+ Admin Theme.</span>
                                </li>
                                <li className="dropdown">
                                    <a className="dropdown-toggle count-info" data-toggle="dropdown" href="#">
                                        <i className="fa fa-envelope"></i>  <span className="label label-warning">16</span>
                                    </a>
                                    <ul className="dropdown-menu dropdown-messages">
                                        <li>
                                            <div className="dropdown-messages-box">
                                                <a href="profile.html" className="pull-left">
                                                    <img alt="image" className="img-circle" src="img/a7.jpg"/>
                                                </a>
                                                <div className="media-body">
                                                    <small className="pull-right">46h ago</small>
                                                    <strong>Mike Loreipsum</strong> started following <strong>Monica Smith</strong>. <br/>
                                                    <small className="text-muted">3 days ago at 7:58 pm - 10.06.2014</small>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="divider"></li>
                                        <li>
                                            <div className="dropdown-messages-box">
                                                <a href="profile.html" className="pull-left">
                                                    <img alt="image" className="img-circle" src="img/a4.jpg"/>
                                                </a>
                                                <div className="media-body ">
                                                    <small className="pull-right text-navy">5h ago</small>
                                                    <strong>Chris Johnatan Overtunk</strong> started following <strong>Monica Smith</strong>. <br/>
                                                    <small className="text-muted">Yesterday 1:21 pm - 11.06.2014</small>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="divider"></li>
                                        <li>
                                            <div className="dropdown-messages-box">
                                                <a href="profile.html" className="pull-left">
                                                    <img alt="image" className="img-circle" src="img/profile.jpg"/>
                                                </a>
                                                <div className="media-body ">
                                                    <small className="pull-right">23h ago</small>
                                                    <strong>Monica Smith</strong> love <strong>Kim Smith</strong>. <br/>
                                                    <small className="text-muted">2 days ago at 2:30 am - 11.06.2014</small>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="divider"></li>
                                        <li>
                                            <div className="text-center link-block">
                                                <a href="mailbox.html">
                                                    <i className="fa fa-envelope"></i> <strong>Read All Messages</strong>
                                                </a>
                                            </div>
                                        </li>
                                    </ul>
                                </li>
                                <li className="dropdown">
                                    <a className="dropdown-toggle count-info" data-toggle="dropdown" href="#">
                                        <i className="fa fa-bell"></i>  <span className="label label-primary">8</span>
                                    </a>
                                    <ul className="dropdown-menu dropdown-alerts">
                                        <li>
                                            <a href="mailbox.html">
                                                <div>
                                                    <i className="fa fa-envelope fa-fw"></i> You have 16 messages
                                                    <span className="pull-right text-muted small">4 minutes ago</span>
                                                </div>
                                            </a>
                                        </li>
                                        <li className="divider"></li>
                                        <li>
                                            <a href="profile.html">
                                                <div>
                                                    <i className="fa fa-twitter fa-fw"></i> 3 New Followers
                                                    <span className="pull-right text-muted small">12 minutes ago</span>
                                                </div>
                                            </a>
                                        </li>
                                        <li className="divider"></li>
                                        <li>
                                            <a href="grid_options.html">
                                                <div>
                                                    <i className="fa fa-upload fa-fw"></i> Server Rebooted
                                                    <span className="pull-right text-muted small">4 minutes ago</span>
                                                </div>
                                            </a>
                                        </li>
                                        <li className="divider"></li>
                                        <li>
                                            <div className="text-center link-block">
                                                <a href="notifications.html">
                                                    <strong>See All Alerts</strong>
                                                    <i className="fa fa-angle-right"></i>
                                                </a>
                                            </div>
                                        </li>
                                    </ul>
                                </li>


                                <li>
                                    <a href="login.html">
                                        <i className="fa fa-sign-out"></i> Log out
                                    </a>
                                </li>
                            </ul>

                        </nav>
                    </div>
                    <div className="row wrapper border-bottom white-bg page-heading">
                        <div className="col-sm-4">
                            <h2>This is main title</h2>
                            <ol className="breadcrumb">
                                <li>
                                    <a href="index.html">This is</a>
                                </li>
                                <li className="active">
                                    <strong>Breadcrumb</strong>
                                </li>
                            </ol>
                        </div>
                        <div className="col-sm-8">
                            <div className="title-action">
                                <a href="" className="btn btn-primary">This is action area</a>
                            </div>
                        </div>
                    </div>

                    <div className="wrapper wrapper-content">
                        <div className="middle-box text-center animated fadeInRightBig">
                            <h3 className="font-bold">This is page content</h3>
                            <div className="error-desc">
                                You can create here any grid layout you want. And any variation layout you imagine:) Check out
                                main dashboard and other site. It use many different layout.
                                <br/><a href="index.html" className="btn btn-primary m-t">Dashboard</a>
                            </div>
                        </div>
                    </div>
                    <div className="footer">
                        <div className="pull-right">
                            10GB of <strong>250GB</strong> Free.
                        </div>
                        <div>
                            <strong>Copyright</strong> Example Company &copy; 2014-2017
                        </div>
                    </div>

                </div>
            </div>
            </div>
    );
    }
}