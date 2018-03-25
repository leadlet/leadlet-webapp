import React, {Component} from 'react';
import {connect} from "react-redux";
import {reduxForm} from "redux-form";
import Modal from "react-bootstrap/es/Modal";
import Field from "redux-form/es/Field";
import renderAsyncSelectField from "../../formUtils/renderAsyncSelectField";
import {loadUser} from "../../formUtils/form.actions";
import renderInputField from "../../formUtils/renderInputField";
import {createTeam, updateTeam} from "../../actions/team.actions";

class CreateEditTeam extends Component {

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    onSubmit = (formValues) => {

        let team = {
            id: formValues.id,
            name: formValues.name,
            members: formValues.members.split(",").map(id => { return { "id": id}})
        }

        if (team.id) {
            this.props.updateTeam(team);
        } else {
            this.props.createTeam(team);
        }
        this.props.close();
    }

    onClose() {
        this.props.reset();
        this.props.close();
    }

    render() {
        const {handleSubmit, initialValues} = this.props;

        let title = "";
        if (initialValues && initialValues.id) {
            title = "Update";
        } else {
            title = "Create";
        }

        return (
            <Modal show={this.props.showModal} onHide={this.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title} Agent</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <Field
                            name="name"
                            type="text"
                            component={renderInputField}
                            label="Team Name"
                        />
                        <Field
                            name="members"
                            label="Members"
                            placeholder="Select members"
                            multi={true}
                            component={renderAsyncSelectField}
                            loadOptions={loadUser}
                        />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <div className="row">
                        <div className="col-md-6 pull-right">
                            <div className="pull-right activity-detail-submit">
                                <button className="btn btn-sm btn-default" onClick={this.onClose}>Cancel</button>
                                <button className="btn btn-sm btn-primary" onClick={handleSubmit(this.onSubmit)}>
                                    <strong>Submit</strong></button>
                            </div>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>
        );
    }
}

function mapStateToProps(state) {
    return {
        ids: state.teams.ids,
        teams: state.teams.items
    }
}

export default reduxForm({
    form: 'postNewTeamForm',
    enableReinitialize: true
})(
    connect(mapStateToProps, {updateTeam, createTeam})(CreateEditTeam)
);