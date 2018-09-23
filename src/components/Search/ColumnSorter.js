import React, {Component} from 'react';
import {connect} from "react-redux";
import {changeSort} from "../../actions/search.actions";
import * as _ from "lodash";

class ColumnSorter extends Component {

    constructor(props) {
        super(props);
        this.putSortOrder = this.putSortOrder.bind(this);
        this.changeSort = this.changeSort.bind(this);
    }

    changeSort(){
        let newSortOrder = "";

        let sort = this.props.sortStore[this.props.dataField];

        if(_.get(sort,["order"]) === undefined || _.get(sort,["order"]) === "" ){
            newSortOrder = "desc";
        }else if (_.get(sort,["order"]) === "desc"){
            newSortOrder = "asc";
        }if (_.get(sort,["order"]) === "asc"){
            newSortOrder = "";
        }

        this.props.changeSort( {id: this.props.dataField, dataField: this.props.dataField, group: this.props.group, order: newSortOrder}) ;

    }
    putSortOrder(){
        let sort = this.props.sortStore[this.props.dataField];

        let order = _.get(sort,["order"]);
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
        sortStore: state.sortStore
    };
}


export default connect(mapStateToProps, {changeSort})(ColumnSorter);

