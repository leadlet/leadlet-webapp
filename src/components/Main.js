import React, { Component } from 'react';

class Main extends Component {

    render() {
        return (
                <div className="container">
                    <div className="row">
                        <div className="col-md-2">
                            <div className="ibox float-e-margins">
                                <div className="ibox-title">
                                    <span className="label label-success pull-right">Monthly</span>
                                    <h5>Views</h5>
                                </div>
                                <div className="ibox-content">
                                    <h1 className="no-margins">386,200</h1>
                                    <div className="stat-percent font-bold text-success">98% <i className="fa fa-bolt"></i></div>
                                    <small>Total views</small>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="ibox float-e-margins">
                                <div className="ibox-title">
                                    <span className="label label-info pull-right">Annual</span>
                                    <h5>Orders</h5>
                                </div>
                                <div className="ibox-content">
                                    <h1 className="no-margins">80,800</h1>
                                    <div className="stat-percent font-bold text-info">20% <i className="fa fa-level-up"></i></div>
                                    <small>New orders</small>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="ibox float-e-margins">
                                <div className="ibox-title">
                                    <span className="label label-primary pull-right">Today</span>
                                    <h5>visits</h5>
                                </div>
                                <div className="ibox-content">

                                    <div className="row">
                                        <div className="col-md-6">
                                            <h1 className="no-margins">$ 406,420</h1>
                                            <div className="font-bold text-navy">44% <i className="fa fa-level-up"></i> <small>Rapid pace</small></div>
                                        </div>
                                        <div className="col-md-6">
                                            <h1 className="no-margins">206,120</h1>
                                            <div className="font-bold text-navy">22% <i className="fa fa-level-up"></i> <small>Slow pace</small></div>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="ibox float-e-margins">
                                <div className="ibox-title">
                                    <h5>Monthly income</h5>
                                    <div className="ibox-tools">
                                        <span className="label label-primary">Updated 12.2015</span>
                                    </div>
                                </div>
                                <div className="ibox-content no-padding">
                                    <div className="flot-chart m-t-lg" style={{height: '55px'}}>
                                        <div className="flot-chart-content" id="flot-chart1"></div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="ibox float-e-margins">
                                <div className="ibox-content">
                                    <div>
                                        <span className="pull-right text-right">
                                        <small>Average value of sales in the past month in: <strong>United states</strong></small>
                                            <br/>
                                            All sales: 162,862
                                        </span>
                                        <h3 className="font-bold no-margins">
                                            Half-year revenue margin
                                        </h3>
                                        <small>Sales marketing.</small>
                                    </div>

                                    <div className="m-t-sm">

                                        <div className="row">
                                            <div className="col-md-8">
                                                <div>
                                                    <canvas id="lineChart" height="114"></canvas>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <ul className="stat-list m-t-lg">
                                                    <li>
                                                        <h2 className="no-margins">2,346</h2>
                                                        <small>Total orders in period</small>
                                                        <div className="progress progress-mini">
                                                            <div className="progress-bar" style={{width: '48%'}}></div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <h2 className="no-margins ">4,422</h2>
                                                        <small>Orders in last month</small>
                                                        <div className="progress progress-mini">
                                                            <div className="progress-bar" style={{width: '60%'}}></div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="m-t-md">
                                        <small className="pull-right">
                                            <i className="fa fa-clock-o"> </i>
                                            Update on 16.07.2015
                                        </small>
                                        <small>
                                            <strong>Analysis of sales:</strong> The value has been changed over time, and last month reached a level over $50,000.
                                        </small>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="ibox float-e-margins">
                                <div className="ibox-title">
                                    <span className="label label-warning pull-right">Data has changed</span>
                                    <h5>User activity</h5>
                                </div>
                                <div className="ibox-content">
                                    <div className="row">
                                        <div className="col-xs-4">
                                            <small className="stats-label">Pages / Visit</small>
                                            <h4>236 321.80</h4>
                                        </div>

                                        <div className="col-xs-4">
                                            <small className="stats-label">% New Visits</small>
                                            <h4>46.11%</h4>
                                        </div>
                                        <div className="col-xs-4">
                                            <small className="stats-label">Last week</small>
                                            <h4>432.021</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="ibox-content">
                                    <div className="row">
                                        <div className="col-xs-4">
                                            <small className="stats-label">Pages / Visit</small>
                                            <h4>643 321.10</h4>
                                        </div>

                                        <div className="col-xs-4">
                                            <small className="stats-label">% New Visits</small>
                                            <h4>92.43%</h4>
                                        </div>
                                        <div className="col-xs-4">
                                            <small className="stats-label">Last week</small>
                                            <h4>564.554</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="ibox-content">
                                    <div className="row">
                                        <div className="col-xs-4">
                                            <small className="stats-label">Pages / Visit</small>
                                            <h4>436 547.20</h4>
                                        </div>

                                        <div className="col-xs-4">
                                            <small className="stats-label">% New Visits</small>
                                            <h4>150.23%</h4>
                                        </div>
                                        <div className="col-xs-4">
                                            <small className="stats-label">Last week</small>
                                            <h4>124.990</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="row">

                        <div className="col-lg-12">
                            <div className="ibox float-e-margins">
                                <div className="ibox-title">
                                    <h5>Custom responsive table </h5>
                                    <div className="ibox-tools">
                                        <a className="collapse-link">
                                            <i className="fa fa-chevron-up"></i>
                                        </a>
                                        <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                                            <i className="fa fa-wrench"></i>
                                        </a>
                                        <ul className="dropdown-menu dropdown-user">
                                            <li><a href="#">Config option 1</a>
                                            </li>
                                            <li><a href="#">Config option 2</a>
                                            </li>
                                        </ul>
                                        <a className="close-link">
                                            <i className="fa fa-times"></i>
                                        </a>
                                    </div>
                                </div>
                                <div className="ibox-content">
                                    <div className="row">
                                        <div className="col-sm-9 m-b-xs">
                                            <div data-toggle="buttons" className="btn-group">
                                                <label className="btn btn-sm btn-white"> <input type="radio" id="option1" name="options"/> Day </label>
                                                <label className="btn btn-sm btn-white active"> <input type="radio" id="option2" name="options"/> Week </label>
                                                <label className="btn btn-sm btn-white"> <input type="radio" id="option3" name="options"/> Month </label>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="input-group"><input type="text" placeholder="Search" className="input-sm form-control"/> <span className="input-group-btn">
                                        <button type="button" className="btn btn-sm btn-primary"> Go!</button> </span></div>
                                        </div>
                                    </div>
                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <thead>
                                            <tr>

                                                <th>#</th>
                                                <th>Project </th>
                                                <th>Name </th>
                                                <th>Phone </th>
                                                <th>Company </th>
                                                <th>Completed </th>
                                                <th>Task</th>
                                                <th>Date</th>
                                                <th>Action</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>Project <small>This is example of project</small></td>
                                                <td>Patrick Smith</td>
                                                <td>0800 051213</td>
                                                <td>Inceptos Hymenaeos Ltd</td>
                                                <td><span className="pie">0.52/1.561</span></td>
                                                <td>20%</td>
                                                <td>Jul 14, 2013</td>
                                                <td><a href="#"><i className="fa fa-check text-navy"></i></a></td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>Alpha project</td>
                                                <td>Alice Jackson</td>
                                                <td>0500 780909</td>
                                                <td>Nec Euismod In Company</td>
                                                <td><span className="pie">6,9</span></td>
                                                <td>40%</td>
                                                <td>Jul 16, 2013</td>
                                                <td><a href="#"><i className="fa fa-check text-navy"></i></a></td>
                                            </tr>
                                            <tr>
                                                <td>3</td>
                                                <td>Betha project</td>
                                                <td>John Smith</td>
                                                <td>0800 1111</td>
                                                <td>Erat Volutpat</td>
                                                <td><span className="pie">3,1</span></td>
                                                <td>75%</td>
                                                <td>Jul 18, 2013</td>
                                                <td><a href="#"><i className="fa fa-check text-navy"></i></a></td>
                                            </tr>
                                            <tr>
                                                <td>4</td>
                                                <td>Gamma project</td>
                                                <td>Anna Jordan</td>
                                                <td>(016977) 0648</td>
                                                <td>Tellus Ltd</td>
                                                <td><span className="pie">4,9</span></td>
                                                <td>18%</td>
                                                <td>Jul 22, 2013</td>
                                                <td><a href="#"><i className="fa fa-check text-navy"></i></a></td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>Alpha project</td>
                                                <td>Alice Jackson</td>
                                                <td>0500 780909</td>
                                                <td>Nec Euismod In Company</td>
                                                <td><span className="pie">6,9</span></td>
                                                <td>40%</td>
                                                <td>Jul 16, 2013</td>
                                                <td><a href="#"><i className="fa fa-check text-navy"></i></a></td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>Project <small>This is example of project</small></td>
                                                <td>Patrick Smith</td>
                                                <td>0800 051213</td>
                                                <td>Inceptos Hymenaeos Ltd</td>
                                                <td><span className="pie">0.52/1.561</span></td>
                                                <td>20%</td>
                                                <td>Jul 14, 2013</td>
                                                <td><a href="#"><i className="fa fa-check text-navy"></i></a></td>
                                            </tr>
                                            <tr>
                                                <td>4</td>
                                                <td>Gamma project</td>
                                                <td>Anna Jordan</td>
                                                <td>(016977) 0648</td>
                                                <td>Tellus Ltd</td>
                                                <td><span className="pie">4,9</span></td>
                                                <td>18%</td>
                                                <td>Jul 22, 2013</td>
                                                <td><a href="#"><i className="fa fa-check text-navy"></i></a></td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>Project <small>This is example of project</small></td>
                                                <td>Patrick Smith</td>
                                                <td>0800 051213</td>
                                                <td>Inceptos Hymenaeos Ltd</td>
                                                <td><span className="pie">0.52/1.561</span></td>
                                                <td>20%</td>
                                                <td>Jul 14, 2013</td>
                                                <td><a href="#"><i className="fa fa-check text-navy"></i></a></td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>Alpha project</td>
                                                <td>Alice Jackson</td>
                                                <td>0500 780909</td>
                                                <td>Nec Euismod In Company</td>
                                                <td><span className="pie">6,9</span></td>
                                                <td>40%</td>
                                                <td>Jul 16, 2013</td>
                                                <td><a href="#"><i className="fa fa-check text-navy"></i></a></td>
                                            </tr>
                                            <tr>
                                                <td>3</td>
                                                <td>Betha project</td>
                                                <td>John Smith</td>
                                                <td>0800 1111</td>
                                                <td>Erat Volutpat</td>
                                                <td><span className="pie">3,1</span></td>
                                                <td>75%</td>
                                                <td>Jul 18, 2013</td>
                                                <td><a href="#"><i className="fa fa-check text-navy"></i></a></td>
                                            </tr>
                                            <tr>
                                                <td>4</td>
                                                <td>Gamma project</td>
                                                <td>Anna Jordan</td>
                                                <td>(016977) 0648</td>
                                                <td>Tellus Ltd</td>
                                                <td><span className="pie">4,9</span></td>
                                                <td>18%</td>
                                                <td>Jul 22, 2013</td>
                                                <td><a href="#"><i className="fa fa-check text-navy"></i></a></td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>Alpha project</td>
                                                <td>Alice Jackson</td>
                                                <td>0500 780909</td>
                                                <td>Nec Euismod In Company</td>
                                                <td><span className="pie">6,9</span></td>
                                                <td>40%</td>
                                                <td>Jul 16, 2013</td>
                                                <td><a href="#"><i className="fa fa-check text-navy"></i></a></td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>Project <small>This is example of project</small></td>
                                                <td>Patrick Smith</td>
                                                <td>0800 051213</td>
                                                <td>Inceptos Hymenaeos Ltd</td>
                                                <td><span className="pie">0.52/1.561</span></td>
                                                <td>20%</td>
                                                <td>Jul 14, 2013</td>
                                                <td><a href="#"><i className="fa fa-check text-navy"></i></a></td>
                                            </tr>
                                            <tr>
                                                <td>4</td>
                                                <td>Gamma project</td>
                                                <td>Anna Jordan</td>
                                                <td>(016977) 0648</td>
                                                <td>Tellus Ltd</td>
                                                <td><span className="pie">4,9</span></td>
                                                <td>18%</td>
                                                <td>Jul 22, 2013</td>
                                                <td><a href="#"><i className="fa fa-check text-navy"></i></a></td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>

                </div>
        )
    }

}

export default Main