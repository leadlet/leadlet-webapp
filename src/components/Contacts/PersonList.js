import React from 'react';
import './../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import Link from "react-router-dom/es/Link";

export const PersonList = function (props) {

    const selectRowProp = {
        mode: 'checkbox',
        onSelect: props.onRowSelect,
        onSelectAll: props.onSelectAll,
        selected: props.selectedRows
    };

    function dataMapper(data) {

        return data.ids.map(id => {
            return {
                id: id,
                name: data.items[id].name,
                email: data.items[id].email,
                phones: data.items[id].phones,
                organizationId: data.items[id].organizationId,
                organizationName: data.items[id].organizationName,
            };
        });
    }

    function nameFormatter(cell, row) {
        return (<Link to={"/person/" + row.id}>{cell}</Link>);
    }

    function phonesFormatter(cell, row) {
        return row.phones.reduce(function (result, cur) {
            if (result.length > 0) {
                return result + ";" + cur.phone;
            } else {
                return cur.phone;
            }
        }, "");
    }

    function organizationFormatter(cell, row) {
        return (<Link to={"organization/" + row.organizationId}>{row.organizationName}</Link>);
    }

    return (
        <BootstrapTable
            tableHeaderClass='client-table-header'
            containerClass='client-table-container'
            tableContainerClass='client-table'
            tableBodyClass='table-hover'

            data={dataMapper(props.data)}
            remote={true}
            pagination={true}
            keyField='id'
            selectRow={selectRowProp}
            fetchInfo={{dataTotalSize: parseInt(props.data.dataTotalSize, 10)}}
            options={{
                sizePerPage: props.sizePerPage,
                onPageChange: props.onPageChange,
                sizePerPageList: [5, 10],
                page: props.currentPage,
                onSizePerPageList: props.onSizePerPageList
            }}

        >
            <TableHeaderColumn dataField='name' dataFormat={nameFormatter}>Name</TableHeaderColumn>
            <TableHeaderColumn dataField='email'>Email</TableHeaderColumn>
            <TableHeaderColumn dataField='phones' dataFormat={phonesFormatter}>Phones</TableHeaderColumn>
            <TableHeaderColumn dataField='organizationId'
                               dataFormat={organizationFormatter}>Organization</TableHeaderColumn>
        </BootstrapTable>
    );
}

//<Link to={`/contacts/${contact.id}`} > ... </Link>