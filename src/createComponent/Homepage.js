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
import '../assets/web/assets/mobirise-icons/mobirise-icons.css';
import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/bootstrap/css/bootstrap-grid.min.css';
import '../assets/bootstrap/css/bootstrap-reboot.min.css';
import '../assets/tether/tether.min.css';
import '../assets/dropdown/css/style.css';
import '../assets/theme/css/style.css';
import '../assets/mobirise/css/mbr-additional.css';
import Background from '../assets/images/bk_hp.jpg';

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
    message: {
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
        open: false
    }

    componentDidMount() {
        axios.get(`http://localhost:8080/notification/checkNotification`,
        {
            params: {
                notify_for: "CUSTOMER",
                customer_id: customer_Id,
                coach_id: "5dc2f70414b9e52a30d6620e",
                notify_type: "PROGRAM_ASSIGNED"
            }
        })
        .then(res => {
            const notifications = res.data;
            this.setState({notifications});
        });
    };

    
    handleClickNotif = () => {
        const { notifications } = this.state;
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
                        {/*notifications.map((notification) => 
                            <Snackbar
                                anchorOrigin={{
                                    vertical: 'center',
                                    horizontal: 'center',
                                }}
                                open={this.state.open}
                                autoHideDuration={6000}
                                onClose={this.handleClose}
                            >
                            {<MySnackbarContentWrapper
                            variant="info"
                            className={classes.margin}
                            message="The customer does not have an active Program!"
                            />}

                                <SnackbarContent
                                    className={clsx(classes["warning"], className)}
                                    aria-describedby="client-snackbar"
                                    variant="warning" 
                                    message={
                                    <span id="client-snackbar" className={classes.message}>
                                        <Icon className={clsx(classes.icon, classes.iconVariant)} />
                                        {notification.message}
                                    </span>
                                    }
                                    action={[
                                    <IconButton key="close" aria-label="close" color="inherit" onClick={this.handleClose}>
                                        <CloseIcon className={classes.icon} />
                                    </IconButton>,
                                    ]}
                                />

                            </Snackbar>  
                                )*/} 
                    </section>
                    <script src="assets/web/assets/jquery/jquery.min.js"></script>
                    <script src="assets/popper/popper.min.js"></script>
                    <script src="assets/bootstrap/js/bootstrap.min.js"></script>
                    <script src="assets/tether/tether.min.js"></script>
                    <script src="assets/smoothscroll/smooth-scroll.js"></script>
                    <script src="assets/dropdown/js/nav-dropdown.js"></script>
                    <script src="assets/dropdown/js/navbar-dropdown.js"></script>
                    <script src="assets/touchswipe/jquery.touch-swipe.min.js"></script>
                    <script src="assets/theme/js/script.js"></script>
                </body>
            </div>
            </SnackbarProvider>
        );
    };
};

export default withSnackbar(withStyles(styles,{withTheme: true})(Homepage));
