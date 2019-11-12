import React, { Component } from 'react'
import axios from 'axios';
// import './assets/bootstrap/css/bootstrap.min.css';
// import '../assets/web/assets/mobirise-icons/mobirise-icons.css';
// import '../assets/bootstrap/css/bootstrap.min.css';
// import './assets/bootstrap/css/bootstrap-grid.min.css';
// import './assets/bootstrap/css/bootstrap-reboot.min.css';
// import './assets/tether/tether.min.css';
// import './assets/theme/css/style.css';
// import './assets/mobirise/css/mbr-additional.css';
// import './assets/mobirise/css/mbr-additional.css';
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
import '../assets/mobirise/css/mbr-additional.css';

import './Customer.css';
export default class Customer extends Component {

    state = {
        column: null,
        customers: [],
        direction: null
    }
    
      handleSort = (clickedColumn) => () => {
        const { column, customers, direction } = this.state;
    
        if (column !== clickedColumn) {
          this.setState({
            column: clickedColumn,
            customers: _.sortBy(customers, [clickedColumn]),
            direction: 'ascending',
          })
    
          return
        }
    
        this.setState({
          customers: customers.reverse(),
          direction: direction === 'ascending' ? 'descending' : 'ascending',
        })
      }

    handleClickBack = () => {
        this.props.history.push('/');
    }

 
 componentDidMount(){
    axios.get('http://localhost:8080/customer/getAllCustomers')
    .then(res => {
        const customers = res.data;
        this.setState({customers: customers});
      }
    )
 }
    render() {
        this.handleSort('status');
        var optionsCustomer = [];
        const { column, customers, direction } = this.state;
  customers.map((Customer) => {
    if(Customer.status=="NONE"){
        optionsCustomer.push(
            <Table.Row>
                <Table.Cell><strong>{Customer.first_name} {Customer.last_name}</strong></Table.Cell>
                <Table.Cell>{Customer.goal}</Table.Cell>
                <Table.Cell>{Customer.activity_level}</Table.Cell>
                <Table.Cell><Button primary onClick = {()=>this.props.history.push('/AssignPtoC/'+Customer._id)}> Assign Program</Button></Table.Cell>
            </Table.Row>)
    }
    else{
    optionsCustomer.push(
    <Table.Row onClick={()=>this.props.history.push(`/CustomersDetail/${Customer._id}`)}>
            <Table.Cell><strong>{Customer.first_name} {Customer.last_name}</strong></Table.Cell>
            <Table.Cell>{Customer.goal}</Table.Cell>
            <Table.Cell>{Customer.activity_level}</Table.Cell>
            <Table.Cell>{Customer.status}</Table.Cell>
    </Table.Row>) }});
        return (
            <body>
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
          <button type="button" class="btn btn-primary btn-lg active" role="button" aria-pressed="true" onClick = {this.handleClickBack}><span class="mbrib-arrow-prev mbr-iconfont mbr-iconfont-btn"></span> Back</button>
        </div>

  <script src="assets/web/assets/jquery/jquery.min.js"></script>
  <script src="assets/popper/popper.min.js"></script>
  <script src="assets/bootstrap/js/bootstrap.min.js"></script>
  <script src="assets/tether/tether.min.js"></script>
  <script src="assets/smoothscroll/smooth-scroll.js"></script>
  <script src="assets/theme/js/script.js"></script>
  
  
</body>

        )
    }
}


