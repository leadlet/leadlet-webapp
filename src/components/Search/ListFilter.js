import React from 'react';
import PropTypes from "prop-types";

class ListFilter extends React.Component {

    constructor(props) {
        super(props);

        this.inputChanged = this.inputChanged.bind(this);
        this.getKeyText = this.getKeyText.bind(this);
        this.renderTerms = this.renderTerms.bind(this);
    }

    inputChanged(checkboxElem){
        if (checkboxElem.target.checked) {
            this.props.onTermSelect(this.props.container, this.props.id, checkboxElem.target.value);
        } else {
            this.props.onTermUnSelect(this.props.container, this.props.id, checkboxElem.target.value);
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
            return "not-defined";
        }
    }

    renderTerms(){

        const terms = this.props.options;

        return Object.keys(terms).map((key,index) => {
            let keyText = this.getKeyText(key);
            if( keyText && keyText.length > 20) {
                keyText = keyText.substring(0,20) + "...";
            }

            return (
                <div key={key} className="form-check">
                    <input className="form-check-input" type="checkbox"
                           value={key} name={key} id={key} onChange={this.inputChanged}
                           checked={this.props.selectedOptions.includes(key)}/>
                    <label className="form-check-label item-name" htmlFor={key}>
                        {keyText }  <span className="item-count">({terms[key]})</span>
                    </label>
                </div>
            );}
        );
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

ListFilter.propTypes = {
    container: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    options: PropTypes.object.isRequired,
    selectedOptions: PropTypes.array.isRequired,
    onTermSelect: PropTypes.func.isRequired,
    onTermUnSelect: PropTypes.func.isRequired,
    defaultSelected: PropTypes.array,
};

export default ListFilter;
