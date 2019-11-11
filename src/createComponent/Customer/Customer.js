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
import '../assets/tether/tether.min.css'
import '../assets/dropdown/css/style.css'
import '../assets/theme/css/style.css'
import '../assets/mobirise/css/mbr-additional.css'
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
  this.state.customers.map((Customer) => {
    optionsCustomer.push(<div class="card px-3 col-12" onClick={()=>this.props.history.push(`/CustomersDetail/${Customer._id}`)}>
    <div class="card-wrapper media-container-row media-container-row">
        <div class="card-box">
            <div class="top-line pb-3">
                <h4 class="card-title mbr-fonts-style display-5">
                {Customer.first_name} {Customer.last_name}
                </h4>
                <p class="mbr-text cost mbr-fonts-style m-0 display-5">
                {Customer.activity_level}
                </p>
            </div>
            <div class="bottom-line">
                <p class="mbr-text mbr-fonts-style m-0 b-descr display-7">
                {Customer.goal}
                </p>
            </div>
        </div>
    </div>
  </div>) });
        return (
            <body>
  <section class="services5 cid-rHakXOOQSN" id="services5-c" style={{padding: "20px"}}>

    <div class="container" >
        <div class="row">
            <div class="title pb-5 col-12">
                <h2 class="align-left mbr-fonts-style m-0 display-1" >

                    Customer List
                </h2>
                
            </div>
            {optionsCustomer}
        </div>
        <div class="align-right">
          <button type="button" class="btn btn-primary btn-lg active" role="button" aria-pressed="true" onClick = {this.handleClickBack}><span class="mbrib-arrow-prev mbr-iconfont mbr-iconfont-btn"></span> Back</button>
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
    }
}


