import React, {Component} from 'react';
import {connect} from "react-redux";
import {getFacets} from "../../actions/search.actions";
import MultiListFilter from "./MultiListFilter";

class SearchFilterContainer extends Component {

    constructor(props) {
        super(props);
    }

    render(){
        return (<div>
                {this.props.children}
            </div>
            );
    }
}

function mapStateToProps(state) {
    return {
        facets: state.facets
    };
}

export default connect(mapStateToProps, null)(SearchFilterContainer);

