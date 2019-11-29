import React from 'react';
import axios from 'axios';
import Select, { components } from 'react-select';

class CreateSession extends React.Component {
    state = {
        session: {
            name: "",
            session_type: "",
            session_status: "",
            session_duration: "",
            session_coach_notes: "",
            session_customer_feedback: "",
            exercises: [],
            session_tag: [],
            measurement_date: "",
            program_template_id: ""
        },
        programs: [],
        exercises: [],
        session_temp: []
    };
    componentDidMount() {
        axios.get('http://localhost:8080/sessionTemplate/getAllSessionTemps')
        .then(res => {
            const session_temp = res.data;
            this.setState({session_temp});
        });
        axios.get('http://localhost:8080/customer/getAllCustomers')
        .then(res => {
            const customers = res.data;
            this.setState({customers});
        });
    }
    handleClickBack = () => {
        this.props.history.push('/visualizeSession');
    }
    // Input Change Handler method to take form inputs
    handleChange = (name, event) => {
        console.log(this.state.session);
        this.setState({
            session: {
                ...this.state.session,
                [name]: event.target.value
            }
        });
        console.log(event.target);
    };
    // Submit handler to add exercise
    handleSubmit = async event => {
        console.log('Testing');
        event.preventDefault();
        const {session} = this.state;
        const response = await fetch(`http://localhost:8080/sessionTemplate/addSessionTemp`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(session) // body data type must match "Content-Type" header
        });
        this.props.history.push('/visualizeSession');
        return await response.json(); // parses JSON response into native JavaScript objects
    };
    render() {
        const {session_temp} = this.state.session_temp;
        var optionsTemp = [];
        var optionsName = [];

        this.state.session_temp.map((tempID, i) => {
            optionsTemp.push(
                <option label = {tempID.name} >{tempID._id}</option>
            );
            optionsName.push(tempID._id);
        });
        return (
            <body>
                <section class="mbr-section content5 cid-rGopDLiVVQ" id="content5-1">
                    <div class="container">
                        <div class="media-container-row">
                            <div class="title col-12 col-md-8">
                                <h2 class="align-center mbr-bold mbr-white pb-3 mbr-fonts-style display-1">CREATE A SESSION</h2>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="mbr-section form1 cid-rGoqoMJvGK mbr-parallax-background" id="form1-3">
                    <div class="mbr-overlay" style={{opacity: 0.7, backgroundColor: "#c1c1c1"}}/>
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="title col-12 col-lg-8"/>
                        </div>
                    </div>
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="media-container-column col-lg-8" data-form-type="formoid">
                                <form action="https://mobirise.com/" method="POST" class="mbr-form form-with-styler">
                                    <div class="row">
                                        <div hidden="hidden" class="alert alert-danger col-12"/>
                                    </div>
                                    <div class="dragArea row">
                                        <div class="col-md-6  form-group" data-for="name">
                                            <label for="name-form1-5" class="form-control-label mbr-fonts-style display-7">Name</label>
                                            <input type="text" name="name" data-form-field="Name" required="required" value={optionsName} class="form-control display-7" id="name-form1-5" onChange={(e) => this.handleChange('session_name', e)} />
                                        </div>
                                        <div class="col-md-6  form-group" data-for="muscles_targeted">
                                            <label for="name-form1-5" class="form-control-label mbr-fonts-style display-7">Session type</label><br />
                                            <select class="form-control display-7" id="name-form1-5" onChange={(e) => this.handleChange('session_type', e)}>
                                            {optionsTemp}
                                            </select>
                                        </div>
                                        <div data-for="message" class="col-md-12 form-group">
                                            <label for="message-form1-3" class="form-control-label mbr-fonts-style display-7">Notes</label>
                                            <textarea name="message" placeholder="Enter description here" onChange={(e) => this.handleChange('session_coach_notes', e)} data-form-field="Message" class="form-control display-7" id="message-form1-3"></textarea>
                                        </div>
                                        <div class="col-md-6  form-group" data-for="program_id">
                                            <label for="name-form1-5" class="form-control-label mbr-fonts-style display-7">Duration</label>
                                            <input type="text" name="duration" data-form-field="Duration" placeholder="0" required="required" class="form-control display-7" id="name-form1-5" onChange={(e) => this.handleChange('session_name', e)} />
                                       </div>
                                        <div class="col-md-6  form-group" data-for="tag">
                                            <label for="name-form1-5" class="form-control-label mbr-fonts-style display-7">Tags</label>
                                            <input class="form-control display-7"  />
                                        </div>
                                        <div class="col-md-6  form-group" data-for="exercises">
                                            <label for="name-form1-5" class="form-control-label mbr-fonts-style display-7">Exercises</label>
                                            <input class="form-control display-7"  />
                                        </div>
                                        <div class="col-md-12 input-group-btn align-center" />
                                        <button type="submit" class="btn btn-form btn-warning display-4" onClick={this.handleSubmit}>
                                            CREATE
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="align-right">
                            <button type="button" class="btn btn-primary btn-lg active" role="button" aria-pressed="true" onClick = {this.handleClickBack}>
                                <span class="mbrib-arrow-prev mbr-iconfont mbr-iconfont-btn"/>
                                Back
                            </button>
                        </div>
                    </div>
                </section>
            </body>
        );
    };
};

export default CreateSession;
