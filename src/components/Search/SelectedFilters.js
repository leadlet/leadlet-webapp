import React, {Component} from 'react';
import {connect} from "react-redux";
import {getDistincTerms, registerFilter, termSelected, termUnSelected} from "../../actions/search.actions";
import {filterByIdSelector, filtersSelector} from "../../models/selectors";

class SelectedFilters extends Component {

    constructor(props) {
        super(props);
    }

    render(){
        return (<div>
                    <p>test</p>
                </div>
            );
    }
}

function mapStateToProps(state, props) {
    return {
        filters: filtersSelector(state)
    };
}


export default connect(mapStateToProps, {})(SelectedFilters);

