import React, {Component} from 'react';
import {connect} from "react-redux";
import {changeSort} from "../../actions/search.actions";
import {sortByGroupAndId} from "../../models/selectors";
import * as _ from "lodash";

class ColumnSorter extends Component {

    constructor(props) {
        super(props);
        this.putSortOrder = this.putSortOrder.bind(this);
        this.changeSort = this.changeSort.bind(this);
    }

    changeSort(){
        let newSortOrder = "";

        if(_.get(this.props.sort,["order"]) === undefined || _.get(this.props.sort,["order"]) === "" ){
            newSortOrder = "desc";
        }else if (_.get(this.props.sort,["order"]) === "desc"){
            newSortOrder = "asc";
        }if (_.get(this.props.sort,["order"]) === "asc"){
            newSortOrder = "";
        }

        this.props.changeSort( {id: this.props.dataField, dataField: this.props.dataField, group: this.props.group, order: newSortOrder}) ;

    }
    putSortOrder(){
        let order = _.get(this.props.sort,["order"]);
        if(order === undefined || order === ""){
            return "fa-sort";
        } else if(order === "desc"){
            return "fa-sort-desc";
        }else{
            return "fa-sort-asc";
        }
    }
    render(){
        return (<i style={{cursor: "pointer"}} className={"fa " + this.putSortOrder()} onClick={this.changeSort}/>);
    }
}

function mapStateToProps(state, props) {
    return {
        sort: sortByGroupAndId(state, {group: props.group, id: props.dataField})
    };
}


export default connect(mapStateToProps, {changeSort})(ColumnSorter);

