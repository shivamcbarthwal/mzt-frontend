import React from 'react';
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
import Background from '../../assets/images/bk_hp.jpg';
var Logo = require('../../assets/images/logo-mzt.png');

// const customer_Id = "5dc541fb717676384459fe66";
const customer_Id = "5dc53fb7717676384459fe63";
// const customer_Id = "5dcc1f93ee7a552b6c458a79";
// const customer_Id = "5dc5413a717676384459fe64";

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
class Homepage extends React.Component {
    state = {
        notifications: [
            // {
            //     customer_id: "5dc53fb7717676384459fe63",
            //     coach_id: "5dc2f70414b9e52a30d6620e",
            //     notify_for: "Customer",
            //     notify_type: "Program Assigned",
            //     message: `A new program (Muscle Gain) has been assigned to you`
            // },
            // {
            //     customer_id: "5dc53fb7717676384459fe63",
            //     coach_id: "5dc2f70414b9e52a30d6620e",
            //     notify_for: "Customer",
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
                notify_for: "CUSTOMER",
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
        Object.keys(notifications).map(notif => {
            var msg =  String(notifications[notif].msg);
            setTimeout(() => this.props.enqueueSnackbar(msg, {variant: 'info'}), 200);
            axios.delete(`http://localhost:8080/notification/deactivate`,
            {
                params: {
                    notify_for: String(notifications[notif].notify_for),
                    customer_id: String(notifications[notif].customer_id._id),
                    coach_id: "5dc2f70414b9e52a30d6620e",
                    notify_type: String(notifications[notif].notify_type)
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
        const icon = variantIcon["warning"];
        return (
            <SnackbarProvider>
                <div className="App">
                    <body>
                        <section class="menu cid-rFxS6PmLUN" once="menu" id="menu1-a"> 
                            <nav class="navbar navbar-expand beta-menu navbar-dropdown align-items-center navbar-fixed-top navbar-toggleable-sm bg-color transparent">
                            <div class="menu-logo">
                                <div class="navbar-brand">
                                    <span class="navbar-logo">
                                        <a href="/homepage">
                                            <img src={Logo} alt="MZT fitness" title="" />
                                        </a>
                                    </span>
                                    <span class="navbar-caption-wrap">
                                        <a class="navbar-caption text-white display-4" href="/homepage">
                                            MZT FITNESS
                                        </a>
                                    </span>
                                </div>
                            </div>
                            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul class="navbar-nav nav-dropdown nav-right" data-app-modern-menu="true">
                                    <li class="nav-item">
                                        <a class="nav-link link text-white display-4" onClick={()=>this.props.history.push('/challenge/'+customer_Id)}>
                                            <span class="mbri-chat mbr-iconfont mbr-iconfont-btn"></span>
                                                Challenge
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            </nav>
                        </section>
                        <section class=" mbr-fullscreen" style={{backgroundImage: `url(${Background})`}}>
                            <div class="mbr-overlay" style={{opacity: 0.8, backgroundColor: "#232323"}}/>
                                <div class="container align-center">
                                    <button class="btn btn-white-outline pull-right" onClick={this.handleClickNotif}>NOTIFICATIONS ({notifications.length})</button>
                                    <div class="mbr-white centerize">
                                        <a class="btn btn-white-outline" href="listOfPrograms">WORKOUT</a> 
                                        <p class="">LET'S START NOW !&nbsp;<br/>REACH YOUR GOALS</p>  
                                        <a class="btn btn-white-outline" href="dashboard">DASHBOARD</a>
                                    </div>
                                </div> 
                        </section>
                    </body>
                </div>
            </SnackbarProvider>
        );
    };
};

export default withSnackbar(withStyles(styles,{withTheme: true})(Homepage));
