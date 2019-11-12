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
        customers: []
    }

    handleClickBack = () => {
        this.props.history.push('/');
    }

 
 componentDidMount(){
    axios.get('http://localhost:8080/customer/getAllCustomers')
    .then(res => {
        const customers = res.data;
        this.setState({ customers });
      }
    )
 }
    render() {
        var optionsCustomer = [];
        var status="";
  this.state.customers.map((Customer) => {
    if(Customer.status=="NONE"){
        optionsCustomer.push(
            <tr>
                <td><strong>{Customer.first_name} {Customer.last_name}</strong></td>
                <td>{Customer.goal}</td>
                <td>{Customer.activity_level}</td>
                <td><button class="btn-primary active" aria-pressed="true" onClick = {()=>this.props.history.push('/AssignPtoC/'+Customer._id)}> Assign Program</button></td>
            </tr>)
    }
    else{
    optionsCustomer.push(
    <tr onClick={()=>this.props.history.push(`/CustomersDetail/${Customer._id}`)}>
            <td><strong>{Customer.first_name} {Customer.last_name}</strong></td>
            <td>{Customer.goal}</td>
            <td>{Customer.activity_level}</td>
            <td>ASSIGNED</td>
    </tr>) }});
        return (
            <body>
  <section class="section-table cid-rG9zmLsN4O" id="table1-s">
<div class="container container-table">
    <h2 class="mbr-section-title mbr-fonts-style align-center pb-3 display-2">
        Customer List
    </h2>
    <div class="table-wrapper">
        <div class="container scroll">
          <table class="table" cellspacing="0">
            <thead>
                <tr class="table-heads ">
                    <th class="head-item mbr-fonts-style display-7">NAME</th>
                    <th class="head-item mbr-fonts-style display-7">GOAL</th>
                    <th class="head-item mbr-fonts-style display-7">LEVEL</th>
                    <th class="head-item mbr-fonts-style display-7">STATUS</th>
                </tr>
            </thead>
            <tbody>
            {optionsCustomer}
            </tbody>
            </table>
            </div>
            </div>
        <div class="align-right">
          <button type="button" class="btn btn-primary btn-lg active" role="button" aria-pressed="true" onClick = {this.handleClickBack}><span class="mbrib-arrow-prev mbr-iconfont mbr-iconfont-btn"></span> Back</button>
        </div>
    </div>
</section>

  <script src="assets/web/assets/jquery/jquery.min.js"></script>
  <script src="assets/popper/popper.min.js"></script>
  <script src="assets/jquery.tablesort.js"></script>
  <script src="assets/bootstrap/js/bootstrap.min.js"></script>
  <script src="assets/tether/tether.min.js"></script>
  <script src="assets/smoothscroll/smooth-scroll.js"></script>
  <script src="assets/theme/js/script.js"></script>
  
  
</body>

        )
    }
}


