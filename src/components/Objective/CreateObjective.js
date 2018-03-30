import React, {Component} from 'react';
import {connect} from "react-redux";
import {reduxForm} from "redux-form";
import Modal from "react-bootstrap/es/Modal";
import Field from "redux-form/es/Field";
import renderInputField from "../../formUtils/renderInputField";
import renderSelectField from "../../formUtils/renderSelectField";
import {createObjectiveForTeam, createObjectiveForUser} from "../../actions/objective.actions";

class CreateObjective extends Component {

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    onSubmit = (formValues) => {

        let objective = {
            teamId: formValues.teamId,
            userId: formValues.userId,
            name: formValues.name,
            dailyAmount: formValues.dailyAmount,
            weeklyAmount: formValues.weeklyAmount,
            monthlyAmount: formValues.monthlyAmount
        }

        if (objective.teamId !== undefined) {
            this.props.createObjectiveForTeam(objective);
        } else {
            this.props.createObjectiveForUser(objective);
        }

        this.props.close();
    }

    onClose() {
        this.props.reset();
        this.props.close();
    }

    render() {
        const {handleSubmit} = this.props;

        return (
            <Modal show={this.props.showModal} onHide={this.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Objective</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <Field
                            name="name"
                            component={renderSelectField}
                            label="Objective Name"
                            options={[
                                {label: "CALL", value: "CALL"},
                                {label: "MEETING", value: "MEETING"},
                                {label: "TASK", value: "TASK"},
                                {label: "DEADLINE", value: "DEADLINE"},
                                {label: "EMAIL", value: "EMAIL"}]}
                        />
                        <Field
                            name="dailyAmount"
                            type="number"
                            component={renderInputField}
                            label="Daily"
                        />
                        <Field
                            name="weeklyAmount"
                            type="number"
                            component={renderInputField}
                            label="Weekly"
                        />
                        <Field
                            name="monthlyAmount"
                            type="number"
                            component={renderInputField}
                            label="Monthly"
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
    return {}
}

export default reduxForm({
    form: 'postNewObjectiveForm',
    enableReinitialize: true
})(
    connect(mapStateToProps, {createObjectiveForTeam, createObjectiveForUser})(CreateObjective)
);