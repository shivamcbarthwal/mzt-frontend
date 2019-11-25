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
import 'semantic-ui-css/semantic.min.css';
import { Progress, Button, Table, Header, TableHeader, TableHeaderCell, TableBody, TableFooter, Modal, ModalHeader, ModalContent, Segment } from 'semantic-ui-react';
import moment from 'moment';
import { program } from '@babel/types';
import { textAlign } from '@material-ui/system';
import CanvasJSReact from '../../assets/canvas/canvasjs.react';
const coach_id = "5dc2f70414b9e52a30d6620e";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var Logo = require('../../assets/images/logo-mzt.png');

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
        const programAssigned = [];
        const programInprogress = [];
        const programDone = [];
        const programCanceled = [];
        const programLists = [];
        const progress = [];
        const progressDone = [];
        this.state.programs.map(Program =>{
            if(Program.status == "ASSIGNED"){
                programAssigned.push(Program);
            }
            if(Program.status == "IN_PROGRESS"){
                programInprogress.push(Program);
                Program.sessions.map((Session,index) =>{
                    if(Session.session_status == 'COMPLETED'){
                        console.log('index: '+index);
                        console.log('length: '+Program.sessions.length);
                        console.log('percent: '+ (index+1)/Program.sessions.length)
                        if(Program.sessions[index+1].session_status == 'OPENED'){
                            progress.push(
                                <Segment>
                                    <Progress color='olive' value={index+1} total={Program.sessions.length} active/>
                                    Finish the session {Session.name}. The next session is {Program.sessions[index+1].name}
                                </Segment>
                            )
                        }
                        if(Program.sessions[index+1].session_status == 'CLOSED'){
                            if(Program.sessions[index+1].session_type == 'focus'){
                                progress.push(
                                    <Segment>
                                        <Progress error value={index+1} total={Program.sessions.length} active/>
                                        There is an approaching focus session
                                    </Segment>
                                )
                            }
                        }
                    }
                });
            }
            if(Program.status == "COMPLETED"){
                programDone.push(Program);
                    progressDone.push(
                        <Progress percent={100} success>
                            The progress was successful
                        </Progress>
                    )
                
            }
            if(Program.status == "CANCELED"){
                programCanceled.push(Program);
            }
        });
        var SessionList1 = [];
        var SessionList2 = [];
        var SessionRes = [];
        if (customers){
            return (
                <body>
                <section class="menu cid-rFxS6PmLUN" once="menu" id="menu1-a">
                    <nav class="navbar navbar-expand beta-menu navbar-dropdown align-items-center navbar-fixed-top navbar-toggleable-sm bg-color transparent">
                        <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <div class="hamburger">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </button>
                        <div class="menu-logo">
                            <div class="navbar-brand">
                                <span class="navbar-logo">
                                    <a href="/">
                                        <img src={Logo} alt="MZT fitness" title="" />
                                    </a>
                                </span>
                                <span class="navbar-caption-wrap">
                                    <a class="navbar-caption text-black display-4" href="/">
                                        MZT FITNESS
                                    </a>
                                </span>
                            </div>
                        </div>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav nav-dropdown nav-right" data-app-modern-menu="true">
                                <li class="nav-item">
                                    <a class="nav-link link text-black display-4" href="/">
                                        <span class="mbri-home mbr-iconfont mbr-iconfont-btn"></span>
                                        Home page
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </section>
                <div>
                    <h1></h1>
                    <h1></h1>
                </div>
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
                {programAssigned.map((program) => {
                    ResultList1 = [];
                    SessionList1 = [];
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
                                    if(session.session_type=="focus"){
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
                                        if(session.session_status == "COMPLETED"){
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
                                            )
                                        }
                                    }
                                    else{
                                        SessionList1.push(
                                            <Table.Row>
                                                <Table.Cell>{session.name}</Table.Cell>
                                                <Table.Cell>{session.session_status}</Table.Cell>
                                                <Table.Cell>
                                                </Table.Cell>
                                            </Table.Row>
                                        )
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
                {programInprogress.map((program) => {
                    ResultList1 = [];
                    SessionList1 = [];
                    var measurementsData = [];
                this.state.optionResult.map((res,index)=>{
                    if(res.program_id === program._id){
                        measurementsData.push({ 'label': moment(res.measurement_date).format("YYYY-MM-DD"), 
                        y: res.dickson_metric, indexLabel: res.coach_feedback});
                    }
                });
                console.log("data ",measurementsData);
        var options = {
            animationEnabled: true,
            exportEnabled: true,
            theme: "light1", // "light1", "dark1", "dark2"
            title:{
                text: "Dickson Indicator of Focus Session"
            },
            axisY: {
                title: "Dickson Indicator",
                includeZero: false,
                interval: 0.25
            },
            axisX: {
                title: "Measurement Date of Focus Session",
                interval: 1
            },
            data: [{
                type: "line",
                dataPoints: measurementsData
            }]
        };
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
                                                    <CanvasJSChart options = {options} />
                                                </ModalContent>
                                            </Modal>
                                        </div>
                                </div>
                                <div class="bottom-line">
                                    <p class="mbr-text mbr-fonts-style m-0 b-descr display-6">
                                    {program.description}
                                    </p>
                                </div>
                                {progress}
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
                                    SessionRes=[];
                                    this.state.optionResult.map((res,index)=>{
                                        if(res.program_id === program._id){
                                            if(res.session_id === session._id){
                                                var options = [];
                                                console.log('res: '+res)
                                                if(program.type === 'Weight loss'){
                                                    options.push(
                                                        <Table.Row>
                                                            <Table.Cell><strong>Weight</strong></Table.Cell>
                                                            <Table.Cell>{res.weight}</Table.Cell>
                                                        </Table.Row>
                                                    );
                                                    options.push(
                                                        <Table.Row>
                                                            <Table.Cell><strong>Height</strong></Table.Cell>
                                                            <Table.Cell>{res.height}</Table.Cell>
                                                        </Table.Row>
                                                    );
                                                }
                                                if(res.coach_feedback != ''){
                                                    SessionRes.push(
                                                        <Table>
                                                            <TableHeader>
                                                                <Table.Row>
                                                                    <TableHeaderCell>Measurement Date</TableHeaderCell>
                                                                    <TableHeaderCell>{moment(res.measurement_date).format("YYYY-MM-DD")}</TableHeaderCell>
                                                                </Table.Row>
                                                                <Table.Row>
                                                                    <TableHeaderCell>Dickson Metric</TableHeaderCell>
                                                                    <TableHeaderCell>Coach Feedback</TableHeaderCell>
                                                                </Table.Row>
                                                            </TableHeader>
                                                            <TableBody>
                                                                <Table.Row>
                                                                    <Table.Cell>{res.dickson_metric}</Table.Cell>
                                                                    <Table.Cell>{res.coach_feedback}</Table.Cell>
                                                                </Table.Row>
                                                                {options}
                                                            </TableBody>
                                                        </Table>
                                                    )
                                                }
                                                else{
                                                    SessionRes.push(
                                                        <Table>
                                                            <TableHeader>
                                                                <Table.Row>
                                                                    <TableHeaderCell>Measurement Date</TableHeaderCell>
                                                                    <TableHeaderCell>{moment(res.measurement_date).format("YYYY-MM-DD")}</TableHeaderCell>
                                                                </Table.Row>
                                                                <Table.Row>
                                                                    <TableHeaderCell>Dickson Metric</TableHeaderCell>
                                                                    <TableHeaderCell>Coach Feedback</TableHeaderCell>
                                                                </Table.Row>
                                                            </TableHeader>
                                                            <TableBody>
                                                                <Table.Row>
                                                                    <Table.Cell>{res.dickson_metric}</Table.Cell>
                                                                    <Table.Cell>
                                                                        <Button primary size="medium" onClick={()=>this.props.history.push('/Feedback/'+coach_id+'/'+res.customer_id+'/'+program._id+'/'+session._id)}>Give Feedback</Button>
                                                                    </Table.Cell>
                                                                </Table.Row>
                                                                {options}
                                                            </TableBody>
                                                        </Table>
                                                    )
                                                }
                                            }
                                        }
                                    });
                                    if(session.session_type=="focus"){
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
                                        if(session.session_status == "COMPLETED"){
                                            var exercisesRow1 = [];
                                            var exercisesRow2 = [];
                                            session.exercises.map(exer=>{
                                                exercisesRow1.push(
                                                    <Table.Cell><strong>{exer.name}</strong></Table.Cell>
                                                )
                                                exercisesRow2.push(
                                                    <Table.Cell>{exer.result}</Table.Cell>
                                                )
                                            })
                                            SessionRes.push(
                                                <Table>
                                                    <TableBody>
                                                        <Table.Row>
                                                            <Table.Cell><strong>Exercise</strong></Table.Cell>
                                                            {exercisesRow1}
                                                        </Table.Row>
                                                        <Table.Row>
                                                            <Table.Cell><strong>Number</strong></Table.Cell>
                                                            {exercisesRow2}
                                                        </Table.Row>
                                                    </TableBody>
                                                </Table>
                                            )
                                            SessionList1.push(
                                                <Table.Row>
                                                    <Table.Cell>{session.name}</Table.Cell>
                                                    <Table.Cell>{session.session_status}</Table.Cell>
                                                    <Table.Cell>
                                                        <Modal trigger={<Button primary size="medium">Show Result of Session</Button>} style={{marginLeft:'300px'}} closeIcon>
                                                            <ModalHeader style={{textAlign:'center'}}>Show Result of {session.name}</ModalHeader>
                                                            <ModalContent>
                                                                {SessionRes}
                                                            </ModalContent>
                                                        </Modal>
                                                    </Table.Cell>
                                                </Table.Row>
                                            )
                                        }
                                    }
                                    else{
                                        if(session.session_status == "COMPLETED"){
                                            var exercisesRow1 = [];
                                            var exercisesRow2 = [];
                                            session.exercises.map(exer=>{
                                                exercisesRow1.push(
                                                    <Table.Cell><strong>{exer.name}</strong></Table.Cell>
                                                )
                                                exercisesRow2.push(
                                                    <Table.Cell>{exer.result}</Table.Cell>
                                                )
                                            });
                                            SessionRes.push(
                                                <Table>
                                                    <TableBody>
                                                        <Table.Row>
                                                            <Table.Cell><strong>Exercise</strong></Table.Cell>
                                                            {exercisesRow1}
                                                        </Table.Row>
                                                        <Table.Row>
                                                            <Table.Cell><strong>Result</strong></Table.Cell>
                                                            {exercisesRow2}
                                                        </Table.Row>
                                                    </TableBody>
                                                </Table>
                                            )
                                            SessionList1.push(
                                                <Table.Row>
                                                    <Table.Cell>{session.name}</Table.Cell>
                                                    <Table.Cell>{session.session_status}</Table.Cell>
                                                    <Table.Cell>
                                                        <Modal trigger={<Button primary size="medium">Show Result of Session</Button>} style={{marginLeft:'300px'}} closeIcon>
                                                            <ModalHeader style={{textAlign:'center'}}>Show Result of {session.name}</ModalHeader>
                                                            <ModalContent>
                                                                {SessionRes}
                                                            </ModalContent>
                                                        </Modal>
                                                    </Table.Cell>
                                                </Table.Row>
                                            );  
                                        }
                                        else{
                                            SessionList1.push(
                                                <Table.Row>
                                                    <Table.Cell>{session.name}</Table.Cell>
                                                    <Table.Cell>{session.session_status}</Table.Cell>
                                                    <Table.Cell>
                                                    </Table.Cell>
                                                </Table.Row>
                                            )
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
            {programDone.map((program) => {
                ResultList2 = [];
                SessionList2 = [];
                var measurementsData = [];
                this.state.optionResult.map((res,index)=>{
                    if(res.program_id === program._id){
                        measurementsData.push({ 'label': moment(res.measurement_date).format("YYYY-MM-DD"), 
                        y: res.dickson_metric, indexLabel: res.coach_feedback});
                    }
                });
                console.log("data ",measurementsData);
        var options = {
            animationEnabled: true,
            exportEnabled: true,
            theme: "light1", // "light1", "dark1", "dark2"
            title:{
                text: "Dickson Indicator of Focus Session"
            },
            axisY: {
                title: "Dickson Indicator",
                includeZero: false,
                interval: 0.25
            },
            axisX: {
                title: "Measurement Date of Focus Session",
                interval: 1
            },
            data: [{
                type: "line",
                dataPoints: measurementsData
            }]
        };
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
                                                <CanvasJSChart options = {options} />
                                            </ModalContent>
                                        </Modal>
                                    </div>
                                </div>
                                <div class="bottom-line">
                                    <p class="mbr-text mbr-fonts-style m-0 b-descr display-6">
                                    {program.description}
                                    </p>
                                </div>
                                {progressDone}
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
                            {program.sessions.map(session=>{
                                SessionRes=[];
                                this.state.optionResult.map((res,index)=>{
                                    if(res.program_id === program._id){
                                        if(res.session_id === session._id){
                                            var options = [];
                                            console.log('res: '+res)
                                            if(program.type === 'Weight loss'){
                                                options.push(
                                                    <Table.Row>
                                                        <Table.Cell><strong>Weight</strong></Table.Cell>
                                                        <Table.Cell>{res.weight}</Table.Cell>
                                                    </Table.Row>
                                                );
                                                options.push(
                                                    <Table.Row>
                                                        <Table.Cell><strong>Height</strong></Table.Cell>
                                                        <Table.Cell>{res.height}</Table.Cell>
                                                    </Table.Row>
                                                );
                                            }
                                            if(res.coach_feedback != ''){
                                                SessionRes.push(
                                                    <Table>
                                                        <TableHeader>
                                                            <Table.Row>
                                                                <TableHeaderCell>Measurement Date</TableHeaderCell>
                                                                <TableHeaderCell>{moment(res.measurement_date).format("YYYY-MM-DD")}</TableHeaderCell>
                                                            </Table.Row>
                                                            <Table.Row>
                                                                <TableHeaderCell>Dickson Metric</TableHeaderCell>
                                                                <TableHeaderCell>Coach Feedback</TableHeaderCell>
                                                            </Table.Row>
                                                        </TableHeader>
                                                        <TableBody>
                                                            <Table.Row>
                                                                <Table.Cell>{res.dickson_metric}</Table.Cell>
                                                                <Table.Cell>{res.coach_feedback}</Table.Cell>
                                                            </Table.Row>
                                                            {options}
                                                        </TableBody>
                                                    </Table>
                                                )
                                            }
                                            else{
                                                SessionRes.push(
                                                    <Table>
                                                        <TableHeader>
                                                            <Table.Row>
                                                                <TableHeaderCell>Measurement Date</TableHeaderCell>
                                                                <TableHeaderCell>{moment(res.measurement_date).format("YYYY-MM-DD")}</TableHeaderCell>
                                                            </Table.Row>
                                                            <Table.Row>
                                                                <TableHeaderCell>Dickson Metric</TableHeaderCell>
                                                                <TableHeaderCell>Coach Feedback</TableHeaderCell>
                                                            </Table.Row>
                                                        </TableHeader>
                                                        <TableBody>
                                                            <Table.Row>
                                                                <Table.Cell>{res.dickson_metric}</Table.Cell>
                                                                <Table.Cell>
                                                                    <Button primary size="medium" onClick={()=>this.props.history.push('/Feedback/'+coach_id+'/'+res.customer_id+'/'+program._id+'/'+session._id)}>Give Feedback</Button>
                                                                </Table.Cell>
                                                            </Table.Row>
                                                            {options}
                                                        </TableBody>
                                                    </Table>
                                                )
                                            }
                                        }
                                    }
                                });
                                if(session.session_type=="focus"){
                                    if(session.session_status == "COMPLETED"){
                                        var exercisesRow1 = [];
                                        var exercisesRow2 = [];
                                        session.exercises.map(exer=>{
                                            exercisesRow1.push(
                                                <Table.Cell><strong>{exer.name}</strong></Table.Cell>
                                            )
                                            exercisesRow2.push(
                                                <Table.Cell>{exer.result}</Table.Cell>
                                            )
                                        })
                                        SessionRes.push(
                                            <Table>
                                                <TableBody>
                                                    <Table.Row>
                                                        <Table.Cell><strong>Exercise</strong></Table.Cell>
                                                        {exercisesRow1}
                                                    </Table.Row>
                                                    <Table.Row>
                                                        <Table.Cell><strong>Number</strong></Table.Cell>
                                                        {exercisesRow2}
                                                    </Table.Row>
                                                </TableBody>
                                            </Table>
                                        )
                                        SessionList2.push(
                                            <Table.Row>
                                                <Table.Cell>{session.name}</Table.Cell>
                                                <Table.Cell>{session.session_status}</Table.Cell>
                                                <Table.Cell>
                                                    <Modal trigger={<Button primary size="medium">Show Result of Session</Button>} style={{marginLeft:'300px'}} closeIcon>
                                                        <ModalHeader style={{textAlign:'center'}}>Show Result of {session.name}</ModalHeader>
                                                        <ModalContent>
                                                            {SessionRes}
                                                        </ModalContent>
                                                    </Modal>
                                                </Table.Cell>
                                            </Table.Row>
                                        )
                                    }
                                }
                                else{
                                    if(session.session_status == "COMPLETED"){
                                        var exercisesRow1 = [];
                                        var exercisesRow2 = [];
                                        session.exercises.map(exer=>{
                                            exercisesRow1.push(
                                                <Table.Cell><strong>{exer.name}</strong></Table.Cell>
                                            )
                                            exercisesRow2.push(
                                                <Table.Cell>{exer.result}</Table.Cell>
                                            )
                                        });
                                        SessionRes.push(
                                            <Table>
                                                <TableBody>
                                                    <Table.Row>
                                                        <Table.Cell><strong>Exercise</strong></Table.Cell>
                                                        {exercisesRow1}
                                                    </Table.Row>
                                                    <Table.Row>
                                                        <Table.Cell><strong>Result</strong></Table.Cell>
                                                        {exercisesRow2}
                                                    </Table.Row>
                                                </TableBody>
                                            </Table>
                                        )
                                        SessionList2.push(
                                            <Table.Row>
                                                <Table.Cell>{session.name}</Table.Cell>
                                                <Table.Cell>{session.session_status}</Table.Cell>
                                                <Table.Cell>
                                                    <Modal trigger={<Button primary size="medium">Show Result of Session</Button>} style={{marginLeft:'300px'}} closeIcon>
                                                        <ModalHeader style={{textAlign:'center'}}>Show Result of {session.name}</ModalHeader>
                                                        <ModalContent>
                                                            {SessionRes}
                                                        </ModalContent>
                                                    </Modal>
                                                </Table.Cell>
                                            </Table.Row>
                                        );  
                                    }
                                    else{
                                        SessionList2.push(
                                            <Table.Row>
                                                <Table.Cell>{session.name}</Table.Cell>
                                                <Table.Cell>{session.session_status}</Table.Cell>
                                                <Table.Cell>
                                                </Table.Cell>
                                            </Table.Row>
                                        )
                                    }         
                                }
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
            {programCanceled.map((program) => {
                SessionList2 = [];
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
                </body>
            );
        }
        else{
            return null;
        }
    };
};

export default withStyles(styles,{withTheme: true})(CustomerModal);
