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

export default class CustomerModal extends Component {

    state = {
        customers: null,
        program: null
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
            console.log(res.data);
            this.setState({ program });
          }
        )
    }
    render() {
        const {customers, program} = this.state;
        console.log(program);
        if (customers && program)
            return (
//             <div>
//                 <div className={classes.card}>
//                 <h1>{customers.first_name} {customers.last_name}</h1>
//                     <p className={classes.title}>{customers.goal}</p>
//                     <p>{customers.activity_level}</p>
//                     <p>{program.title}</p>
//                     <p>{program.description}</p>
//                     <p>{program.type}</p>
//                     <p label="Status">{program.status}</p>
//                         <a href="#"><i class="fa fa-dribbble"></i></a>
//                         <a href="#"><i class="fa fa-twitter"></i></a>
//                         <a href="#"><i class="fa fa-linkedin"></i></a>
//                         <a href="#"><i class="fa fa-facebook"></i></a>
//                     <p><button>Contact</button></p>
// </div>
//             </div>
<body>
  <section class="services5 cid-rHakXOOQSN" id="services5-c" style={{padding: "25px"}}>
    
    <div class="container">
        <div class="row">
            
            <div class="title pb-5 col-12">
                <h2 class="align-left mbr-fonts-style m-0 display-1">
                {customers.first_name} {customers.last_name}
                </h2>
                
            </div>
            
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
                            <p class="mbr-text mbr-fonts-style m-0 b-descr display-7">
                            {program.description}
                            </p>
                        </div>
                        <div class="bottom-line">
                            <p class="mbr-text mbr-fonts-style m-0 b-descr display-7">
                            {program.sessions.map(session=>
                                <div>
                                    {session.name}
                                    {session.exercises.map(exercise=>
                                        <div>
                                            {exercise.name}
                                        </div>)}
                                </div>)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
{/*             
            <div class="card px-3 col-12">
                <div class="card-wrapper media-container-row media-container-row">
                    <div class="card-box">
                        <div class="top-line pb-3">
                            <h4 class="card-title mbr-fonts-style display-5">
                                Watch 2
                            </h4>
                            <p class="mbr-text cost mbr-fonts-style m-0 display-5">
                                $500
                            </p>
                        </div>
                        <div class="bottom-line">
                            <p class="mbr-text mbr-fonts-style m-0 b-descr display-7">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus, odit?
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="card px-3 col-12">
                <div class="card-wrapper media-container-row media-container-row">
                    <div class="card-box">
                        <div class="top-line pb-3">
                            <h4 class="card-title mbr-fonts-style display-5">
                                Watch 3
                            </h4>
                            <p class="mbr-text cost mbr-fonts-style m-0 display-5">
                                $600
                            </p>
                        </div>
                        <div class="bottom-line">
                            <p class="mbr-text mbr-fonts-style m-0 b-descr display-7">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus, odit?
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="card px-3 col-12">
                <div class="card-wrapper media-container-row media-container-row">
                    <div class="card-box">
                        <div class="top-line pb-3">
                            <h4 class="card-title mbr-fonts-style display-5">
                                Watch 4
                            </h4>
                            <p class="mbr-text cost mbr-fonts-style m-0 display-5">
                                $700
                            </p>
                        </div>
                        <div class="bottom-line">
                            <p class="mbr-text mbr-fonts-style m-0 b-descr display-7">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus, odit?
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="card px-3 col-12">
                <div class="card-wrapper media-container-row media-container-row">
                    <div class="card-box">
                        <div class="top-line pb-3">
                            <h4 class="card-title mbr-fonts-style display-5">
                                Watch 5
                            </h4>
                            <p class="mbr-text cost mbr-fonts-style m-0 display-5">
                                $800
                            </p>
                        </div>
                        <div class="bottom-line">
                            <p class="mbr-text mbr-fonts-style m-0 b-descr display-7">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus, odit?
                            </p>
                        </div>
                    </div>
                </div>
            </div> */}
            
            {/* <div class="card px-3 col-12">
                <div class="card-wrapper media-container-row media-container-row">
                    <div class="card-box">
                        <div class="top-line pb-3">
                            <h4 class="card-title mbr-fonts-style display-5">
                                Watch 6
                            </h4>
                            <p class="mbr-text cost mbr-fonts-style m-0 display-5">
                                $900
                            </p>
                        </div>
                        <div class="bottom-line">
                            <p class="mbr-text mbr-fonts-style m-0 b-descr display-7">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus, odit?
                            </p>
                        </div>
                    </div>
                </div>
            </div> */}
          
            
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
