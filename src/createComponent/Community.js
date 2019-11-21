import React from 'react';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';
import { Table, Button } from 'semantic-ui-react';
import _ from 'lodash';
import { withStyles, Snackbar, SnackbarContent, IconButton } from '@material-ui/core';
import clsx from 'clsx';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import PropTypes from 'prop-types';
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
var Logo = require('../assets2/images/logo-mzt.png');

class Community extends React.Component {
    state = {
        column: null,
        challenges: [],
        direction: null
    };
    // Sort the table according to header
    handleSort = (clickedColumn) => () => {
        const { column, challenges, direction } = this.state;
        if (column !== clickedColumn) {
            this.setState({
              column: clickedColumn,
              challenges: _.sortBy(challenges, [clickedColumn]),
              direction: 'ascending',
            });
            return;
        }
        this.setState({
            challenges: challenges.reverse(),
            direction: direction === 'ascending' ? 'descending' : 'ascending',
        });
    }
    handleClickBack = () => {
        this.props.history.push('/');
    };
    componentDidMount() {
        axios.get('http://localhost:8080/challenge/getAllChallenges')
        .then(res => {
            const challenges = res.data;
            this.setState({challenges});
        });
    };
    render() {
        this.handleSort('status');
        var optionsChallenge = [];
        const { column, direction } = this.state;
        this.state.challenges.map((Challenge) => {   
            optionsChallenge.push(
                <Table.Row>
                    <Table.Cell><strong>{Challenge.description}</strong></Table.Cell>
                    <Table.Cell>{Challenge.type}</Table.Cell>
                </Table.Row>
            );        
        });
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
                              <a href="/Homepage">
                                  <img src={Logo} alt="Mobirise" title="" />
                              </a>
                          </span>
                          <span class="navbar-caption-wrap">
                              <a class="navbar-caption text-white display-4" href="/Homepage">
                                  MZT FITNESS
                              </a>
                          </span>
                      </div>
                  </div>
                  <div class="collapse navbar-collapse" id="navbarSupportedContent">
                      <ul class="navbar-nav nav-dropdown nav-right" data-app-modern-menu="true">
                          <li class="nav-item">
                              <a class="nav-link link text-white display-4" href="/Homepage">
                                  <span class="mbri-home mbr-iconfont mbr-iconfont-btn"></span>
                                  Home page
                              </a>
                          </li>
                          <li class="nav-item">
                              <a class="nav-link link text-white display-4" href="/Community">
                                  <span class="mbri-chat mbr-iconfont mbr-iconfont-btn"></span>
                                  Community
                              </a>
                          </li>
                      </ul>
                  </div>
              </nav>
            </section>

            <section class="header10 cid-rFCyM8AuwD mbr-fullscreen mbr-parallax-background" id="header10-o">
                <div class="mbr-overlay"> 
                </div>

                <div class="container">
                    <h2 class="mbr-white mbr-fonts-style m-0 display-1 align-center">
                        Challenge<br/>each other and earn points
                    </h2>  
                    <br/>
                    <div class="media-container-column align-center" style={{backgroundColor:"#232323"}}>
                        <h2 class="mbr-section-title mbr-fonts-style display-10">
                            New challenge from Shivam!
                        </h2>
                            <p class="mbr-text-challenge mbr-fonts-style display-5">
                                Take the stairs instead of the lifts all week.
                                Rewards: 
                            </p>
                        <div class="mbr-section-btn">
                            <a class="btn btn-primary display-4" href="">Accept</a>
                            <a class="btn btn-secondary display-4" href="">Reject</a>
                        </div>
                    </div>             
                    <div class=" media-container-column align-center"> 
                        <h2 class="mbr-section-title mbr-fonts-style display-2">
                            CHALLENGE LOG
                        </h2>                           
                        <Table sortable celled structured>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell
                                      sorted={column === 'description' ? direction : null}
                                      onClick={this.handleSort('description')}
                                    >
                                        CHALLENGE
                                    </Table.HeaderCell>
                                    <Table.HeaderCell
                                      sorted={column == 'type' ? direction : null}
                                      onClick={this.handleSort('type')}
                                    >
                                        STATUS
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body textAlign='center'>
                                {optionsChallenge}
                            </Table.Body>
                        </Table>  
                    </div>
                </div>  
            </section>

            <section class="pricing-table3 cid-rFCyJlKcUP" id="pricing-tables3-n"> 
                <div class="container">
                    <div class="row justify-content-md-center">
                        <div class="col-md-10 align-center">
                            <h1 class="mbr-section-title mbr-bold mbr-fonts-style display-1">
                                <img src="assets/images/certificate.png" alt="Certificate"/>
                                15 points
                            </h1>	
                            <p class="mbr-text pb-3 mbr-fonts-style display-5"></p>
                            <div class="mbr-section-btn"><a class="btn btn-md btn-primary display-4" href="discount_page.html">Convert to vouchers</a></div>
                        </div>
                    </div>
                </div>
            </section>
                
            <script src="assets/web/assets/jquery/jquery.min.js"></script>
            <script src="assets/popper/popper.min.js"></script>
            <script src="assets/bootstrap/js/bootstrap.min.js"></script>
            <script src="assets/smoothscroll/smooth-scroll.js"></script>
            <script src="assets/tether/tether.min.js"></script>
            <script src="assets/dropdown/js/nav-dropdown.js"></script>
            <script src="assets/dropdown/js/navbar-dropdown.js"></script>
            <script src="assets/touchswipe/jquery.touch-swipe.min.js"></script>
            <script src="assets/parallax/jarallax.min.js"></script>
            <script src="assets/theme/js/script.js"></script>
            <script src="assets/formoid/formoid.min.js"></script> 
        </body>
    )
  }
}

export default Community;
