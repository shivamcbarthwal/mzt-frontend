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
var Logo = require('../../assets2/images/logo-mzt.png');

class listOfSessions extends React.Component {
  state = {
    exerciseN: 1,
    program: null
  }

  componentDidMount(){
     axios.get(`http://localhost:8080/program/getProgramById/${this.props.match.params.programID}`)
     .then(res => {
         const program = res.data;
         console.log("request",res.data);
         this.setState({ program });
       }
     )
  }

  handleClickBack = () => {
    this.props.history.push('/Homepage');
}
  render() {
    const { program, exerciseN} = this.state;
    var optionsSession = [];
    console.log("program", program);
    if (program) {
    program.sessions.map((sessionId, i) => {
    if(sessionId.session_status === 'OPENED') {
      if(sessionId.session_type === 'regular') {
        optionsSession.push(
            <div class="card px-3 col-12" onClick={()=>this.props.history.push(`/regularSessionStartExercise/${program._id}?sessionIndex=${i}`)} >
            <div class="card-wrapper media-container-row media-container-row">
                <div class="card-box">
                    <div class="top-line pb-3">
                        <h4 class="card-title mbr-fonts-style display-5">
                            {sessionId.name}
                        </h4>
                        <p class="mbr-text cost mbr-fonts-style m-0 display-5">
                            {sessionId.session_status}
                        </p>
                    </div>
                    <div class="bottom-line">
                        <p class="mbr-text mbr-fonts-style m-0 b-descr display-7">
                            Session type: {sessionId.session_type} <br/>
                            Coach notes: {sessionId.session_coach_notes}
                        </p>
                    </div>
                </div>
            </div>
            </div>
            )
        }
        if(sessionId.session_type === 'focus') {
            optionsSession.push(
                <div class="card px-3 col-12" onClick={()=>this.props.history.push(`/focusSessionAgenda/${program._id}?sessionIndex=${i}`)} >
                <div class="card-wrapper media-container-row media-container-row">
                    <div class="card-box">
                        <div class="top-line pb-3">
                            <h4 class="card-title mbr-fonts-style display-5">
                                {sessionId.name}
                            </h4>
                            <p class="mbr-text cost mbr-fonts-style m-0 display-5">
                                {sessionId.session_status}
                            </p>
                        </div>
                        <div class="bottom-line">
                            <p class="mbr-text mbr-fonts-style m-0 b-descr display-7">
                                Session type: {sessionId.session_type} <br/>
                                Coach notes: {sessionId.session_coach_notes}
                            </p>
                        </div>
                    </div>
                </div>
                </div>
                )
            } 
        }
        if(sessionId.session_status === 'CLOSED') {
            optionsSession.push(
                  <div class="card px-3 col-12" >
                  <div class="card-wrapper media-container-row media-container-row">
                      <div class="card-box">
                          <div class="top-line pb-3">
                              <h4 class="card-title mbr-fonts-style display-5">
                                  {sessionId.name}
                              </h4>
                              <p class="mbr-text cost mbr-fonts-style m-0 display-5">
                                  {sessionId.session_status}
                              </p>
                          </div>
                          <div class="bottom-line">
                              <p class="mbr-text mbr-fonts-style m-0 b-descr display-7">
                                  Session type: {sessionId.session_type} <br/>
                                  Coach notes: {sessionId.session_coach_notes}
                              </p>
                          </div>
                      </div>
                  </div>
                  </div>
                  ) 
              }
        if(sessionId.session_status === 'COMPLETED') {
            optionsSession.push(
                  <div class="card px-3 col-12" >
                  <div class="card-wrapper media-container-row media-container-row">
                      <div class="card-box">
                          <div class="top-line pb-3">
                              <h4 class="card-title mbr-fonts-style display-5">
                                  {sessionId.name}
                              </h4>
                              <p class="mbr-text cost mbr-fonts-style m-0 display-5">
                                  {sessionId.session_status}
                              </p>
                          </div>
                          <div class="bottom-line">
                              <p class="mbr-text mbr-fonts-style m-0 b-descr display-7">
                                  Session type: {sessionId.session_type} <br/>
                                  Coach notes: {sessionId.session_coach_notes}
                              </p>
                          </div>
                      </div>
                  </div>
                  </div>
                  ) 
              }
    }
    );
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

      <section class="engine"><a href="https://mobirise.info/c">free website builder</a></section>
      <section class="services5 cid-rHe57AJS6O mbr-parallax-background" id="services5-f">

          <div class="mbr-overlay" style={{opacity: 0.5, backgroundColor: "#232323"}}>
          </div>
          <div class="container">
              <div class="row">
                  <div class="title pb-5 col-12">
                      <h2 class="align-left mbr-fonts-style m-0 display-1" style={{color: "#ffffff"}}><strong>
                          Your sessions
                      </strong></h2>
                  </div>
                  {optionsSession}
              </div>
              <br/>
              <div class="align-right">
                <button type="button" class="btn btn-primary btn-lg active" role="button" aria-pressed="true" onClick = {this.handleClickBack}>
                    <span class="mbrib-arrow-prev mbr-iconfont mbr-iconfont-btn"/>
                    Back
                </button>
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
