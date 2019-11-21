import React from 'react';
import axios from 'axios';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import Background from '../../assets/images/PtoC-bk.jpg';

class AssignPtoC extends React.Component {
    state = {
        programsT: [],
        customer: {},
        program: {
            program_template_id: "",
            customer_id: this.props.match.params.custId,
            coach_id: "5dc2f70414b9e52a30d6620e"//get coach
        }
    }
    // Get Customers and Programmes templates
    componentDidMount() {
        axios.get('http://localhost:8080/customer/getCustomerById/'+this.props.match.params.custId)
        .then(res => {
            const customer = res.data;
            this.setState({customer});
        });
        axios.get('http://localhost:8080/programTemplate/getAllProgramTemps')
        .then(res => {
            const programsT = res.data;
            this.setState({programsT});
        });
    };
    // Back to the previous page
    handleClickBack = () => {
        window.history.back();
    };
    // Input Change Handler method to take form inputs
    handleChange = (name, event) => {
        this.setState({
                program: {
                    ...this.state.program,
                    [name]: event.target.value
                }
            });
    };

   // Notify handler for sending notifications
    // handleNotify = async() => {
    //     const { program } = this.state;
    //     const notification = {
    //         customer_id: program.customer_id,
    //         coach_id: program.coach_id,
    //         notify_for: "CUSTOMER",
    //         notify_type: "PROGRAM_ASSIGNED",
    //         message: `You have a new assigned program waiting for you.`
    //     }
        
    //     const response = await fetch(`http://localhost:8080/notification/activate`, {
    //         method: 'POST', // *GET, POST, PUT, DELETE, etc.
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //                     // 'Content-Type': 'application/x-www-form-urlencoded',
    //         },
    //         body: JSON.stringify(notification) // body data type must match "Content-Type" header
    //     });
    //     return await response.json();
    // }
    // Submit the data to backend 
    handleSubmit = async event => {
        const {program} = this.state;
        const response = await fetch(`http://localhost:8080/program/assignProgramTemplate`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(program) // body data type must match "Content-Type" header
        });
        window.location.href='/CustomersDetail/'+this.props.match.params.custId;
        return await response.json; // parses JSON response into native JavaScript objects
    }
    render() {
        var optionsProgram = [];
        this.state.programsT.map((Program) => {
            optionsProgram.push(
                <option label={Program.title}>
                    {Program._id}
                </option>
            );
        });
        var cust = this.state.customer;
        return (
            <body>
                <section class="mbr-fullscreen centerize align-center" style={{backgroundImage: `url(${Background})`}}>
                    <div class="mbr-overlay" style={{opacity: 0.8, backgroundColor: "#232323"}}/>
                    <div class="container align-center media-container-colomn">
                        <h2 class="mbr-bold mbr-white display-2">Assign a Program to {cust.first_name + " "+cust.last_name}</h2> 
                        <br/>
                        <div class="table-wrapper">
                            <div class="container scroll mbr-white display-4" style={{width: "50%"}}>
                                <table class="table">
                                    <tr class="body-item mbr-fonts-style display-7">
                                        <td>Age</td>
                                        <td>{((new Date()).getFullYear()-(new Date(cust.dob)).getFullYear())}</td>
                                    </tr>
                                    <tr class="body-item mbr-fonts-style display-7">
                                        <td>Gender</td>
                                        <td>{cust.gender}</td>
                                    </tr>
                                    <tr class="body-item mbr-fonts-style display-7">
                                        <td>Goal</td>
                                        <td>{cust.goal}</td>
                                    </tr>
                                    <tr class="body-item mbr-fonts-style display-7">
                                        <td>Availability</td>
                                        <td>{cust.availability}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <div><br/></div>
                        <div class="custom-select container" style={{width: "50%"}}>
                            <select onChange={(e) => this.handleChange('program_template_id', e)} style={{width: "100%"}}>
                                {optionsProgram}
                            </select>
                        </div>
                        <div><br/></div>
                        <div>
                            <label for="name-form1-5" class="form-control-label mbr-fonts-style display-7" style={{color: "#FFFFFF"}}>Starting date</label>
                            <input type="date" name="date" data-form-field="Starting Date" required="required" class="form-control display-7 centerize" id="name-form1-5" style={{width: "50%"}}/>
                        </div>
                        <div><br/></div>
                        <a class="col-md-6 btn btn-orange-outline" style={{color: "#FFFFFF", backgroundColor: "#C4643B"}} onClick = {this.handleSubmit}>ASSIGN</a>
                        <div class="align-right">
                            <button type="button" class="btn btn-primary btn-lg active" role="button" aria-pressed="true" onClick = {this.handleClickBack}>
                                <span class="mbrib-arrow-prev mbr-iconfont mbr-iconfont-btn"/>
                                Back
                            </button>
                        </div>

                        {/* <div class="align-right">
                            <button type="button" class="btn btn-primary btn-lg active" role="button" aria-pressed="true" onClick = {this.handleNotify}>
                                <span class="mbrib-arrow-prev mbr-iconfont mbr-iconfont-btn"/>
                                Notify Customer
                            </button>
                        </div> */}
                    </div>
                </section>
            </body>
        );
    };
};

export default AssignPtoC;
