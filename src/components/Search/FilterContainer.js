import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import * as _ from "lodash";
import ListFilter2 from "./ListFilter2";
import {getFilterOptions, termSelected2, termUnSelected2} from "../../actions/search.actions";
import {QueryUtils} from "./QueryUtils";

class FilterContainer extends Component {

    constructor(props) {
        super(props);
        this.renderSingleFilter = this.renderSingleFilter.bind(this);
    }

    render(){
        const  {container, filters} = this.props;
        return filters.map(definition => this.renderSingleFilter(container,definition));
    }
    componentDidUpdate(prevProps) {
        let oldQueryForContainer = prevProps.queryStore[ this.props.container];
        let newQueryForContainer = this.props.queryStore[ this.props.container];
        let filterDefinitions = _.get(this.props.filterStore2, [ this.props.container]);

        if( oldQueryForContainer !== newQueryForContainer){
            let filterQuery = QueryUtils.prepareQuery(filterDefinitions, newQueryForContainer);
            this.props.onQueryChange(filterQuery);
            this.props.getFilterOptions( this.props.container, this.props.filters, filterQuery );
        }
    }
    componentDidMount(){
        this.props.getFilterOptions( this.props.container, this.props.filters );
    }

    renderSingleFilter(container, filterDefinition) {
        let filter = _.get(this.props.filterStore2, [container,filterDefinition.id]);
        if( filter && filter.type === 'list') {
            let selectedQueryOptions = _.get(this.props.queryStore, [container, filterDefinition.id, "selectedOptions"], []);
            return (
                <ListFilter2
                    key={filter.id}
                    container={this.props.container}
                    id={filter.id}
                    title={filterDefinition.title}
                    options={filter.options}
                    selectedOptions={selectedQueryOptions}
                    onTermSelect={this.props.termSelected2}
                    onTermUnSelect={this.props.termUnSelected2}
                />);
        }
    }
}

function mapStateToProps(state, props) {
    return {
        filterStore2: state.filterStore2,
        queryStore: state.queryStore
    };
}

FilterContainer.propTypes = {
    container: PropTypes.string.isRequired,
    filters: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        field: PropTypes.string.isRequired
    })).isRequired,
    termSelected2: PropTypes.func.isRequired,
    termUnSelected2: PropTypes.func.isRequired,
    onQueryChange: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {termSelected2,termUnSelected2,getFilterOptions})(FilterContainer);

