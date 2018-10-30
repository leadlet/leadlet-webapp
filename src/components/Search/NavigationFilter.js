import React, {Component} from 'react';
import {connect} from "react-redux";
import {clearFilter, getDistinctTerms, termSelected} from "../../actions/search.actions";

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
            <li role="presentation" key={option.label}>
                <button type="button" className="btn btn-link" onClick={() => this.filter(option.fields)}>{option.label}</button>
            </li>
        ))
    }
    render(){
        return (<ul className="nav nav-pills">
                    <li role="presentation" key="all">
                        <button type="button" className="btn btn-link" onClick={this.clearFilter}>All</button>
                    </li>
                    {this.renderOptions()}
                </ul>
            );
    }
}

export default connect(null, {termSelected, clearFilter, getDistinctTerms})(NavigationFilter);

