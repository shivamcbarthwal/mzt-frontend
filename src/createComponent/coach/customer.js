import React, { Component } from 'react'
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';
import { Table, Button } from 'semantic-ui-react';
import _ from 'lodash';
import '../assets/web/assets/mobirise-icons/mobirise-icons.css';
import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/bootstrap/css/bootstrap-grid.min.css';
import '../assets/bootstrap/css/bootstrap-reboot.min.css';
import '../assets/tether/tether.min.css';
import '../assets/dropdown/css/style.css';
import '../assets/theme/css/style.css';
import '../assets/mobirise/css/mbr-additional.css';
import './customer.css';
var Logo = require('../../assets/images/logo-mzt.png');

export default class Customer extends Component {
    state = {
        column: null,
        customers: [],
        direction: null
    }
    // Sort the table according to header
    handleSort = (clickedColumn) => () => {
        const { column, customers, direction } = this.state;
        if (column !== clickedColumn) {
            this.setState({
              column: clickedColumn,
              customers: _.sortBy(customers, [clickedColumn]),
              direction: 'ascending',
            });
            return;
        }
        this.setState({
            customers: customers.reverse(),
            direction: direction === 'ascending' ? 'descending' : 'ascending',
        });
    }
    handleClickBack = () => {
        this.props.history.push('/');
    }
    componentDidMount(){
        axios.get('http://localhost:8080/customer/getAllCustomers')
        .then(res => {
            const customers = res.data;
            this.setState({customers: customers});
        });
    }
    render() {
        this.handleSort('status');
        var optionsCustomer = [];
        const { column, direction } = this.state;
        this.state.customers.map((Customer) => {
            if(Customer.status === "NONE"){
                optionsCustomer.push(
                    <Table.Row>
                        <Table.Cell onClick={()=>this.props.history.push(`/CustomersDetail/${Customer._id}`)}><strong>{Customer.first_name} {Customer.last_name}</strong></Table.Cell>
                        <Table.Cell>{Customer.goal}</Table.Cell>
                        <Table.Cell>{Customer.activity_level}</Table.Cell>
                        <Table.Cell><Button primary onClick = {()=>this.props.history.push('/AssignPtoC/'+Customer._id)}> Assign Program</Button></Table.Cell>
                    </Table.Row>
                )
            }
            else{
                optionsCustomer.push(
                    <Table.Row onClick={()=>this.props.history.push(`/CustomersDetail/${Customer._id}`)}>
                        <Table.Cell><strong>{Customer.first_name} {Customer.last_name}</strong></Table.Cell>
                        <Table.Cell>{Customer.goal}</Table.Cell>
                        <Table.Cell>{Customer.activity_level}</Table.Cell>
                        <Table.Cell>{Customer.status}</Table.Cell>
                    </Table.Row>
                );
            }
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
                                    <a href="/">
                                        <img src={Logo} alt="MZT fitness" title="" />
                                    </a>
                                </span>
                                <span class="navbar-caption-wrap">
                                    <a class="navbar-caption text-white display-4" href="/">
                                        MZT FITNESS
                                    </a>
                                </span>
                            </div>
                        </div>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav nav-dropdown nav-right" data-app-modern-menu="true">
                                <li class="nav-item">
                                    <a class="nav-link link text-white display-4" href="/">
                                        <span class="mbri-home mbr-iconfont mbr-iconfont-btn"></span>
                                        Home page
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </section>
                <section class="cid-rFCUpdpwBS mbr-fullscreen">
                <div class="mbr-overlay" style={{opacity: 0.8, backgroundColor: "#232323"}}/>
                <div class="container align-center">
                <h2 class="mbr-section-title mbr-fonts-style align-center pb-3 display-2">
                    Customer List
                </h2>
                <Table sortable celled fixed>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell
                              sorted={column === 'first_name' ? direction : null}
                              onClick={this.handleSort('first_name')}
                            >
                                NAME
                            </Table.HeaderCell>
                            <Table.HeaderCell
                              sorted={column == 'goal' ? direction : null}
                              onClick={this.handleSort('goal')}
                            >
                                GOAL
                            </Table.HeaderCell>
                            <Table.HeaderCell
                              sorted={column == 'activity_level' ? direction : null}
                              onClick={this.handleSort('activity_level')}
                            >
                                LEVEL
                            </Table.HeaderCell>
                            <Table.HeaderCell
                            sorted={column == 'status' ? direction : null}
                            onClick={this.handleSort('status')}
                            >
                                STATUS
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {optionsCustomer}
                    </Table.Body>
                </Table>
                <div class="align-right">
                <Button secondary onClick = {this.handleClickBack} floated='right'>Back</Button>
                </div>
                </div>
                </section>
            </body>
        )
    }
}
