import React, {Component} from 'react';
import {connect} from 'react-redux';
import ContactPerson from "./ContactPerson";
import ContactOrganization from "./ContactOrganization";
import ToggleButton from "react-bootstrap/es/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/es/ToggleButtonGroup";
import FormGroup from "react-bootstrap/es/FormGroup";
import FormControl from "react-bootstrap/es/FormControl";
import Badge from "react-bootstrap/es/Badge";
import SweetAlert from 'sweetalert-react';
import _ from "lodash"
import Dropdown from "react-bootstrap/es/Dropdown";
import MenuItem from "react-bootstrap/es/MenuItem";
import {getAllPerson} from "../../actions/person.actions";
import {getAllOrganization} from "../../actions/organization.actions";
import {PersonList} from "./PersonList";
import {OrganizationList} from "./OrganizationList";

const CONTACT_PERSON = 'person';
const CONTACT_ORGANIZATION = 'organization';


class Contacts extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentPage: 1,
            pageSize: null,
            selected: [],
            term: "",
            checked: false,
            showDeleteDialog: false,
            showPersonModal: false,
            showOrganizationModal: false,
            contactSelectedForEdit: null,
            selectedType: CONTACT_PERSON
        };

        this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.openPersonModal = this.openPersonModal.bind(this);
        this.openOrganizationModal = this.openOrganizationModal.bind(this);
        this.closeEditModal = this.closeEditModal.bind(this);
        this.onTypeChange = this.onTypeChange.bind(this);
        this.onCheckChange = this.onCheckChange.bind(this);
        this.onRowSelect = this.onRowSelect.bind(this);
        this.onSelectAll = this.onSelectAll.bind(this);

        this.confirmDeleteActivity = this.confirmDeleteActivity.bind(this);
        this.cancelDeleteActivity = this.cancelDeleteActivity.bind(this);

        this.openDeleteDialog = this.openDeleteDialog.bind(this);

        this.getFilterQuery = this.getFilterQuery.bind(this);
        this.filterContacts = this.filterContacts.bind(this);

        this.sizePerPageListChange = this.sizePerPageListChange.bind(this);
        this.onPageChange = this.onPageChange.bind(this);

        this.handleSearchTermChange = this.handleSearchTermChange.bind(this);

        this.handleSearchDebounced = _.debounce(function () {
            if (this.state.term && this.state.term.length > 2)
                this.filterContacts();
        }, 500);
    }


    sizePerPageListChange(sizePerPage) {
        this.setState({
            pageSize: sizePerPage
        }, () => {
            this.filterContacts();
        });
    }


    handleSearchTermChange(event) {
        this.setState({term: event.target.value});
        this.handleSearchDebounced();
    }


    onPageChange(page, sizePerPage) {
        this.setState({
            pageSize: sizePerPage,
            currentPage: page
        }, () => {
            this.filterContacts();
        });
    }

    getFilterQuery() {
        let query = '';

        if (this.state.term && this.state.term.length > 0) {
            query = `name:${this.state.term}`;
        }

        /*
        if (this.state.selectedType !== contactConstants.CONTACT_TYPE_ALL) {
            query += (query ? "&" : "") + `type:${this.state.selectedType}`;
        }
        */

        return query;
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
    }

    cancelDeleteActivity() {
        this.setState({
            showDeleteDialog: false
        });
    }

    filterContacts() {
        this.props.getAllPerson(this.getFilterQuery(), this.state.currentPage - 1, this.state.pageSize);
        this.props.getAllOrganization(this.getFilterQuery(), this.state.currentPage - 1, this.state.pageSize);
    }

    componentDidMount() {
        this.filterContacts();
    }

    onSearchSubmit(event) {
        event.preventDefault();
        this.filterContacts();
    }

    onInputChange(event) {
        this.setState({term: event.target.value});
    }

    openPersonModal(contact) {
        this.setState({showPersonModal: true});
        this.setState({contactSelectedForEdit: contact});
    }

    openOrganizationModal(contact) {
        this.setState({showOrganizationModal: true});
        this.setState({contactSelectedForEdit: contact});
    }

    closeEditModal() {
        this.setState({showPersonModal: false});
        this.setState({showOrganizationModal: false});
    }

    onTypeChange = (value) => {
        this.setState({selectedType: value}, () => {
            this.filterContacts();
        });
    };

    onCheckChange() {
        if (this.state.checked === false) {
            this.setState({checked: true});
        } else {
            this.setState({checked: false});
        }
    }

    onRowSelect({id}, isSelected) {
        if (isSelected) {
            this.setState({
                selected: [...this.state.selected, id].sort()
                //, currPage: this.refs.table.state.currPage
            });
        } else {
            this.setState({selected: this.state.selected.filter(it => it !== id)});
        }
        return true;
    }

    onSelectAll(isSelected, currentDisplayAndSelectedData) {
        const ids = currentDisplayAndSelectedData.map(item => {
            return item.id
        });

        if (isSelected) {
            this.setState({
                selected: [...this.state.selected, ...ids].sort()
                //, currPage: this.refs.table.state.currPage
            });
        } else {
            this.setState({selected: this.state.selected.filter(it => !ids.includes(it))});
        }
    }

    renderList(){

        let data = null;

        if( this.state.selectedType === CONTACT_PERSON){
            data = this.props.persons;
            return (
                data.ids &&
                <PersonList
                    data={data}
                    sizePerPage={this.state.sizePerPage}
                    currentPage={this.state.currentPage}
                    type={this.state.selectedType}
                    onEditClicked={() => this.openEditModal}
                    history={this.props.history}
                    onRowSelect={this.onRowSelect}
                    onSelectAll={this.onSelectAll}
                    sizePerPageListChange={this.sizePerPageListChange}
                    onPageChange={this.onPageChange}
                />
            )
        }else {
            data = this.props.organizations;
            return (
                data.ids &&
                <OrganizationList
                    data={data}
                    sizePerPage={this.state.sizePerPage}
                    currentPage={this.state.currentPage}
                    type={this.state.selectedType}
                    onEditClicked={() => this.openEditModal}
                    history={this.props.history}
                    onRowSelect={this.onRowSelect}
                    onSelectAll={this.onSelectAll}
                    sizePerPageListChange={this.sizePerPageListChange}
                    onPageChange={this.onPageChange}
                />
            )
        }
    }
    render() {
        return (
            <div className="container full-height">
                <div className="ibox full-height">
                    <div className="ibox-content full-height">
                        <div className="row m-b-sm">
                            <div className="col-md-4">
                            </div>
                        </div>
                        <div className="row">
                            <div className="row row-flex">
                                <ToggleButtonGroup type="radio"
                                                   name="contactType"
                                                   value={this.state.selectedType}
                                                   onChange={this.onTypeChange}>
                                    <ToggleButton className="btn-sm"
                                                  value={CONTACT_PERSON}>Person <i
                                        className="fa fa-users"/></ToggleButton>
                                    <ToggleButton className="btn-sm"
                                                  value={CONTACT_ORGANIZATION}>Organization <i
                                        className="fa fa-industry"/></ToggleButton>
                                </ToggleButtonGroup>
                                <form className="form-inline m-l-sm">
                                    <FormGroup
                                        controlId="formBasicText">
                                        <FormControl
                                            type="text"
                                            value={this.state.value}
                                            placeholder="Search name"
                                            onChange={this.handleSearchTermChange}
                                            bsSize="small"
                                        />
                                        <FormControl.Feedback/>
                                    </FormGroup>
                                </form>
                                <Dropdown bsSize="small" className="m-l-sm" id="contactAdd">
                                    <Dropdown.Toggle noCaret>
                                        <i className="fa fa-plus"/> Add
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <MenuItem href="#" onClick={this.openPersonModal}>Person</MenuItem>
                                        <MenuItem href="#" onClick={this.openOrganizationModal}>Organization</MenuItem>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <button type="button"
                                        className={this.state.selected.length > 0 ? "btn btn-danger btn-sm m-l-sm" : "btn btn-danger btn-sm m-l-sm hidden"}
                                        onClick={this.openDeleteDialog}>
                                    <i className="fa fa-trash"/> {'Delete '}
                                    <Badge>{this.state.selected.length}</Badge>
                                </button>
                            </div>
                            <div className="clients-list">
                                {this.renderList()}
                            </div>
                            <div>
                                <ContactPerson showEditModal={this.state.showPersonModal}
                                               close={this.closeEditModal}
                                               contact={this.state.contactSelectedForEdit}
                                />
                            </div>
                            <div>
                                <ContactOrganization showEditModal={this.state.showOrganizationModal}
                                                     close={this.closeEditModal}
                                                     contact={this.state.contactSelectedForEdit}
                                />
                            </div>
                            <div>
                                <SweetAlert
                                    title="Are you sure?"
                                    text={`You will delete ${this.state.selected.length}! contacts`}
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
        persons: state.persons,
        organizations: state.organizations
    };
}

export default connect(mapStateToProps, {getAllPerson, getAllOrganization})(Contacts);