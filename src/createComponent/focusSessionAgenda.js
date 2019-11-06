import React, { Component } from 'react';
import axios from 'axios';
import Select, { components } from 'react-select';
import '../assets2/web/assets/mobirise-icons/mobirise-icons.css';
import '../assets2/bootstrap/css/bootstrap.min.css';
import '../assets2/bootstrap/css/bootstrap-grid.min.css';
import '../assets2/bootstrap/css/bootstrap-reboot.min.css';
import '../assets2/tether/tether.min.css'
import '../assets2/dropdown/css/style.css'
import '../assets2/theme/css/style.css'
import '../assets2/mobirise/css/mbr-additional.css'
import '../assets2/mobirise/css/mbr-additional.css'
var Logo = require('../assets2/images/logo-mzt.png');
const cust_id = '5db84e5b006e1f170c40bd7d'

class focusSessionAgenda extends React.Component {
  state = {
    exercises: [],
    Measurements: null,
    heartRates: {
      customer_id: '',
      heartRate1: '',
      heartRate2: '',
      heartRate3: '',
      weight: '',
      height: '',
      chest: '',
      arms: '',
      hips: '',
      thigh: '',
      waist: ''
    }
  }
  componentDidMount(){
     axios.get('http://localhost:8080/exercise/getAllExercises')
     .then(res => {
         const exercises = res.data;
         this.setState({ exercises });
       }
     )
     axios.get(`http://localhost:8080/customer/getCustomerMeasurementsById/${cust_id}`)
     .then(res => {
         const measurements = res.data;
         console.log(res.data);
         this.setState({ measurements });
       }
     )
  }
  // focusSessionAgenda Change Handler method to take form focusSessionAgendas

  handleChange = (name, event) => {
    console.log(this.state.heartRates);
    this.setState({ heartRates: {
      ...this.state.heartRates,
      [name]: event.target.value

    }});
    console.log(event.target);
  };

  // Submit handler to add exercise

