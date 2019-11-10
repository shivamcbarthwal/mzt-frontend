import React, { Component } from 'react';
import axios from 'axios';
import Select, { components } from 'react-select';
import '../../assets2/web/assets/mobirise-icons/mobirise-icons.css';
import '../../assets2/bootstrap/css/bootstrap.min.css';
import '../../assets2/bootstrap/css/bootstrap-grid.min.css';
import '../../assets2/bootstrap/css/bootstrap-reboot.min.css';
import '../../assets2/tether/tether.min.css'
import '../../assets2/dropdown/css/style.css'
import '../../assets2/theme/css/style.css'
import '../../assets2/mobirise/css/mbr-additional.css'
import '../../assets2/mobirise/css/mbr-additional.css'
import './listOfSessions.css'
//import Background from '../../assets2/images/allSessions.jpeg';
var Logo = require('../../assets2/images/logo-mzt.png');
const cust_id = '5da86562f964d02c2c679155'

class listOfSessions extends React.Component {
  state = {
    measurements: null
  }

  componentDidMount(){
     axios.get(`http://localhost:8080/customer/getCustomerMeasurementsById/${cust_id}`)
     .then(res => {
         const measurements = res.data;
         console.log(res.data);
         this.setState({ measurements });
       }
     )
  }

  render() {
    const { measurements } = this.state;
    var optionsMeasurement = [];
    if (measurements) {
      optionsMeasurement.push(measurements[measurements.length-1].dickson_metric);
    }
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

      <section class="engine"><a href="https://mobirise.info/c">free website builder</a></section>
      <section class="services5 cid-rHe57AJS6O mbr-parallax-background" id="services5-f">

          <div class="mbr-overlay" style={{opacity: 0.5, backgroundColor: "#232323"}}>
          </div>
          <div class="container">
              <div class="row">
                  <div class="title pb-5 col-12">
                      <h2 class="align-left mbr-fonts-style m-0 display-1" style={{color: "#ffffff"}}><strong>
                          Product List
                      </strong></h2>
                      <h3 class="mbr-section-subtitle mbr-light mbr-fonts-style display-5" style={{color: "#ffffff"}}>
                          Subtitle
                      </h3>
                  </div>
                  <div class="card px-3 col-12">
                      <div class="card-wrapper media-container-row media-container-row">
                          <div class="card-box">
                              <div class="top-line pb-3">
                                  <h4 class="card-title mbr-fonts-style display-5">
                                      Watch 1
                                  </h4>
                                  <p class="mbr-text cost mbr-fonts-style m-0 display-5">
                                      $400
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
                  </div>
                  <div class="card px-3 col-12">
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

export default listOfSessions;
