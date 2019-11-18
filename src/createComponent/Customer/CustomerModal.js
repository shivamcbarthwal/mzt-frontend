import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import clsx from 'clsx';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import PropTypes from 'prop-types';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import { amber, green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles } from '@material-ui/core';
import Spinner from './Spinner';
import 'semantic-ui-css/semantic.min.css';
import { Button, Table, Header, TableHeader, TableHeaderCell, TableBody, TableFooter, Modal, ModalHeader, ModalContent } from 'semantic-ui-react';
import '../assets/web/assets/mobirise-icons/mobirise-icons.css';
import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/bootstrap/css/bootstrap-grid.min.css';
import '../assets/bootstrap/css/bootstrap-reboot.min.css';
import '../assets/tether/tether.min.css'
import '../assets/dropdown/css/style.css'
import '../assets/theme/css/style.css'
import '../assets/mobirise/css/mbr-additional.css'
import './Customer.css';
import moment from 'moment';
import { program } from '@babel/types';
import { textAlign } from '@material-ui/system';

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon
};
const styles = theme => ({
    success: {
        backgroundColor: green[600]
    },
    error: {
        backgroundColor: theme.palette.error.dark
    },
    info: {
        backgroundColor: theme.palette.primary.main
    },
    warning: {
        backgroundColor: amber[700]
    },
    icon: {
        fontSize: 20
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1)
    },
    message: {
        display: 'flex',
        alignItems: 'center'
    }
});
var ResultList1 = [];
var ResultList2 = [];