  handleSubmit = async event => {
    console.log('Testing')
    event.preventDefault();
    const { heartRates } = this.state;
    const response = await fetch(`http://localhost:8080/customer/addMeasurement`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(heartRates) // body data type must match "Content-Type" header
      });
      return await response.json(); // parses JSON response into native JavaScript objects
    }

  render() {
    const { measurements } = this.state;
    var optionsMeasurement1 = [];
    var optionsMeasurement2 = [];
    var optionsMeasurement3 = [];
    if (measurements) {
      optionsMeasurement1.push("Previous: " + measurements[measurements.length-1].heartRate1);
      optionsMeasurement2.push("Previous: " + measurements[measurements.length-1].heartRate2);
      optionsMeasurement3.push("Previous: " + measurements[measurements.length-1].heartRate3);
    }

    const { exercises } = this.state.exercises;
    var optionsExercise = [];
    this.state.exercises.map((exerciseId) => {
      optionsExercise.push(<li>{exerciseId.exercise_est_duration} min: {exerciseId.name}</li>)
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
                          <a href="https://mobirise.com">
                              <img src={Logo} alt="Mobirise" title="" />
                          </a>
                      </span>
                      <span class="navbar-caption-wrap">
                          <a class="navbar-caption text-white display-4" href="homepage.html">
                              MZT FITNESS
                          </a>
                      </span>
                  </div>
              </div>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul class="navbar-nav nav-dropdown nav-right" data-app-modern-menu="true">
                      <li class="nav-item">
                          <a class="nav-link link text-white display-4" href="homepage.html">
                              <span class="mbri-home mbr-iconfont mbr-iconfont-btn"></span>
                              Home page
                          </a>
                      </li>
                      <li class="nav-item">
                          <a class="nav-link link text-white display-4" href="community_page.html">
                              <span class="mbri-chat mbr-iconfont mbr-iconfont-btn"></span>
                              Community
                          </a>
                      </li>
                      <li class="nav-item">
                          <a class="nav-link link text-white display-4" href="https://mobirise.com">
                              <span class="mbri-search mbr-iconfont mbr-iconfont-btn"></span>
                              About Us
                          </a>
                      </li>
                  </ul>
              </div>
          </nav>
      </section>

      <section class="header9 cid-rFCsMVPnbl mbr-fullscreen mbr-parallax-background" id="header9-e">
          <div class="mbr-overlay" style={{opacity: 0.8}}>
          </div>

          <div class="container">
              <div class="mbr-white col-lg-8 col-md-12">
                  <h1 class="align-left mbr-fonts-style m-0 display-1">
                     <br /> Today is your focus session!
                  </h1>
                  <h3 class="mbr-section align-left mbr-light pb-3 mbr-fonts-style display-6">
                      <br /> Physical condition
                  </h3>
                  <form action="https://mobirise.com/" method="POST" class="mbr-form form-with-styler" data-form-title="Mobirise Form"><input type="hidden" name="email" data-form-email="true" value="xBwRiT6nXeo2bF/dVu2/EBCkac7IluadHt0cFITc55G/p30tWqG8gXHl+mdGmsQsN5AatHpswIJCwifAAt0I4mc5f88/NG2BbOC/6ksvRyy5bygRgspSSl6a6sqj6PLA" />
                  <div data-for="message" class="col-md-12  form-group">
                     <label for="message" class="form-control-label mbr-fonts-style display-7">customer_id</label>
                     <input data-form-field="Message" placeholder="" required="required" class="form-control display-7" id="name-form1-2" onChange={(e) => this.handleChange('customer_id', e)} />
                  </div>
                       <div data-for="message" class="col-md-12  form-group">
                          <label for="message" class="form-control-label mbr-fonts-style display-7">Lay down for 5 min</label><br />
                          <label for="message" class="form-control-label mbr-fonts-style display-7">Heart Rate:</label>
                          <input data-form-field="Message" placeholder={optionsMeasurement1} required="required" class="form-control display-7" id="name-form1-2" onChange={(e) => this.handleChange('heartRate1', e)} />
                      </div>
                      <div data-for="message" class="col-md-12  form-group">
                          <label for="message" class="form-control-label mbr-fonts-style display-7">Do 30 complete flexions in 45 sec</label><br />
                          <label for="message" class="form-control-label mbr-fonts-style display-7">Heart rate:</label>
                          <input data-form-field="Message" placeholder={optionsMeasurement2} required="required" class="form-control display-7" id="email-form1-2" onChange={(e) => this.handleChange('heartRate2', e)}/>
                      </div>
                      <div data-for="message" class="col-md-12  form-group">
                          <label for="message" class="form-control-label mbr-fonts-style display-7">Lay down for 1 min</label><br />
                          <label for="message" class="form-control-label mbr-fonts-style display-7">Heart rate:</label>
                          <input data-form-field="Message" placeholder={optionsMeasurement3} class="form-control display-7" id="phone-form1-2" onChange={(e) => this.handleChange('heartRate3', e)}/>
                      </div>
                  </form>
                  <h3 class="mbr-section align-left mbr-light pb-3 mbr-fonts-style display-6">
                      <br /> Performance
                  </h3>
                  <div class="mbr-section mbr-text-challenge counter-container col-12 col-md-12 display-5" style={{color: "#cccccc"}}>
                      <h4 class="mbr-section-subtitle align-left mbr-light pb-3 mbr-fonts-style display-5">
                          You have 4 exercises today. <br />You don't need any material. <br />Do as much as you can for each exercise!
                      </h4>
                      <ul>
                          {optionsExercise}
                      </ul>
                  </div>
                  <div class="mbr-section-btn align-left">
                      <a class="btn btn-md btn-primary btn-lg display-4" href="focus_session_start_exercise.html" onClick={this.handleSubmit}>Let's Get Started!</a>
                      <a class="btn btn-md btn-secondary display-4" href="homepage.html">Back</a>
                  </div>
              </div>
          </div>
      </section>

        <script src="assets/web/assets/jquery/jquery.min.js"></script>
        <script src="assets/popper/popper.min.js"></script>
        <script src="assets/bootstrap/js/bootstrap.min.js"></script>
        <script src="assets/tether/tether.min.js"></script>
        <script src="assets/smoothscroll/smooth-scroll.js"></script>
        <script src="assets/dropdown/js/nav-dropdown.js"></script>
        <script src="assets/dropdown/js/navbar-dropdown.js"></script>
        <script src="assets/touchswipe/jquery.touch-swipe.min.js"></script>
        <script src="assets/parallax/jarallax.min.js"></script>
        <script src="assets/theme/js/script.js"></script>

      </body>
    );
  }
}

export default focusSessionAgenda;
