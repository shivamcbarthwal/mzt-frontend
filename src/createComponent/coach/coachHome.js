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
import '../../assets/web/assets/mobirise-icons/mobirise-icons.css';
import '../../assets/bootstrap/css/bootstrap.min.css';
import '../../assets/bootstrap/css/bootstrap-grid.min.css';
import '../../assets/bootstrap/css/bootstrap-reboot.min.css';
import '../../assets/tether/tether.min.css';
import '../../assets/dropdown/css/style.css';
import '../../assets/theme/css/style.css';
import '../../assets/mobirise/css/mbr-additional.css';
var Logo = require('../../assets/images/logo-mzt.png');
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
        notifications.forEach(notification => {
            setTimeout(() => this.props.enqueueSnackbar(notification.msg, {variant: 'info'}), 200);
            axios.delete(`http://localhost:8080/notification/deactivate`,
            {
                params: {
                    notify_for: notification.notify_for,
                    customer_id: notification.customer_id,
                    coach_id: "5dc2f70414b9e52a30d6620e",
                    notify_type: notification.notify_type
                }
            });
        });
        this.setState({notifications: []});
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
                                        <a href="/">
                                            <img src= {Logo}/>
                                        </a>
                                    </span>
                                    <span class="navbar-caption-wrap">
                                        <a class="navbar-caption text-white display-4" href="/">
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
                                <button class="btn btn-white-outline" onClick={this.handleClickNotif}>NOTIFICATIONS ({notifications.length})</button>
                                <a class="btn btn-white-outline" href="customerList">CUSTOMERS</a>
                                <br/><br/>
                                <a class="btn btn-white-outline" href="visualizeExercise">EXERCISES </a>
                                <a class="btn btn-white-outline" href="visualizeSession">SESSIONS </a>
                                <a class="btn btn-white-outline" href="visualizeProgram">PROGRAMS </a> 

                            </div>
                        </div>    
                    </section>
                </body>
            </div>
            </SnackbarProvider>
        );
    };
};

export default withSnackbar(withStyles(styles,{withTheme: true})(CoachHome));