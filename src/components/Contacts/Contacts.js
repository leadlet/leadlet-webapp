import React, {Component} from 'react';
import {contactConstants} from "../../constants/contact.constants";
import {connect} from 'react-redux';
import {getAll} from "../../actions/contact.actions";
import {ContactList} from "./ContactList";
import ContactEdit from "./ContactNew";
import ToggleButton from "react-bootstrap/es/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/es/ToggleButtonGroup";
import FormGroup from "react-bootstrap/es/FormGroup";
import InputGroup from "react-bootstrap/es/InputGroup";
import Button from "react-bootstrap/es/Button";
import FormControl from "react-bootstrap/es/FormControl";
import Form from "react-bootstrap/es/Form";

class Contacts extends Component {

    constructor(props) {
        super(props);

        this.state = {
            term: "",
            showEditModal: false,
            contactSelectedForEdit: null,
            selectedType: contactConstants.CONTACT_TYPE_ALL
        };

        this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.openEditModal = this.openEditModal.bind(this);
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

    openEditModal(contact) {
        this.setState({showEditModal: true});
        this.setState({contactSelectedForEdit: contact});
    }

    closeEditModal() {
        this.setState({showEditModal: false});
    }

    onTypeChange = (value) => {
        this.setState({selectedType: value});
    };

    render() {
        return (
            <div className="container full-height" style={{'overflow-y': 'hidden'}}>
                <div className="row full-height">
                    <div className="col-sm-8 full-height">
                        <div className="ibox full-height">
                            <div className="ibox-content full-height">
                                    <span className="text-muted small pull-right">Last modification: <i
                                        className="fa fa-clock-o"/> 2:10 pm - 12.06.2014</span>
                                <h2>Contacts</h2>
                                <p>
                                    All clients need to be verified before you can send email and set a project.
                                </p>

                                <div>
                                    <Form inline onSubmit={this.onSearchSubmit}>
                                        <FormGroup bsSize="small">
                                            <ToggleButtonGroup type="radio" name="contactType"
                                                               value={this.state.selectedType}
                                                               onChange={this.onTypeChange}>
                                                <ToggleButton className="btn-sm active"
                                                              value={contactConstants.CONTACT_TYPE_ALL}>All </ToggleButton>
                                                <ToggleButton className="btn-sm"
                                                              value={contactConstants.CONTACT_TYPE_PERSON}>Person <i
                                                    className="fa fa-users"></i></ToggleButton>
                                                <ToggleButton className="btn-sm"
                                                              value={contactConstants.CONTACT_TYPE_ORGANIZATION}>Organization
                                                    <i className="fa fa-industry"></i></ToggleButton>
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
                                        <FormGroup bsSize="small" className="pull-right">
                                            <button className="btn btn-primary btn-sm pull-right" type="button"
                                                    onClick={this.openEditModal}><i className="fa fa-plus"></i>&nbsp;
                                                Create
                                            </button>
                                        </FormGroup>
                                    </Form>
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
                            </div>
                        </div>
                    </div>
                    <div>
                        <ContactEdit showEditModal={this.state.showEditModal}
                                     close={this.closeEditModal}
                                     contact={this.state.contactSelectedForEdit}
                        />
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