import React, {Component} from 'react';
import {connect} from "react-redux";
import {registerFilter, textSearched} from "../../actions/search.actions";
import * as _ from "lodash";

class FreeTextFilter extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            definition: {
                id: this.props.id,
                type: "FREE_TEXT",
                selected: null,
                group: this.props.group,
                index: this.props.index
            }
        };

        this.updateUrl = this.updateUrl.bind(this);
        this.handleChange = this.handleChange.bind(this);

        // Debounce
        this.updateUrl = _.debounce(this.updateUrl, 500);

    }

    componentDidMount() {
        this.props.registerFilter(this.state.definition);
    }

    updateUrl(){
        this.props.textSearched(this.props.id, this.state.inputText);
    }

    handleChange(e){
        this.setState({
            inputText: e.target.value
        }, this.updateUrl);
    }


    render(){
        return (<div className="list-filter" id={this.props.id}>
                    {this.props.title == null ? null : <h6 className="filter-name">{this.props.title}</h6>}
                    <div className="filter-items form-group">
                        <input type="text" className="input form-control"
                               placeholder="Search..."
                               onChange={this.handleChange}/>
                    </div>
                </div>
            );
    }
}

function mapStateToProps(state, props) {
    return {
        filterStore: state.filterStore
    };
}


export default connect(mapStateToProps, {textSearched,registerFilter})(FreeTextFilter);

