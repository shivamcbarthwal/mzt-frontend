import React, { Component } from 'react';
import axios from 'axios';
import Select, { components } from 'react-select';
import './listOfPrograms.css'
var Logo = require('../../../assets/images/logo-mzt.png');
const cust_id = '5dc53fb7717676384459fe63'

class ListOfPrograms extends React.Component {
  state = {
    exerciseN: 1,
    program: null
  }

  componentDidMount(){
     axios.get(`http://localhost:8080/program/getProgramByCustomerId/${cust_id}`)
     .then(res => {
         const program = res.data;
         console.log(res.data);
         this.setState({ program });
       }
     )
  }
  
  handleClickBack = () => {
    this.props.history.push('/Homepage');
}
  render() {
    const { program, exerciseN} = this.state;
    var TodoPrograms = [];
    var DonePrograms = [];
    console.log("program", program);
    if (program) {
    this.state.program.map((programID, i) => {
        if(programID.status === 'COMPLETED'){
        DonePrograms.push(
            <div class="card px-3 col-12" >
            <div class="card-wrapper media-container-row media-container-row">
                <div class="card-box">
                    <div class="top-line pb-3">
                        <h4 class="card-title mbr-fonts-style display-5">
                            {programID.title}
                        </h4>
                        <p class="mbr-text cost mbr-fonts-style m-0 display-5">
                            {programID.status}
                        </p>
                    </div>
                    <div class="bottom-line">
                        <p class="mbr-text mbr-fonts-style m-0 b-descr display-7">
                            Session type: {programID.description} <br/>
                        </p>
                    </div>
                </div>
            </div>
            </div>
            );
        }
        if(programID.status === 'CANCELED'){
            DonePrograms.push(
                <div class="card px-3 col-12" >
                <div class="card-wrapper media-container-row media-container-row">
                    <div class="card-box">
                        <div class="top-line pb-3">
                            <h4 class="card-title mbr-fonts-style display-5">
                                {programID.title}
                            </h4>
                            <p class="mbr-text cost mbr-fonts-style m-0 display-5">
                                {programID.status}
                            </p>
                        </div>
                        <div class="bottom-line">
                            <p class="mbr-text mbr-fonts-style m-0 b-descr display-7">
                                Session type: {programID.description} <br/>
                            </p>
                        </div>
                    </div>
                </div>
                </div>
                );
            }
        if(programID.status === 'IN_PROGRESS'){
            TodoPrograms.push(
                <div class="card px-3 col-12" onClick={()=>this.props.history.push('/listOfSessions/'+programID._id)} >
                <div class="card-wrapper media-container-row media-container-row">
                    <div class="card-box">
                        <div class="top-line pb-3">
                            <h4 class="card-title mbr-fonts-style display-5">
                                {programID.title}
                            </h4>
                            <p class="mbr-text cost mbr-fonts-style m-0 display-5">
                                {programID.status}
                            </p>
                        </div>
                        <div class="bottom-line">
                            <p class="mbr-text mbr-fonts-style m-0 b-descr display-7">
                                Session type: {programID.description} <br/>
                            </p>
                        </div>
                    </div>
                </div>
                </div>
                );
            }
            if(programID.status === 'ASSIGNED'){
                TodoPrograms.push(
                    <div class="card px-3 col-12"  onClick={()=>this.props.history.push('/listOfSessions/'+programID._id)} >
                    <div class="card-wrapper media-container-row media-container-row">
                        <div class="card-box">
                            <div class="top-line pb-3">
                                <h4 class="card-title mbr-fonts-style display-5">
                                    {programID.title}
                                </h4>
                                <p class="mbr-text cost mbr-fonts-style m-0 display-5">
                                    {programID.status}
                                </p>
                            </div>
                            <div class="bottom-line">
                                <p class="mbr-text mbr-fonts-style m-0 b-descr display-7">
                                    Session type: {programID.description} <br/>
                                </p>
                            </div>
                        </div>
                    </div>
                    </div>
                    );
                }
    })
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
                              <a href="/homepage">
                                  <img src={Logo} alt="MZT fitness" title="" />
                              </a>
                          </span>
                          <span class="navbar-caption-wrap">
                              <a class="navbar-caption text-white display-4" href="/homepage">
                                  MZT FITNESS
                              </a>
                          </span>
                      </div>
                  </div>
                  <div class="collapse navbar-collapse" id="navbarSupportedContent">
                      <ul class="navbar-nav nav-dropdown nav-right" data-app-modern-menu="true">
                          <li class="nav-item">
                              <a class="nav-link link text-white display-4" href="/homepage">
                                  <span class="mbri-home mbr-iconfont mbr-iconfont-btn"></span>
                                  Home page
                              </a>
                          </li>
                          <li class="nav-item">
                              <a class="nav-link link text-white display-4" href="/challenge">
                                  <span class="mbri-chat mbr-iconfont mbr-iconfont-btn"></span>
                                  Challenge
                              </a>
                          </li>
                      </ul>
                  </div>
          </nav>
      </section>
      
      <section class="services5 cid-rHe57AJS6O mbr-parallax-background" id="services5-f">

          <div class="mbr-overlay" style={{opacity: 0.5, backgroundColor: "#232323"}}>
          </div>
          <div class="container">
              <div class="row">
                  <div class="title pb-5 col-12">
                      <h2 class="align-left mbr-fonts-style m-0 display-1" style={{color: "#ffffff"}}><strong>
                          Your programs
                      </strong></h2>
                  </div>
                  {TodoPrograms}
                  {DonePrograms}
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
      </body>
    );
  }
}

export default ListOfPrograms;
