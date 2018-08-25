import React, {Component} from 'react';
import {connect} from "react-redux";
import {getDistincTerms, registerFilter, termSelected, termUnSelected} from "../../actions/search.actions";
import {filterByIdSelector} from "../../models/selectors";

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

    componentDidMount(){
        this.props.getDistincTerms( this.state.definition);
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

            return Object.keys(terms).map((key,index) => (
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value={key} id={key} onChange={this.inputChanged}/>
                    <label className="form-check-label">
                        {key} ({terms[key]})
                    </label>
                </div>
            ));
        }
    }

    render(){
        return (<div>
                    <label>{this.props.title}</label>
                    {this.renderTerms()}
                </div>
            );
    }
}

function mapStateToProps(state, props) {
    return {
        filter: filterByIdSelector(state, props.id)
    };
}


export default connect(mapStateToProps, {termSelected,termUnSelected, getDistincTerms})(ListFilter);

