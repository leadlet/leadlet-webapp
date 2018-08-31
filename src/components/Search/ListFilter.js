import React, {Component} from 'react';
import {connect} from "react-redux";
import {getDistinctTerms, registerFilter, termSelected, termUnSelected} from "../../actions/search.actions";
import {filterByIdSelector, searchQuerySelector} from "../../models/selectors";

class ListFilter extends Component {

    constructor(props) {
        super(props);
        this.inputChanged = this.inputChanged.bind(this);
        this.state = {
            definition: {
                id: this.props.id,
                type: "TERMS",
                operator: "AND",
                selectedOptions: [],
                dataField: this.props.dataField
            }
        };
    }
    componentDidUpdate(prevProps) {
        if( this.props.searchQuery !== prevProps.searchQuery){
            this.props.getDistinctTerms( this.state.definition, this.props.searchQuery );
        }
    }

    componentDidMount(){
        this.props.getDistinctTerms( this.state.definition,  this.props.searchQuery );
    }

    inputChanged(checkboxElem){
        if (checkboxElem.target.checked) {
            this.props.termSelected(this.props.id, checkboxElem.target.value);
        } else {
            this.props.termUnSelected(this.props.id, checkboxElem.target.value);
        }
    }

    renderTerms(){
        if( this.props.filter ){

            const terms = this.props.filter.options;

            return Object.keys(terms).map((key,index) => {
                let keyText = key;
                console.log("before:" + keyText);
                if( keyText.length > 20) {
                    keyText = keyText.substring(0,20) + "...";
                }
                console.log("after:" + keyText);
                return (
                    <div key={key} className="form-check">
                        <input className="form-check-input" type="checkbox"
                               value={key} id={key} onChange={this.inputChanged}
                               checked={this.props.filter.selected && this.props.filter.selected.options.includes(key)}/>
                        <label className="form-check-label item-name">
                            {key ? keyText : this.props.emptyText }  <span className="item-count">({terms[key]})</span>
                        </label>
                    </div>
                );}
            );
        }
    }

    render(){
        return (<div className="list-filter">
                    <h6 className="filter-name">{this.props.title}</h6>
                    <div className="filter-items">
                        {this.renderTerms()}
                    </div>
                </div>
            );
    }
}

function mapStateToProps(state, props) {
    return {
        filter: filterByIdSelector(state, props.id),
        searchQuery: searchQuerySelector(state, props.multi ? props.id: null)
    };
}


export default connect(mapStateToProps, {termSelected,termUnSelected, getDistinctTerms})(ListFilter);

