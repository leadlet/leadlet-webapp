import React, {Component} from 'react';
import {connect} from "react-redux";
import {getDistinctTerms, termSelected, termUnSelected} from "../../actions/search.actions";
import { searchQuerySelector} from "../../models/selectors";
import * as _ from "lodash";

class ListFilter extends Component {

    constructor(props) {
        super(props);
        this.inputChanged = this.inputChanged.bind(this);
        this.getKeyText = this.getKeyText.bind(this);
        this.state = {
            definition: {
                id: this.props.id,
                type: "TERMS",
                operator: "AND",
                selectedOptions: [],
                dataField: this.props.dataField,
                group: this.props.group,
                index: this.props.index
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
            this.props.termSelected(this.props.id, [checkboxElem.target.value]);
        } else {
            this.props.termUnSelected(this.props.id, [checkboxElem.target.value]);
        }
    }

    getKeyText(key){
        if(key){
            if(this.props.keyMapper){
                return this.props.keyMapper(key);
            }else{
                return key;
            }
        }else{
            return this.props.emptyText;
        }
    }
    renderTerms(){
        if( _.has(this, ["props","filterStore",this.props.id]) ){

            let filter = _.get(this, ["props","filterStore",this.props.id]);

            const terms = filter.options;

            return Object.keys(terms).map((key,index) => {
                let keyText = this.getKeyText(key);
                if( keyText.length > 20) {
                    keyText = keyText.substring(0,20) + "...";
                }
                return (
                    <div key={key} className="form-check">
                        <input className="form-check-input" type="checkbox"
                               value={key} id={key} onChange={this.inputChanged}
                               checked={filter.selected && filter.selected.options.includes(key)}/>
                        <label className="form-check-label item-name">
                            {keyText }  <span className="item-count">({terms[key]})</span>
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
        filterStore: state.filterStore,
        searchQuery: searchQuerySelector(state, {excludeMe: props.id, group: props.group})
    };
}


export default connect(mapStateToProps, {termSelected,termUnSelected, getDistinctTerms})(ListFilter);

