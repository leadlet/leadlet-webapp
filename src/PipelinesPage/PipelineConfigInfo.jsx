import React from 'react';
import { connect } from 'react-redux';
import {getAllPipes} from "../_actions/pipeline.actions";
import {Tab, Tabs} from "react-bootstrap";

export const PipelineConfigInfo = function (props) {
    const {stages} = props;
    return (
        <div className="ibox ">
            <div className="ibox-title">
                <h5>Nestable custom theme list</h5>
            </div>
            <div className="ibox-content">
                <p>
                    Nam vitae cursus massa. Nunc ut arcu a mi convallis feugiat. Sed ante sem, sollicitudin sed porta et, molestie in turpis. Nulla lacinia lacus nec ligula feugiat eget sagittis metus lobortis. Aenean eget velit leo, et euismod risus. Pellentesque molestie hendrerit velit at gravida. Integer nec mauris urna, vel gravida est.
                </p>
                <div className="ibox-content ">
                    <div className="carousel slide" id="carousel2">
                        <ol className="carousel-indicators">
                            <li data-slide-to="0" data-target="#carousel2"  className="active"></li>
                            <li data-slide-to="1" data-target="#carousel2"></li>
                            <li data-slide-to="2" data-target="#carousel2" className=""></li>
                        </ol>
                        <div className="carousel-inner">
                            <div className="item active">
                                <img alt="image"  className="img-responsive" src="https://ga1.imgix.net/screenshot/o/90507-1456755129-6302783?ixlib=rb-1.0.0&ch=Width%2CDPR&auto=format"/>
                                <div className="carousel-caption">
                                    <p>This is simple caption 1</p>
                                </div>
                            </div>
                            <div className="item ">
                                <img alt="image"  className="img-responsive" src="http://webapplayers.com/inspinia_admin-v2.7.1/img/p_big1.jpg"/>
                                <div className="carousel-caption">
                                    <p>This is simple caption 2</p>
                                </div>
                            </div>
                            <div className="item">
                                <img alt="image"  className="img-responsive" src="http://webapplayers.com/inspinia_admin-v2.7.1/img/p_big3.jpg"/>
                                <div className="carousel-caption">
                                    <p>This is simple caption 3</p>
                                </div>
                            </div>
                        </div>
                        <a data-slide="prev" href="#carousel2" className="left carousel-control">
                            <span className="icon-prev"></span>
                        </a>
                        <a data-slide="next" href="#carousel2" className="right carousel-control">
                            <span className="icon-next"></span>
                        </a>
                    </div>
                </div>

                <p>
                    Etiam sed velit tellus, eget aliquam nisi. Suspendisse potenti. Duis at augue purus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam semper sapien congue lorem tristique nec bibendum velit tincidunt. Maecenas faucibus sollicitudin arcu, sed tincidunt nunc fermentum ac. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam felis turpis, rutrum nec tincidunt nec, imperdiet quis tortor. Sed sit amet arcu vel orci porttitor elementum.
                </p>
            </div>
        </div>

    )
}