class CustomerModal extends Component {
    state = {
        customers: null,
        programs: [],
        optionResult: [],
        open: false,
        setOpen: false
    };
    handleClose = () => {
        this.setState({ open: false});
    };
    showSpinner = () => {
        this.setState({ open: true});
    };
    handleClickAssignProgram = () => {
        this.props.history.push('/AssignPtoC');
    };
    handleClickBack = () => {
        this.props.history.push('/customerList');
    };
    handleClickActiveSession = (progId, index) => () =>{
        axios.post('http://localhost:8080/program/coachUpdateSessionStatus',{
            program_id: progId,
            sessionNumber: index
        });
        window.location.href='/CustomersDetail/'+this.props.match.params.customerID;
    };
    handleClickCancelProgram = (progId) => () =>{
        axios.post('http://localhost:8080/program/coachUpdateProgramStatus',{
            program_id: progId
        });
        window.location.href='/CustomersDetail/'+this.props.match.params.customerID;
    }
    componentDidMount(){
        axios.get(`http://localhost:8080/customer/getCustomerById/${this.props.match.params.customerID}`)
        .then(res => {
            const customers = res.data;
            this.setState({ customers });
        });
        axios.get(`http://localhost:8080/program/getProgramByCustomerId/${this.props.match.params.customerID}`)
        .then(res => {
            const programs = res.data;
            if (!programs) {
                this.setState({ open: true });
            } 
            else {
                this.setState({ programs },()=>{
                    this.state.programs.map((prog) =>{
                        axios({
                            method: 'get',
                            url: 'http://localhost:8080/customer/getCustomerMeasurementsById',
                            params:{
                                program_id: prog._id,
                                customer_id: this.props.match.params.customerID
                            }
                        })
                        .then(res => {
                            const results = res.data;
                            results.map(result =>{
                                this.setState({"optionResult": this.state.optionResult.concat(result)});
                            })
                        })
                        .catch(e => {
                            console.log(e);
                        });
                    })
                });
            }
        })
        .catch(e => {
            console.log(e);
        });
        
    };
    render() {
        console.log(this.state.programs);
        console.log(this.state.optionResult);
        const { customers, open} = this.state;
        const Icon = variantIcon["warning"];
        const programList1 = [];
        const programList2 = [];
        const programLists = [];
        this.state.programs.map(Program =>{
            if(Program.status == "ASSIGNED"){
                programList1.push(Program);
            }
        });
        this.state.programs.map(Program =>{
            if(Program.status == "IN_PROGRESS"){
                programList1.push(Program);
            }
        });
        this.state.programs.map(Program =>{
            if(Program.status == "COMPLETED"){
                programList2.push(Program);
            }
        });
        this.state.programs.map(Program =>{
            if(Program.status == "CANCELED"){
                programList2.push(Program);
            }
        });
        var SessionList1 = [];
        var SessionList2 = [];
        if (customers){
            return (
                <body>
                    <section class="services5 cid-rHakXOOQSN" id="services5-c" style={{padding: "25px"}}>  
                        <div class="container">
                            <div class="media-container-row">
                                <div class="title" style={{width: "50%"}}>
                                    <div class="media-container-colomn align-center">
                                        <h2 class="mbr-fonts-style m-0 display-2 text-center">
                                        {customers.first_name} {customers.last_name}
                                        </h2>
                                        <br/>
                                        <h5 class="display-5">{customers.email}</h5>
                                    </div>
                                </div>
                                <div style={{width: "50%"}}>
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>Age</th>
                                                <th>Gender</th>
                                                <th>Goal</th>
                                                <th>Availability</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{((new Date()).getFullYear()-(new Date(customers.dob)).getFullYear())}</td>
                                                <td>{customers.gender}</td>
                                                <td>{customers.goal}</td>
                                                <td>{customers.availability}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                {programList1.map((program) => {
                    ResultList1 = [];
                    SessionList1 = [];
                    this.state.optionResult.map((res,index)=>{
                        if(res.program_id === program._id){
                            ResultList1.push(
                                <Table>
                                    <TableHeader>
                                        <Table.Row>
                                            <TableHeaderCell>Measurement Date</TableHeaderCell>
                                            <TableHeaderCell>{moment(res.measurement_date).format("YYYY-MM-DD")}</TableHeaderCell>
                                        </Table.Row>
                                        <Table.Row>
                                            <TableHeaderCell>Heart Rate 1</TableHeaderCell>
                                            <TableHeaderCell>Heart Rate 2</TableHeaderCell>
                                            <TableHeaderCell>Heart Rate 3</TableHeaderCell>
                                            <TableHeaderCell>Dickson Metric</TableHeaderCell>
                                        </Table.Row>
                                    </TableHeader>
                                    <TableBody>
                                        <Table.Row>
                                            <Table.Cell>{res.heartRate1}</Table.Cell>
                                            <Table.Cell>{res.heartRate2}</Table.Cell>
                                            <Table.Cell>{res.heartRate3}</Table.Cell>
                                            <Table.Cell>{res.dickson_metric}</Table.Cell>
                                        </Table.Row>
                                    </TableBody>
                                </Table>
                            )
                        }
                    });
                    programLists.push(
                    <div class="card px-3 col-12">
                        <div class="card-wrapper media-container-row media-container-row">
                            <div class="card-box">
                                <div class="top-line pb-3">
                                    <h4 class="card-title mbr-fonts-style display-5">
                                    {program.title}
                                    </h4>
                                    <div class="mbr-text align-left display-5" style={{width:'50%'}}>{program.goal}</div>
                                        <div class="mbr-text align-right display-5" style={{width:'50%'}}>
                                            {program.status}
                                            <br/>
                                            <Button primary size="medium" onClick={this.handleClickCancelProgram(program._id)}>
                                                Cancel the Program
                                            </Button>
                                            <Modal trigger={<Button primary size="medium">Show Results</Button>} style={{marginLeft:'300px'}} closeIcon>
                                                <ModalHeader style={{textAlign:'center'}}>Show Results of {program.title}</ModalHeader>
                                                <ModalContent>
                                                    {ResultList1}
                                                </ModalContent>
                                            </Modal>
                                        </div>
                                </div>
                                <div class="bottom-line">
                                    <p class="mbr-text mbr-fonts-style m-0 b-descr display-6">
                                    {program.description}
                                    </p>
                                </div>
                                <br/>
                                <details>
                                    <summary class="card-title mbr-fonts-style display-5">
                                        Show Sessions
                                    </summary>
                                    <Table structured celled>
                                        <TableHeader>
                                            <Table.Row>
                                                <TableHeaderCell>Session</TableHeaderCell>
                                                <TableHeaderCell>Status</TableHeaderCell>
                                                <TableHeaderCell>Opration</TableHeaderCell>
                                            </Table.Row>
                                        </TableHeader>
                                        <TableBody>

                                        
                                {program.sessions.map((session, index) => {
                                    if(session.session_status == "CLOSED"){
                                        SessionList1.push(
                                            <Table.Row>
                                                <Table.Cell>{session.name}</Table.Cell>
                                                <Table.Cell>{session.session_status}</Table.Cell>
                                                <Table.Cell>
                                                    <Button primary size="small" onClick={this.handleClickActiveSession(program._id, index)}>
                                                        Open the session
                                                    </Button>
                                                </Table.Cell>
                                            </Table.Row>
                                        )
                                    }
                                    else{
                                        if(session.session_status == "OPENED"){
                                            SessionList1.push(
                                                <Table.Row>
                                                    <Table.Cell>{session.name}</Table.Cell>
                                                    <Table.Cell>{session.session_status}</Table.Cell>
                                                    <Table.Cell>
                                                    <Button primary size="small" onClick={this.handleClickActiveSession(program._id, index)}>
                                                        Close the session
                                                    </Button>
                                                </Table.Cell>
                                                </Table.Row>
                                            )
                                        }
                                        else{
                                            if(session.session_type=="focus"){
                                                SessionList1.push(
                                                    <Table.Row>
                                                        <Table.Cell>{session.name}</Table.Cell>
                                                        <Table.Cell>{session.session_status}</Table.Cell>
                                                        <Table.Cell>
                                                        <Button primary size="small">
                                                            Show session result
                                                        </Button>
                                                        </Table.Cell>
                                                    </Table.Row>
                                                )}
                                            else{
                                                SessionList1.push(
                                                    <Table.Row>
                                                        <Table.Cell>{session.name}</Table.Cell>
                                                        <Table.Cell>{session.session_status}</Table.Cell>
                                                        <Table.Cell>
                                                        </Table.Cell>
                                                    </Table.Row>
                                                )}
                                            }
                                        }
                                    }
                                )}
                                
                                    {SessionList1}
                                    </TableBody>
                                    </Table>
                                </details>
                            </div>
                        </div>
                    </div>
                )})
            }
            {programList2.map((program) => {
                ResultList2 = [];
                SessionList2 = [];
                this.state.optionResult.map((res,index)=>{
                    if(res.program_id === program._id){
                        ResultList2.push(
                            <Table>
                                <TableHeader>
                                    <Table.Row>
                                        <TableHeaderCell>Measurement Date</TableHeaderCell>
                                        <TableHeaderCell>{moment(res.measurement_date).format("YYYY-MM-DD")}</TableHeaderCell>
                                    </Table.Row>
                                    <Table.Row>
                                        <TableHeaderCell>Heart Rate 1</TableHeaderCell>
                                        <TableHeaderCell>Heart Rate 2</TableHeaderCell>
                                        <TableHeaderCell>Heart Rate 3</TableHeaderCell>
                                        <TableHeaderCell>Dickson Metric</TableHeaderCell>
                                    </Table.Row>
                                </TableHeader>
                                <TableBody>
                                    <Table.Row>
                                        <Table.Cell>{res.heartRate1}</Table.Cell>
                                        <Table.Cell>{res.heartRate2}</Table.Cell>
                                        <Table.Cell>{res.heartRate3}</Table.Cell>
                                        <Table.Cell>{res.dickson_metric}</Table.Cell>
                                    </Table.Row>
                                </TableBody>
                            </Table>
                        )
                    }
                });
                console.log(ResultList2);
                programLists.push(
                    <div class="card px-3 col-12">
                        <div class="card-wrapper media-container-row media-container-row">
                            <div class="card-box">
                                <div class="top-line pb-3">
                                    <h4 class="card-title mbr-fonts-style display-5">
                                    {program.title}
                                    </h4>
                                    <div class="mbr-text align-left display-5" style={{width:'50%'}}>{program.goal}</div>
                                    <div class="mbr-text align-right display-5" style={{width:'50%'}}>
                                        {program.status}
                                        <br/>
                                        <Modal trigger={<Button primary size="medium">Show Results</Button>} style={{marginLeft:'300px'}} closeIcon>
                                                <ModalHeader style={{textAlign:'center'}}>Show Results of {program.title}</ModalHeader>
                                                <ModalContent>
                                                    {ResultList2}
                                                </ModalContent>
                                            </Modal>
                                    </div>
                                </div>
                                <div class="bottom-line">
                                    <p class="mbr-text mbr-fonts-style m-0 b-descr display-6">
                                    {program.description}
                                    </p>
                                </div>
                                <br/>
                                <details>
                                    <summary class="card-title mbr-fonts-style display-5">
                                        Show Sessions
                                    </summary>
                                    <Table structured celled>
                                        <TableHeader>
                                            <Table.Row>
                                                <TableHeaderCell>Session</TableHeaderCell>
                                                <TableHeaderCell>Status</TableHeaderCell>
                                            </Table.Row>
                                        </TableHeader>
                                        <TableBody>
                            {program.sessions.map(session=>{
                                SessionList2.push(
                                        <Table.Row>
                                            <Table.Cell>{session.name}</Table.Cell>
                                            <Table.Cell>{session.session_status}</Table.Cell>
                                        </Table.Row>
                                    )
                                }
                            )}
                            {SessionList2}
                            </TableBody>
                            </Table>
                                </details>
                                
                            </div>
                        </div>
                    </div>
                )})
            }
            {programLists}
            <Button secondary onClick = {this.handleClickBack} floated='right'>Back</Button>
                    </div>
                    </section>
                    <script src="assets/web/assets/jquery/jquery.min.js"></script>
                    <script src="assets/popper/popper.min.js"></script>
                    <script src="assets/bootstrap/js/bootstrap.min.js"></script>
                    <script src="assets/tether/tether.min.js"></script>
                    <script src="assets/smoothscroll/smooth-scroll.js"></script>
                    <script src="assets/theme/js/script.js"></script>
                </body>
            );
        }
        else{
            return null;
        }
    };
};

export default withStyles(styles,{withTheme: true})(CustomerModal);
