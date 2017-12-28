import React from 'react';
import './../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {BootstrapTable, InsertButton, TableHeaderColumn} from 'react-bootstrap-table';
import Link from "react-router-dom/es/Link";

export const ContactList = function (props) {

    const {contacts, } = props;


    const options = {
        onPageChange: props.onPageChange,
        onSizePerPageList: props.sizePerPageListChange,
        sizePerPage: 10
    };
    const selectRowProp = {
        mode: 'checkbox',
        onSelect: props.onRowSelect,
        onSelectAll: props.onSelectAll
    };

    const contactsMapped = contacts.ids.map(id => {
        return {
            id: id,
            name: contacts.items[id].name,
            email: contacts.items[id].email
        };
    });
    function nameFormatter(cell, row) {
        return (<Link to={"contacts/"+row.id}>{cell}</Link>);
    }

    return (
        <BootstrapTable data={contactsMapped} selectRow={ selectRowProp }
                        pagination
                        height='400px'
                        scrollTop={ 'Bottom' }
                        bordered={ false }
                        keyField='id'
                        options={options}
                        fetchInfo={{dataTotalSize: 20}}
        >
            <TableHeaderColumn dataField='name' dataFormat={nameFormatter}>Name</TableHeaderColumn>
            <TableHeaderColumn dataField='email'>Email</TableHeaderColumn>
        </BootstrapTable>
    );
}

//<Link to={`/contacts/${contact.id}`} > ... </Link>