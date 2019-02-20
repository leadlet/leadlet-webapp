import React, {Component} from 'react';
import {connect} from "react-redux";
import {clearFilter} from "../../actions/search.actions";
import moment from "moment";

class SelectedFilters extends Component {

    constructor(props) {
        super(props);
        this.onClearFilter = this.onClearFilter.bind(this);
    }

    onClearFilter(id){
        this.props.clearFilter(id);
    }
    render(){
        let searchFilters = [];


        let filters = Object.values(this.props.filterStore).filter( item => item.group === this.props.group);

        if( filters ){
            let termFilters = filters
                .filter(filter => filter.type === "TERMS" && filter.selected && filter.selected.options && filter.selected.options.length > 0)
                .map( filter => {
                    let text = filter.id + ": " + filter.selected.options.join(",");
                    return (<button type="button" className="btn btn-default btn-small"
                                    key={filter.id}
                                    id={filter.id} onClick={()=>this.onClearFilter(filter.id)}>{text} <i className="fa fa-close fa-xs"/></button>);
                });

            let rangeFilters = filters
                .filter(filter => filter.type === "RANGE" && filter.selected)
                .map( filter => {
                    let text = filter.id + ": " + filter.selected.min + "-" + filter.selected.max;
                    return (<button type="button" className="btn btn-default btn-small"
                                    key={filter.id}
                                    id={filter.id} onClick={()=>this.onClearFilter(filter.id)}>{text} <i className="fa fa-close fa-xs"/></button>);
                });

            let dateRangeFilters = filters
                .filter(filter => filter.type === "DATERANGE" && filter.selected)
                .map( filter => {
                    let text = filter.id + ": " + moment(filter.selected.min).format("DD/MM/YYYY") + " - " + moment(filter.selected.max).format("DD/MM/YYYY");
                    return (<button type="button" className="btn btn-default btn-small"
                                    key={filter.id}
                                    id={filter.id} onClick={()=>this.onClearFilter(filter.id)}>{text} <i className="fa fa-close fa-xs"/></button>);
                });


            let freeTextFilter = filters
                .filter(filter => filter.type === "FREE_TEXT" && filter.selected)
                .map( filter => {
                    return (<button type="button" className="btn btn-default btn-small"
                                    key={filter.id}
                                    id={filter.id} onClick={()=>this.onClearFilter(filter.id)}>{filter.selected} <i className="fa fa-close fa-xs"/></button>);
                });

            let appendFilter = filters
                .filter(filter => filter.type === "append" && filter.selected)
                .map(filter => {
                    return (<button type="button" className="btn btn-default btn-small"
                                    key={filter.id}
                                    id={filter.id} onClick={()=>this.onClearFilter(filter.id)}>{filter.selected} <i className="fa fa-close fa-xs"/></button>);
                });

            searchFilters = [ ...termFilters, ...rangeFilters, ...dateRangeFilters, ...freeTextFilter, ...appendFilter];

            return ( <div className={this.props.className ? this.props.className : " selected-filters"}>{searchFilters}</div>);
        }


    }
}

function mapStateToProps(state) {
    return {
        filterStore: state.filterStore
    };
}

export default connect(mapStateToProps, {clearFilter})(SelectedFilters);

