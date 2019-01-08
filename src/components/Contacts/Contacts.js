import React, {Component} from 'react';
import {connect} from 'react-redux';
import NewEditContact from "./NewEditContact";
import Badge from "react-bootstrap/es/Badge";
import SweetAlert from 'sweetalert-react';
import {getAllContact, _deleteContacts} from "../../actions/contact.actions";
import {ContactList} from "./ContactList";

const CONTACT_CONTACT = 'contact';


class Contacts extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentPage: 1,
            pageSize: 10,
            checked: false,
            showDeleteDialog: false,
            showContactModal: false,
            contactSelectedForEdit: null,
            selectedType: CONTACT_CONTACT
        };

        this.openContactModal = this.openContactModal.bind(this);
        this.closeEditModal = this.closeEditModal.bind(this);
        this.onCheckChange = this.onCheckChange.bind(this);
        this.onContactRowSelected = this.onContactRowSelected.bind(this);
        this.onContactRowSelectAll = this.onContactRowSelectAll.bind(this);
        this.confirmDeleteActivity = this.confirmDeleteActivity.bind(this);
        this.cancelDeleteActivity = this.cancelDeleteActivity.bind(this);

        this.openDeleteDialog = this.openDeleteDialog.bind(this);

        this.filterContacts = this.filterContacts.bind(this);

        this.onPageChange = this.onPageChange.bind(this);

        this.getSelectedCount = this.getSelectedCount.bind(this);
        this.clearSelections = this.clearSelections.bind(this);

    }

    onPageChange(page, sizePerPage) {
        this.setState({
            pageSize: sizePerPage,
            currentPage: page
        }, () => {
            this.filterContacts();
        });
    }


    openDeleteDialog() {
        this.setState({
            showDeleteDialog: true
        });
    }

    confirmDeleteActivity() {
        this.setState({
            showDeleteDialog: false
        });
        if( this.state.selectedType === CONTACT_CONTACT ){
            this.props._deleteContacts(this.state.selectedContactIds);
            this.setState({
                selectedContactIds: []
            });
        }
    }

    cancelDeleteActivity() {
        this.setState({
            showDeleteDialog: false
        });
    }

    filterContacts() {
        this.props.getAllContact("", this.state.currentPage - 1, this.state.pageSize);
    }

    componentDidMount() {
        this.filterContacts();
    }

    openContactModal(contact) {
        this.setState({showContactModal: true});
        this.setState({contactSelectedForEdit: contact});
    }

    closeEditModal() {
        this.setState({showContactModal: false});
        this.setState({showOrganizationModal: false});
    }


    onCheckChange() {
        if (this.state.checked === false) {
            this.setState({checked: true});
        } else {
            this.setState({checked: false});
        }
    }

    onContactRowSelected({id}, isSelected) {
        if (isSelected) {
            this.setState({
                selectedContactIds: [...this.state.selectedContactIds, id].sort()
            });
        } else {
            this.setState({selectedContactIds: this.state.selectedContactIds.filter(it => it !== id)});
        }
        return true;
    }

    onContactRowSelectAll(isSelected, currentDisplayAndSelectedData) {
        const ids = currentDisplayAndSelectedData.map(item => {
            return item.id
        });

        if (isSelected) {
            this.setState({
                selectedContactIds: [...this.state.selectedContactIds, ...ids].sort()
            });
        } else {
            this.setState({selectedContactIds: this.state.selectedContactIds.filter(it => !ids.includes(it))});
        }
    }

    renderList() {

        let data = null;

        if (this.state.selectedType === CONTACT_CONTACT) {
            data = this.props.contacts;
            return (
                data.ids &&
                <ContactList
                    data={data}
                    selectedRows={this.state.selectedContactIds}
                    sizePerPage={this.state.sizePerPage}
                    currentPage={this.state.currentPage}
                    onRowSelect={this.onContactRowSelected}
                    onSelectAll={this.onContactRowSelectAll}
                    onPageChange={this.onPageChange}
                />
            )
        }
    }

    getSelectedCount() {
        if (this.state.selectedType === CONTACT_CONTACT) {
            return this.state.selectedContactIds && this.state.selectedContactIds.length;
        }
    }

    clearSelections(){
        this.setState({
            selectedContactIds: []
                        });
    }
    render() {
        return (
            <div className="container-fluid">
                <div className="ibox m-t-md">
                    <div className="ibox-content">
                        <div className="row m-b-sm">
                            <div className="col-md-4">
                            </div>
                        </div>
                        <div className="row">
                            <div className="row row-flex pull-right">

                                <button type="button"
                                        className="btn btn-primary btn-sm"
                                        onClick={this.openContactModal}>
                                    <i className="fa fa-plus"/> Add
                                </button>

                                {
                                    this.getSelectedCount() > 0 &&
                                        <button type="button"
                                                className="btn btn-danger btn-xs m-l-sm"
                                                onClick={this.openDeleteDialog}>
                                            <i className="fa fa-trash"/> {'Delete '}
                                            <Badge>{this.getSelectedCount()}</Badge>
                                        </button>
                                }
                                {
                                    this.getSelectedCount() > 0 &&
                                    <button type="button"
                                            className="btn btn-info btn-xs m-l-sm"
                                            onClick={this.clearSelections}>
                                        <i className="fa fa-remove"/> {'Clear Selected '}
                                        <Badge>{this.getSelectedCount()}</Badge>
                                    </button>
                                }

                            </div>
                            <div>
                                {this.renderList()}
                            </div>
                            <div>
                                <NewEditContact showEditModal={this.state.showContactModal}
                                               close={this.closeEditModal}
                                               contact={this.state.contactSelectedForEdit}
                                />
                            </div>

                            <div>
                                <SweetAlert
                                    title="Are you sure?"
                                    text={`You will delete ${this.getSelectedCount()}! records`}
                                    type="warning"
                                    showCancelButton={true}
                                    confirmButtonColor="#DD6B55"
                                    confirmButtonText="Yes, delete it!"
                                    show={this.state.showDeleteDialog}
                                    onConfirm={this.confirmDeleteActivity}
                                    onCancel={this.cancelDeleteActivity}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        contacts: state.contacts
    };
}

export default connect(mapStateToProps, {getAllContact, _deleteContacts})(Contacts);