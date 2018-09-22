import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {createNote} from "../../actions/note.actions";


class Note extends Component {

    constructor(props) {
        super(props);
        this.state = {
            noteText: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(event) {
        this.setState({noteText: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();

        let note = {
            content: this.state.noteText,
            ...this.props.initialValues
        };

        /*
            TODO: The problem is when we create a note, we will trigger timeline index on serverside also
            creating an index on server side may take some time like.
            If we refresh the timeline right after creating a note, it is possible to not see new note on timeliene.
            As a workaround we put a delay for calling onchange function after note creation.
         */
        this.props.createNote( note, () => setTimeout(function() { //Start the timer
                                                this.props.onChange();
                                            }.bind(this), 1000));
        this.setState({noteText: ''});
    }

    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <textarea placeholder="Please enter a note."
                              className="form-control"
                              value={this.state.noteText}
                              onChange={this.handleChange}
                    />
                </div>
                <div className="text-right">
                    <button type="submit"
                            className="btn btn-sm btn-primary m-t-n-xs">
                        <strong>Save</strong></button>
                </div>
            </form>
        );
    }

}

function mapStateToProps(state) {
    return {

    };
}

export default connect(mapStateToProps, {createNote})(Note);
