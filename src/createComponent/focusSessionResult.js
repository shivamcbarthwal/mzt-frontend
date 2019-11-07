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

class focusSessionResult extends React.Component {
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
                               <img src={Logo} alt="Mobirise" title="" style={{height: 3.8}} />
                          </a>
                      </span>
                      <span class="navbar-caption-wrap"><a class="navbar-caption text-white display-4" href="homepage.html">
                              MZT FITNESS</a></span>
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

      <section class="header10 cid-endFocusSession mbr-fullscreen mbr-parallax-background" id="header10-o">
          <div class="mbr-overlay">
          </div>

          <div class="container">
              <h2 class="align-left mbr-white mbr-fonts-style m-0 display-1">
                  <br/> Congratulations! <br/> Your session results:
              </h2>
              <br/>
              <div class=" media-container-column col-lg-8 pb-3 col-md-10" style={{border: "2px solid white", background: "white", opacity:0.8}}>
                  <div class="cid-rFD0NwyLkn">
                      <div class="counter-container col-12 col-md-18 display-5">
                          <ul>
                              <li>1 min:  22 Push ups </li>
                              <li>2 min:  51 Crunches</li>
                              <li>2 min:  89 Squats</li>
                              <li>1 min:  27 Dips</li>
                              <li>2 min:  148 Jump Rope</li>
                          </ul>
                      </div>
                  </div>
                  <h4 class="mbr-section align-center mbr-bold align-left mbr-light pb-3 mbr-fonts-style display-5">
                      Dickson indicator: {optionsMeasurement} <br/><br/>Very good!
                  </h4>
              </div>
              <br/>
              <div class=" media-container-column col-lg-8 pb-3 col-md-10" style={{border: "2px solid white", background:"white", opacity:0.8}}>
                  <h3 class="mbr-section align-left mbr-light pb-3 mbr-fonts-style display-6">
                      <br/> Coach feedback:
                  </h3>
                  <p>
                      No feedback yet.
                  </p>
              </div>
          </div>
      </section>

      <section class="cid-rFL604bhmT" id="social-buttons3-5">
          <div class="container">
              <div class="media-container-row">
                  <div class="col-md-8 align-center">
                      <h2 class="pb-3 mbr-section-title mbr-fonts-style display-2">
                          Share your performance!
                      </h2>
                      <div>
                          <div class="mbr-social-likes">
                              <span class="btn btn-social socicon-bg-facebook facebook mx-2" title="Share link on Facebook">
                                  <i class="socicon socicon-facebook"></i>
                              </span>
                              <span class="btn btn-social twitter socicon-bg-twitter mx-2" title="Share link on Twitter">
                                  <i class="socicon socicon-twitter"></i>
                              </span>
                              <span class="btn btn-social instagram socicon-bg-instagram mx-2" title="Share link on Instagram">
                                  <i class="socicon socicon-instagram"></i>
                              </span>
                              <span class="btn btn-social pinterest socicon-bg-pinterest mx-2" title="Share link on Pinterest">
                                  <i class="socicon socicon-pinterest"></i>
                              </span>
                              <span class="btn btn-social mailru socicon-bg-mail mx-2" title="Share link on Mailru">
                                  <i class="socicon socicon-mail"></i>
                              </span>
                          </div>
                      </div>
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
        <script src="assets/sociallikes/social-likes.js"></script>

      </body>
    );
  }
}

export default focusSessionResult;