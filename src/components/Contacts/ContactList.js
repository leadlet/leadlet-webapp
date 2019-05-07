import React from 'react';
import './../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import Link from "react-router-dom/es/Link";

export const ContactList = function (props) {

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
                phones: data.items[id].phones
            };
        });
    }

    function nameFormatter(cell, row) {
        return (<Link to={"/contact/" + row.id}>{cell}</Link>);
    }

    function phonesFormatter(cell, row) {
        if(row.phones && row.phones.length !== 0) {
            return row.phones.filter(phoneRecord => phoneRecord.phone !== null)
                .reduce( (resultString, cur) => {
                    if (resultString.length > 0) {
                        return resultString + ";" + cur.phone;
                    } else {
                        return cur.phone;
                    }
                }, "");
        }
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
                page: props.currentPage,
                hideSizePerPage: true
            }}

        >
            <TableHeaderColumn dataField='name' dataFormat={nameFormatter}>Name</TableHeaderColumn>
            <TableHeaderColumn dataField='email'>Email</TableHeaderColumn>
            <TableHeaderColumn dataField='phones' dataFormat={phonesFormatter}>Phones</TableHeaderColumn>

        </BootstrapTable>
    );
}
