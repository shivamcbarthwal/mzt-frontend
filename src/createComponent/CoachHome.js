import React, { Component } from 'react';
import axios from 'axios';
import { withStyles, Snackbar, SnackbarContent, IconButton } from '@material-ui/core';
import clsx from 'clsx';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import PropTypes from 'prop-types';
// import Button from '@material-ui/core/Button';
import { SnackbarProvider, withSnackbar } from 'notistack';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import { amber, green } from '@material-ui/core/colors';
import WarningIcon from '@material-ui/icons/Warning';

import '../assets2/web/assets/mobirise-icons/mobirise-icons.css';
import '../assets2/bootstrap/css/bootstrap.min.css';
import '../assets2/bootstrap/css/bootstrap-grid.min.css';
import '../assets2/bootstrap/css/bootstrap-reboot.min.css';
import '../assets2/tether/tether.min.css';
import '../assets2/dropdown/css/style.css';
import '../assets2/theme/css/style.css';
import '../assets2/mobirise/css/mbr-additional.css';
import '../assets2/mobirise/css/mbr-additional.css';
var Logo = require('../assets2/images/logo-mzt.png');
const customer_Id = "5dc53fb7717676384459fe63";
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
    msg: {
      display: 'flex',
      alignItems: 'center',
    },
 
});

class CoachHome extends Component {
    state = {
        notifications: [
            // {
            //     customer_id: "5dc53fb7717676384459fe63",
            //     coach_id: "5dc2f70414b9e52a30d6620e",
            //     notify_for: "COACH",
            //     notify_type: "Program Assigned",
            //     message: `A new program (Muscle Gain) has been assigned to you`
            // },
            // {
            //     customer_id: "5dc53fb7717676384459fe63",
            //     coach_id: "5dc2f70414b9e52a30d6620e",
            //     notify_for: "COACH",
            //     notify_type: "Program Assigned",
            //     message: `A new focus session has been validated`
            // }
        ],
        open: false,
        vertical: 'top',
        horizontal: 'right'
    }

    componentDidMount() {
        axios.get(`http://localhost:8080/notification/checkAllNotification`,
        {
            params: {
                notify_for: "COACH",
                customer_id: customer_Id,
                coach_id: "5dc2f70414b9e52a30d6620e"
            }
        })
        .then(res => {
            const notifications = res.data;
            this.setState({notifications});
        });
    };

    
    handleClickNotif = () => {
        const { notifications, vertical, horizontal } = this.state;
        notifications.forEach(notification =>
            setTimeout(() => this.props.enqueueSnackbar(notification.msg, {variant: 'info'}), 200));
            
    };

    handleClose = () => {
        this.setState({ open: false});
    };
    render() {
        const { notifications } = this.state;
        const { classes, className } = this.props;
        const Icon = variantIcon["warning"];
        return (
            <SnackbarProvider>
                <div className="App">  
                <body>
                <section class="menu cid-rFxS6PmLUN" id="menu1-r">
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
                                    <a href="https://mobirise.com">
                                        <img src= {Logo}/>
                                    </a>
                                </span>
                                <span class="navbar-caption-wrap">
                                    <a class="navbar-caption text-white display-4" href="https://mobirise.com">
                                        MZT FITNESS
                                    </a>
                                </span>
                            </div>
                        </div>
                    </nav>
                </section>
                <section class="cid-rFCUpdpwBS mbr-fullscreen">
                    <div class="mbr-overlay" style={{opacity: 0.8, backgroundColor: "#232323"}}/>
                    <div class="container align-center">
                        <div class="mbr-white centerize">
                            <br/><br/><br/>
                            <a class="btn btn-white-outline" href="visualizeExercise">EXERCISES </a>
                            <a class="btn btn-white-outline" href="visualizeSession">SESSIONS </a>
                            <a class="btn btn-white-outline" href="visualizeProgram">PROGRAMS </a> 
                            <a class="btn btn-white-outline" href="customerList">CUSTOMERS</a>
                            <a class="btn btn-white-outline" onClick={this.handleClickNotif}>NOTIFICATIONS ({notifications.length})</a>
                        </div>
                    </div>    
                </section>
                <script src="assets2/web/assets/jquery/jquery.min.js"></script>
                <script src="assets2/popper/popper.min.js"></script>
                <script src="assets2/bootstrap/js/bootstrap.min.js"></script>
                <script src="assets2/tether/tether.min.js"></script>
                <script src="assets2/smoothscroll/smooth-scroll.js"></script>
                <script src="assets2/dropdown/js/nav-dropdown.js"></script>
                <script src="assets2/dropdown/js/navbar-dropdown.js"></script>
                <script src="assets2/touchswipe/jquery.touch-swipe.min.js"></script>
                <script src="assets2/theme/js/script.js"></script>
            </body>
            </div>
            </SnackbarProvider>           
        );
    };
};

export default withSnackbar(withStyles(styles,{withTheme: true})(CoachHome));
