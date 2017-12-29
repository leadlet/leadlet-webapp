import React from 'react';
import './../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import Link from "react-router-dom/es/Link";

export const ContactList = function (props) {

    const selectRowProp = {
        mode: 'checkbox',
        onSelect: props.onRowSelect,
        onSelectAll: props.onSelectAll
    };

    function dataMapper(data) {

        return data.ids.map(id => {
            return {
                id: id,
                name: data.items[id].name,
                email: data.items[id].email
            };
        });
    }

    function nameFormatter(cell, row) {
        return (<Link to={"contacts/"+row.id}>{cell}</Link>);
    }

    return (
        <BootstrapTable data={ dataMapper(props.data) }
                        remote={ true }
                        pagination={ true }
                        height='420px'
                        scrollTop={ 'Bottom' }
                        keyField='id'
                        selectRow={ selectRowProp }
                        fetchInfo={ { dataTotalSize: parseInt(props.data.dataTotalSize) } }
                        options={ {
                            sizePerPage: props.sizePerPage,
                            onPageChange: props.onPageChange,
                            sizePerPageList: [ 5, 10 ],
                            page: props.currentPage,
                            onSizePerPageList: props.onSizePerPageList } }

        >
            <TableHeaderColumn dataField='name' dataFormat={nameFormatter}>Name</TableHeaderColumn>
            <TableHeaderColumn dataField='email'>Email</TableHeaderColumn>
        </BootstrapTable>
    );
}

//<Link to={`/contacts/${contact.id}`} > ... </Link>