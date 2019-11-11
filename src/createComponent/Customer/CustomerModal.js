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
        this.props.history.push('/assignPtoC');
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
        if (customers)
            return (

<body>
  <section class="services5 cid-rHakXOOQSN" id="services5-c" style={{padding: "25px"}}>  
    <div class="container">
        <div class="row">
            
            <div class="title pb-5 col-12">
                <h2 class="align-left mbr-fonts-style m-0 display-1">
                {customers.first_name} {customers.last_name}
                </h2>
                
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
                            <details>
                            <summary>Sessions and Exercises</summary>
                            <div class="card px-3 col-12">
                                <p class="mbr-text mbr-fonts-style m-0 b-descr display-7">
                                {program.sessions.map(session=>
                                    <div> <br />
                                       <h4 class="card-title mbr-fonts-style display-5"> {session.name}</h4>
                                       <br />
                                        {session.exercises.map(exercise=>
                                            <div>
                                                {exercise.name}
                                            </div>)}
                                    </div>)}
                                </p>
                            </div>
                            </details>
                        </div>
                    </div>
                </div>
                : null}
       
        </div>
        
        <div>
            
             
            <Snackbar
              anchorOrigin={{
                vertical: 'center',
                horizontal: 'center',
              }}
              open={this.state.open}
              autoHideDuration={6000}
              onClose={this.handleClose}
            >
            {/* <MySnackbarContentWrapper
              variant="info"
              className={classes.margin}
              message="The customer does not have an active Program!"
            /> */}

            <SnackbarContent
              className={clsx(classes["warning"], className)}
              aria-describedby="client-snackbar"
              variant="warning" 
              message={
              <span id="client-snackbar" className={classes.message}>
                  <Icon className={clsx(classes.icon, classes.iconVariant)} />
                  Customer doesn't have an active program
              </span>
              }
              action={[
              <IconButton key="close" aria-label="close" color="inherit" onClick={this.handleClose}>
                  <CloseIcon className={classes.icon} />
              </IconButton>,
              ]}
          />
                        
          </Snackbar>
          { !program ? 
          <button type="button" class="btn btn-primary btn-lg active" role="button" aria-pressed="true" onClick = {this.handleClickAssignProgram}> Assign Program</button>  
          : null}  
          </div>
    </div>
</section>

  <section class="engine"><a href="https://mobirise.info/y">html site templates</a></section><script src="assets/web/assets/jquery/jquery.min.js"></script>
  <script src="assets/popper/popper.min.js"></script>
  <script src="assets/bootstrap/js/bootstrap.min.js"></script>
  <script src="assets/tether/tether.min.js"></script>
  <script src="assets/smoothscroll/smooth-scroll.js"></script>
  <script src="assets/theme/js/script.js"></script>
  
  
</body>
        )
        else
            return null;
    }
}

export default withStyles(styles,{withTheme: true})(CustomerModal);
