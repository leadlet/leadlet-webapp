import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import * as _ from "lodash";
import ListFilter from "./ListFilter";
import {getFilterOptions, termSelected2, termUnSelected2} from "../../actions/search.actions";
import {QueryUtils} from "./QueryUtils";

class FilterContainer extends Component {

    constructor(props) {
        super(props);
        this.renderSingleFilter = this.renderSingleFilter.bind(this);
    }

    render(){
        const  {container, filters} = this.props;
        return this.props.visible && filters.map(definition => this.renderSingleFilter(container,definition));
    }
    componentDidUpdate(prevProps) {
        let oldQueryForContainer = prevProps.queryStore[ this.props.container];
        let newQueryForContainer = this.props.queryStore[ this.props.container];
        let filterDefinitions = _.get(this.props.filterStore, [ this.props.container]);

        if(filterDefinitions ){
            let oldFilterQuery = QueryUtils.prepareQuery(filterDefinitions, oldQueryForContainer, prevProps.defaultFilters);
            let newFilterQuery = QueryUtils.prepareQuery(filterDefinitions, newQueryForContainer, this.props.defaultFilters);

            if( oldFilterQuery !== newFilterQuery){
                this.props.onQueryChange(newFilterQuery);
                this.props.getFilterOptions( this.props.container, this.props.filters, newFilterQuery );
            }

        }
    }
    componentDidMount(){
        let newQueryForContainer = this.props.queryStore[ this.props.container];
        let filterDefinitions = _.get(this.props.filterStore, [ this.props.container]);

        let newFilterQuery = QueryUtils.prepareQuery(filterDefinitions, newQueryForContainer, this.props.defaultFilters);
        this.props.onQueryChange(newFilterQuery);
        this.props.getFilterOptions( this.props.container, this.props.filters, newFilterQuery);

    }

    renderSingleFilter(container, filterDefinition) {
        let filter = _.get(this.props.filterStore, [container,filterDefinition.id]);
        if( filter && filter.type === 'list' && filter.id !== "pipeline") {
            let selectedQueryOptions = _.get(this.props.queryStore, [container, filterDefinition.id, "selectedOptions"], []);
            return (
                <div key={filter.id} className={this.props.filterStyle}>
                    <ListFilter
                        container={this.props.container}
                        id={filter.id}
                        title={filterDefinition.title}
                        options={filter.options}
                        selectedOptions={selectedQueryOptions}
                        defaultSelected={filterDefinition.defaultSelected}
                        onTermSelect={this.props.termSelected2}
                        onTermUnSelect={this.props.termUnSelected2}
                    />
                </div>
            );
        }
    }
}

function mapStateToProps(state, props) {
    return {
        filterStore: state.filterStore,
        queryStore: state.queryStore
    };
}

FilterContainer.propTypes = {
    container: PropTypes.string.isRequired,
    filters: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        field: PropTypes.string.isRequired,
        visible: PropTypes.bool,
    })).isRequired,
    termSelected2: PropTypes.func.isRequired,
    termUnSelected2: PropTypes.func.isRequired,
    onQueryChange: PropTypes.func.isRequired,
    filterStyle: PropTypes.string.isRequired,
    defaultFilters: PropTypes.array,
    visible: PropTypes.bool,
};

export default connect(mapStateToProps, {termSelected2,termUnSelected2,getFilterOptions})(FilterContainer);

