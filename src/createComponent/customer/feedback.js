import { Button, Table, Header, TableHeader, TableHeaderCell, TableBody, Form, Modal, ModalHeader, ModalContent } from 'semantic-ui-react';
import React, { Component } from 'react';
import axios from 'axios';

class Feedback extends Component {
    constructor(props) {
        super(props);
        this.state = {
            custId: this.props.match.params.custID,
            progId: this.props.match.params.progID,
            sessId: this.props.match.params.sessID,
            coachId: this.props.match.params.coachID,
            feedback: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        console.log("feedback"+ event.target.value)
        this.setState({feedback: event.target.value});
    }
    handleSubmit = () => {
        const {custId, progId, sessId, coachId, feedback}= this.state;
        console.log("custId: "+custId);
        console.log("progId: "+progId);
        console.log("sessId: "+sessId);
        console.log("feedback: "+feedback);
        axios.post('http://localhost:8080/customer/updateFocusFeedback',{
            program_id: progId,
            customer_id: custId,
            session_id: sessId,
            coach_id: coachId,
            feedback: feedback
        });
        window.location.href='/CustomersDetail/'+custId;
    }
    render() {
        return(
            <Form onSubmit={this.handleSubmit}>
                <Form.Field>
                <label>Feedback</label>
                <textarea placeholder="Feedback" value={this.state.feedback} onChange={this.handleChange}/>
                </Form.Field>
                <Form.Button content='Submit' />
            </Form>
        )
    }
}

export default Feedback;