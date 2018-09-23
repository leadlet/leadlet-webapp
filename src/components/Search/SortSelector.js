import React from 'react';
import Select from 'react-select';
import {connect} from "react-redux";
import {changeSort, clearSort} from "../../actions/search.actions";


class SortSelector extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange = (selectedOption) => {

        if( !selectedOption ){
            this.props.clearSort( {id: this.props.id}) ;
        }else{
            this.props.changeSort( {id: this.props.id, dataField: selectedOption.value.dataField,
                group: this.props.group, order: selectedOption.value.order,
                label: selectedOption.label}) ;
        }

    }
    render() {
        let sort = this.props.sortStore[this.props.id];
        return (
            <Select
                className={this.props.className}
                value={ sort && {
                    label: sort.label,
                    value: {
                        dataField: sort.dataField,
                        order: sort.dataField
                    }
                }}
                onChange={this.handleChange}
                options={this.props.options}
                placeholder="Sort by.."
            />
        );
    }
}

function mapStateToProps(state, props) {
    return {
        sortStore: state.sortStore
    }
}

export default connect(mapStateToProps, {changeSort, clearSort})(SortSelector);
