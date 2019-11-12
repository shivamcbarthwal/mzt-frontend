import React, { Component } from 'react'
import axios from 'axios';
import clsx from 'clsx';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import PropTypes from 'prop-types';
// import Button from '@material-ui/core/Button';
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
// import './assets/bootstrap/css/bootstrap.min.css';
// import '../assets/web/assets/mobirise-icons/mobirise-icons.css';
// import '../assets/bootstrap/css/bootstrap.min.css';
// import './assets/bootstrap/css/bootstrap-grid.min.css';
// import './assets/bootstrap/css/bootstrap-reboot.min.css';
// import './assets/tether/tether.min.css';
// import './assets/theme/css/style.css';
// import './assets/mobirise/css/mbr-additional.css';
// import './assets/mobirise/css/mbr-additional.css';

import '../assets/web/assets/mobirise-icons/mobirise-icons.css';
import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/bootstrap/css/bootstrap-grid.min.css';
import '../assets/bootstrap/css/bootstrap-reboot.min.css';
import '../assets/tether/tether.min.css'
import '../assets/dropdown/css/style.css'
import '../assets/theme/css/style.css'
import '../assets/mobirise/css/mbr-additional.css'
import '../assets/mobirise/css/mbr-additional.css';

import './Customer.css';

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
  };

  const styles = theme => ({
    success: {
      backgroundColor: green[600],
    },
    error: {
      backgroundColor: theme.palette.error.dark,
    },
    info: {
      backgroundColor: theme.palette.primary.main,
    },
    warning: {
      backgroundColor: amber[700],
    },
    icon: {
      fontSize: 20,
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: theme.spacing(1),
    },
    message: {
      display: 'flex',
      alignItems: 'center',
    },
 
  });

  

//   MySnackbarContentWrapper.propTypes = {
//     className: PropTypes.string,
//     message: PropTypes.string,
//     onClose: PropTypes.func,
//     variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
//   };
  
class CustomerModal extends Component {

    state = {
        customers: null,
        program: null,
        open: false,
        setOpen: false
    }

    handleClose = () => {
        this.setState({ open: false});
      };

    showSpinner = () => {
        this.setState({ open: true});
    }

    handleClickAssignProgram = () => {
        this.props.history.push('/AssignPtoC');
    }

    handleClickBack = () => {
      this.props.history.push('/customerList');
    }

    componentDidMount(){
        axios.get(`http://localhost:8080/customer/getCustomerById/${this.props.match.params.customerID}`)
        .then(res => {
            const customers = res.data;
            console.log(res.data);
            this.setState({ customers });
          }
        )

        axios.get(`http://localhost:8080/program/getProgramByCustomerId/${this.props.match.params.customerID}`)
        .then(res => {
            const program = res.data[0];
            console.log(program);
            if (!program) {
                console.log("HERE");
                this.setState({ open: true });
            } else
                this.setState({ program });
          }
        )

        .catch(e => {
            console.log(e)

        })
    }
    render() {
        const {customers, program, open} = this.state;
        const { classes, className } = this.props;
        const Icon = variantIcon["warning"];

       

    // const { className, message, onClose, variant, ...other } = this.props;
    //    const Icon = variantIcon[variant];
        console.log(open);
        if (customers){
          
            return (
              

<body onload="">
  <section class="services5 cid-rHakXOOQSN" id="services5-c" style={{padding: "25px"}}>  
    <div class="container">
        <div class="media-container-row">
            <div class="title" style={{width: "50%"}}>
                <h2 class="mbr-fonts-style m-0 display-1 text-center">
                {customers.first_name} {customers.last_name}
                </h2>
            </div>
            <div class="table-wrapper" style={{width: "50%"}}>
            <div class="container scroll">
                                    <table class="table">
                                        <tr class="body-item mbr-fonts-style display-7">
                                            <td>Age</td>
                                            <td>{((new Date()).getFullYear()-(new Date(customers.dob)).getFullYear())}</td>
                                        </tr>
                                        <tr class="body-item mbr-fonts-style display-7">
                                            <td>Gender</td>
                                            <td>{customers.gender}</td>
                                        </tr>
                                        <tr class="body-item mbr-fonts-style display-7">
                                            <td>Goal</td>
                                            <td>{customers.goal}</td>
                                        </tr>
                                        <tr class="body-item mbr-fonts-style display-7">
                                            <td>Availability</td>
                                            <td>{customers.availability}</td>
                                        </tr>
                                    </table>
                                    </div>
                                </div>
                                </div>
            
            {program ?
                <div class="card px-3 col-12">
                    <div class="card-wrapper media-container-row media-container-row">
                        <div class="card-box">
                            <div class="top-line pb-3">
                                <h4 class="card-title mbr-fonts-style display-5">
                                {program.title}
                                </h4>
                                <p class="mbr-text cost mbr-fonts-style m-0 display-5">
                                {program.status}
                                </p>
                            </div>
                            <div class="bottom-line">
                                <p title="Description" class="mbr-text mbr-fonts-style m-0 b-descr display-7">
                                {program.description}
                                </p>
                            </div>
                            <br />
                            {program.sessions.map(session=>
                            <details>
    <summary>{session.name+ "   "+session.session_status}</summary>
                            <div class="card px-3 col-12">
                                <p class="mbr-text mbr-fonts-style m-0 b-descr display-7">
                                    <div>
                                        {session.exercises.map(exercise=>
                                            <div>
                                                {exercise.name}
                                        </div>)}
                                    </div>
                                </p>
                            </div>
                            </details>)}
                        </div>
                    </div>
                </div>
                : null}
          <div class="align-right">
          <button type="button" class="btn btn-primary btn-lg active" role="button" aria-pressed="true" onClick = {this.handleClickBack}><span class="mbrib-arrow-prev mbr-iconfont mbr-iconfont-btn"></span> Back</button>
          </div>
    </div>
</section>
    
  <section class="engine"><a href="https://mobirise.info/y">html site templates</a></section><script src="assets/web/assets/jquery/jquery.min.js"></script>
  <script src="sort.js"></script>
  <script src="assets/popper/popper.min.js"></script>
  <script src="assets/bootstrap/js/bootstrap.min.js"></script>
  <script src="assets/tether/tether.min.js"></script>
  <script src="assets/smoothscroll/smooth-scroll.js"></script>
  <script src="assets/theme/js/script.js"></script>
  
  
</body>
        )}
        else
            return null;
    }
}

export default withStyles(styles,{withTheme: true})(CustomerModal);
