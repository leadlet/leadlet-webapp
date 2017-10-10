import React, { Component } from 'react';

class Minor extends Component {

    render() {
        return (
            <div className="wrapper wrapper-content  animated fadeInRight">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="ibox">
                            <div className="ibox-content">
                                <h3>To-do</h3>
                                <p className="small"><i className="fa fa-hand-o-up"></i> Drag task between list</p>

                                <div className="input-group">
                                    <input type="text" placeholder="Add new task. " className="input input-sm form-control" />
                                <span className="input-group-btn">
                                        <button type="button" className="btn btn-sm btn-white"> <i className="fa fa-plus"></i> Add task</button>
                                </span>
                                </div>

                                <ul className="sortable-list connectList agile-list" id="todo">
                                    <li className="warning-element" id="task1">
                                        Simply dummy text of the printing and typesetting industry.
                                        <div className="agile-detail">
                                            <a href="#" className="pull-right btn btn-xs btn-white">Tag</a>
                                            <i className="fa fa-clock-o"></i> 12.10.2015
                                        </div>
                                    </li>
                                    <li className="success-element" id="task2">
                                        Many desktop publishing packages and web page editors now use Lorem Ipsum as their default.
                                        <div className="agile-detail">
                                            <a href="#" className="pull-right btn btn-xs btn-white">Mark</a>
                                            <i className="fa fa-clock-o"></i> 05.04.2015
                                        </div>
                                    </li>
                                    <li className="info-element" id="task3">
                                        Sometimes by accident, sometimes on purpose (injected humour and the like).
                                        <div className="agile-detail">
                                            <a href="#" className="pull-right btn btn-xs btn-white">Mark</a>
                                            <i className="fa fa-clock-o"></i> 16.11.2015
                                        </div>
                                    </li>
                                    <li className="danger-element" id="task4">
                                        All the Lorem Ipsum generators
                                        <div className="agile-detail">
                                            <a href="#" className="pull-right btn btn-xs btn-primary">Done</a>
                                            <i className="fa fa-clock-o"></i> 06.10.2015
                                        </div>
                                    </li>
                                    <li className="warning-element" id="task5">
                                        Which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
                                        <div className="agile-detail">
                                            <a href="#" className="pull-right btn btn-xs btn-white">Tag</a>
                                            <i className="fa fa-clock-o"></i> 09.12.2015
                                        </div>
                                    </li>
                                    <li className="warning-element" id="task6">
                                        Packages and web page editors now use Lorem Ipsum as
                                        <div className="agile-detail">
                                            <a href="#" className="pull-right btn btn-xs btn-primary">Done</a>
                                            <i className="fa fa-clock-o"></i> 08.04.2015
                                        </div>
                                    </li>
                                    <li className="success-element" id="task7">
                                        Many desktop publishing packages and web page editors now use Lorem Ipsum as their default.
                                        <div className="agile-detail">
                                            <a href="#" className="pull-right btn btn-xs btn-white">Mark</a>
                                            <i className="fa fa-clock-o"></i> 05.04.2015
                                        </div>
                                    </li>
                                    <li className="info-element" id="task8">
                                        Sometimes by accident, sometimes on purpose (injected humour and the like).
                                        <div className="agile-detail">
                                            <a href="#" className="pull-right btn btn-xs btn-white">Mark</a>
                                            <i className="fa fa-clock-o"></i> 16.11.2015
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="ibox">
                            <div className="ibox-content">
                                <h3>In Progress</h3>
                                <p className="small"><i className="fa fa-hand-o-up"></i> Drag task between list</p>
                                <ul className="sortable-list connectList agile-list" id="inprogress">
                                    <li className="success-element" id="task9">
                                        Quisque venenatis ante in porta suscipit.
                                        <div className="agile-detail">
                                            <a href="#" className="pull-right btn btn-xs btn-white">Tag</a>
                                            <i className="fa fa-clock-o"></i> 12.10.2015
                                        </div>
                                    </li>
                                    <li className="success-element" id="task10">
                                        Phasellus sit amet tortor sed enim mollis accumsan in consequat orci.
                                        <div className="agile-detail">
                                            <a href="#" className="pull-right btn btn-xs btn-white">Mark</a>
                                            <i className="fa fa-clock-o"></i> 05.04.2015
                                        </div>
                                    </li>
                                    <li className="warning-element" id="task11">
                                        Nunc sed arcu at ligula faucibus tempus ac id felis. Vestibulum et nulla quis turpis sagittis fringilla.
                                        <div className="agile-detail">
                                            <a href="#" className="pull-right btn btn-xs btn-white">Mark</a>
                                            <i className="fa fa-clock-o"></i> 16.11.2015
                                        </div>
                                    </li>
                                    <li className="warning-element" id="task12">
                                        Ut porttitor augue non sapien mollis accumsan.
                                        Nulla non elit eget lacus elementum viverra.
                                        <div className="agile-detail">
                                            <a href="#" className="pull-right btn btn-xs btn-white">Tag</a>
                                            <i className="fa fa-clock-o"></i> 09.12.2015
                                        </div>
                                    </li>
                                    <li className="info-element" id="task13">
                                        Packages and web page editors now use Lorem Ipsum as
                                        <div className="agile-detail">
                                            <a href="#" className="pull-right btn btn-xs btn-primary">Done</a>
                                            <i className="fa fa-clock-o"></i> 08.04.2015
                                        </div>
                                    </li>
                                    <li className="success-element" id="task14">
                                        Quisque lacinia tellus et odio ornare maximus.
                                        <div className="agile-detail">
                                            <a href="#" className="pull-right btn btn-xs btn-white">Mark</a>
                                            <i className="fa fa-clock-o"></i> 05.04.2015
                                        </div>
                                    </li>
                                    <li className="danger-element" id="task15">
                                        Enim mollis accumsan in consequat orci.
                                        <div className="agile-detail">
                                            <a href="#" className="pull-right btn btn-xs btn-white">Mark</a>
                                            <i className="fa fa-clock-o"></i> 11.04.2015
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="ibox">
                            <div className="ibox-content">
                                <h3>Completed</h3>
                                <p className="small"><i className="fa fa-hand-o-up"></i> Drag task between list</p>
                                <ul className="sortable-list connectList agile-list" id="completed">
                                    <li className="info-element" id="task16">
                                        Sometimes by accident, sometimes on purpose (injected humour and the like).
                                        <div className="agile-detail">
                                            <a href="#" className="pull-right btn btn-xs btn-white">Mark</a>
                                            <i className="fa fa-clock-o"></i> 16.11.2015
                                        </div>
                                    </li>
                                    <li className="warning-element" id="task17">
                                        Ut porttitor augue non sapien mollis accumsan.
                                        Nulla non elit eget lacus elementum viverra.
                                        <div className="agile-detail">
                                            <a href="#" className="pull-right btn btn-xs btn-white">Tag</a>
                                            <i className="fa fa-clock-o"></i> 09.12.2015
                                        </div>
                                    </li>
                                    <li className="warning-element" id="task18">
                                        Which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
                                        <div className="agile-detail">
                                            <a href="#" className="pull-right btn btn-xs btn-white">Tag</a>
                                            <i className="fa fa-clock-o"></i> 09.12.2015
                                        </div>
                                    </li>
                                    <li className="warning-element" id="task19">
                                        Packages and web page editors now use Lorem Ipsum as
                                        <div className="agile-detail">
                                            <a href="#" className="pull-right btn btn-xs btn-primary">Done</a>
                                            <i className="fa fa-clock-o"></i> 08.04.2015
                                        </div>
                                    </li>
                                    <li className="success-element" id="task20">
                                        Many desktop publishing packages and web page editors now use Lorem Ipsum as their default.
                                        <div className="agile-detail">
                                            <a href="#" className="pull-right btn btn-xs btn-white">Mark</a>
                                            <i className="fa fa-clock-o"></i> 05.04.2015
                                        </div>
                                    </li>
                                    <li className="info-element" id="task21">
                                        Sometimes by accident, sometimes on purpose (injected humour and the like).
                                        <div className="agile-detail">
                                            <a href="#" className="pull-right btn btn-xs btn-white">Mark</a>
                                            <i className="fa fa-clock-o"></i> 16.11.2015
                                        </div>
                                    </li>
                                    <li className="warning-element" id="task22">
                                        Simply dummy text of the printing and typesetting industry.
                                        <div className="agile-detail">
                                            <a href="#" className="pull-right btn btn-xs btn-white">Tag</a>
                                            <i className="fa fa-clock-o"></i> 12.10.2015
                                        </div>
                                    </li>
                                    <li className="success-element" id="task23">
                                        Many desktop publishing packages and web page editors now use Lorem Ipsum as their default.
                                        <div className="agile-detail">
                                            <a href="#" className="pull-right btn btn-xs btn-white">Mark</a>
                                            <i className="fa fa-clock-o"></i> 05.04.2015
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="row">
                    <div className="col-lg-12">

                        <h4>
                            Serialised Output
                        </h4>
                        <p>
                            Serializes the sortable's item id's into an array of string.
                        </p>

                        <div className="output p-m m white-bg"></div>


                    </div>
                </div>


            </div>

        )
    }

}

export default Minor