import React, {Component} from 'react';
import {connect} from "react-redux";
import {clearFilter, getDistinctTerms, termSelected, termUnSelected} from "../../actions/search.actions";

class NavigationFilter extends Component {

    constructor(props) {
        super(props);
        this.clearFilter = this.clearFilter.bind(this);
        this.filter = this.filter.bind(this);
        this.renderOptions = this.renderOptions.bind(this);
        this.state = {
            definition: {
                id: this.props.id,
                type: "TERMS",
                operator: "OR",
                selectedOptions: [],
                dataField: this.props.dataField,
                group: this.props.group,
                index: this.props.index
            }
        };
    }

    componentDidMount(){
        this.props.getDistinctTerms( this.state.definition,  this.props.searchQuery );
    }

    clearFilter(){
        this.props.clearFilter(this.props.id);

    }

    filter(terms){
        this.props.termSelected(this.props.id, terms, true);
    }

    renderOptions(){
        return this.props.options.map( option => (
            <li role="presentation"><a href="#" onClick={() => this.filter(option.fields)}>{option.label}</a></li>
        ))
    }
    render(){
        return (<ul className="nav nav-pills">
                    <li role="presentation"><a href="#" onClick={this.clearFilter}>All</a></li>
                    {this.renderOptions()}
                </ul>
            );
    }
}

function mapStateToProps(state, props) {
    return {
    };
}


export default connect(mapStateToProps, {termSelected, clearFilter, getDistinctTerms})(NavigationFilter);

