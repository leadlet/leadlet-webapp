import React, {Component} from 'react';
import {contactConstants} from "../../constants/contact.constants";
import {connect} from 'react-redux';
import {getAll} from "../../actions/contact.actions";
import {ContactList} from "./ContactList";
import ContactPerson from "./ContactPerson";
import ContactOrganization from "./ContactOrganization";
import ToggleButton from "react-bootstrap/es/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/es/ToggleButtonGroup";
import FormGroup from "react-bootstrap/es/FormGroup";
import InputGroup from "react-bootstrap/es/InputGroup";
import Button from "react-bootstrap/es/Button";
import FormControl from "react-bootstrap/es/FormControl";
import Form from "react-bootstrap/es/Form";
import MenuItem from "react-bootstrap/es/MenuItem";
import Dropdown from "react-bootstrap/es/Dropdown";

class Contacts extends Component {

    constructor(props) {
        super(props);

        this.state = {
            term: "",
            showPersonModal: false,
            showOrganizationModal: false,
            contactSelectedForEdit: null,
            selectedType: contactConstants.CONTACT_TYPE_ALL
        };

        this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.openPersonModal = this.openPersonModal.bind(this);
        this.openOrganizationModal = this.openOrganizationModal.bind(this);
        this.closeEditModal = this.closeEditModal.bind(this);
        this.onTypeChange = this.onTypeChange.bind(this);
    }

    componentDidMount() {
        this.props.getAll(`name:${this.state.term}`);
    }

    onSearchSubmit(event) {
        event.preventDefault();
        this.props.getAll(`name:${this.state.term}`);

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
        this.setState({selectedType: value});
    };

    render() {
        return (
            <div className="container full-height" style={{'overflow-y': 'hidden'}}>
                <div className="ibox full-height">
                    <div className="ibox-content full-height">
                        <div className="row m-b-lg">
                            <div className="col-md-4">
                                <div className="col-md-1 pull-right">
                                    <Dropdown id="contact-operations">
                                        <Dropdown.Toggle noCaret>
                                            <i className="fa fa-plus" aria-hidden="true"></i> Add
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <MenuItem href="#" onClick={this.openPersonModal}>Contact: Person</MenuItem>
                                            <MenuItem href="#" onClick={this.openOrganizationModal}>Contact: Organization</MenuItem>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>

                                <div className="col-md-1 pull-right m-r-lg">
                                    <Dropdown id="detail-operations">
                                        <Dropdown.Toggle noCaret>
                                            <i className="fa fa-cog" aria-hidden="true"></i>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <MenuItem href="#">Export</MenuItem>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                                <h2>Contacts</h2>
                            </div>
                        </div>
                        <div className="row full-height">
                            <div>
                                <Form inline onSubmit={this.onSearchSubmit}>
                                    <FormGroup bsSize="small">
                                        <ToggleButtonGroup type="radio" name="contactType"
                                                           value={this.state.selectedType}
                                                           onChange={this.onTypeChange}>
                                            <ToggleButton className="btn-sm"
                                                          value={contactConstants.CONTACT_TYPE_ALL}>All
                                            </ToggleButton>
                                            <ToggleButton className="btn-sm"
                                                          value={contactConstants.CONTACT_TYPE_PERSON}>Person <i
                                                className="fa fa-users"></i></ToggleButton>
                                            <ToggleButton className="btn-sm"
                                                          value={contactConstants.CONTACT_TYPE_ORGANIZATION}>Organization <i className="fa fa-industry"></i></ToggleButton>
                                        </ToggleButtonGroup>
                                    </FormGroup>
                                    <FormGroup bsSize="small" className="m-l-sm">
                                        <InputGroup>
                                            <FormControl type="text" onChange={this.onInputChange}/>
                                            <InputGroup.Button>
                                                <Button bsSize="small" onClick={this.onSearchSubmit}>Search</Button>
                                            </InputGroup.Button>
                                        </InputGroup>
                                    </FormGroup>
                                </Form>
                                <span className="text-muted small pull-right">Last modification: <i
                                    className="fa fa-clock-o"/> 2:10 pm - 12.06.2014</span>
                            </div>

                            <div className="clients-list full-height">

                                {
                                    this.props.contacts.ids &&
                                    <ContactList
                                        contacts={this.props.contacts}
                                        type={this.state.selectedType}
                                        onEditClicked={() => this.openEditModal}
                                        history={this.props.history}
                                    />
                                }
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

export default connect(mapStateToProps, {getAll})(Contacts);