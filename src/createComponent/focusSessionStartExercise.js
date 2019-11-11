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
import Background from '../assets2/images/woman-pushup.jpeg';
var Logo = require('../assets2/images/logo-mzt.png');
var image1 = require('../assets2/images/timed.png');
var image2 = require('../assets2/images/reload.png');
var image3 = require('../assets2/images/emoticons.png');

class focusSessionStartExercise extends React.Component {
  state = {
    exerciseN: 0,
    exercises: null,
    onExercise: false,
    offInfo: true
  }

  toggle = () =>{
    this.setState({
      onExercise: !this.state.onExercise,
      offInfo: !this.state.offInfo
    });
  };

  toggleNext = () =>{
    this.setState({
      onExercise: !this.state.onExercise,
      offInfo: !this.state.offInfo,
      exerciseN: this.state.exerciseN+1
    });
  };
  componentDidMount(){
     axios.get(`http://localhost:8080/exercise/getAllExercises`)
     .then(res => {
         const exercises = res.data;
         console.log(res.data);
         this.setState({ exercises });
       }
     )
  }


  render() {
    const { exercises, exerciseN } = this.state;
    var optionsInfo = [];
    var optionsExercise = []
    console.log(exercises)
    //можно потом использовать if чтобы показывать упражнения на время или на количество
    if (exercises) {
      optionsInfo.push(
        <div class="container align-items-center">
            <div class="row justify-content-md-center">
                <div class="mbr-white col-md-10">
                    <h1 class="mbr-text pb-3 mbr-fonts-style display-5">
                       <br /> {exercises[exerciseN].name}
                    </h1>
                    <p class="mbr-text pb-3 mbr-fonts-style display-5">
                        <img src={image1} style={{marginLeft: '10px', width: "10%", height: "10%"}} />
                        <span style={{marginLeft:'1em'}}>
                            {exercises[exerciseN].exercise_est_duration} min
                        </span>
                    </p>
                    <p class="mbr-text pb-3 mbr-fonts-style display-5">
                        <img src={image2} style={{marginLeft: '10px',  width: "10%", height: "10%"}} />
                        <span style={{marginLeft:'1em'}}>
                            Do as much as you can!
                        </span>
                    </p>
                    <p class="mbr-text pb-3 mbr-fonts-style display-5">
                        <img src={image3} style={{marginLeft: '10px',  width: "10%", height:"10%"}} />
                        <span style={{marginLeft:'1em', fontStyle:'italic'}}>
                            Coach advice: {exercises[exerciseN].description}
                        </span>
                    </p>
                    <div class="mbr-section-btn">
                        <a class="btn btn-md btn-secondary display-4" onClick={this.toggle} >GO</a>
                    </div>
                </div>
            </div>
        </div>
      );
      optionsExercise.push(
        <div class="media-container-row">

            <div class="media-content align-center">
                <h1 class="mbr-section-title mbr-white pb-3 mbr-fonts-style display-1">
                    {exercises[exerciseN].name}
                </h1>
                <div class="mbr-section-text mbr-white pb-3">
                    <p class="mbr-text mbr-fonts-style display-5">
                        {exercises[exerciseN].description}
                    </p>
                </div>
                <div class="mbr-section-btn">
                        <a onClick={this.toggleNext} class="btn btn-md btn-white-outline display-4" >Go next</a>
                </div>
            </div>

            <div class="mbr-figure" style={{width: '145%'}}><iframe class="mbr-embedded-video" src="https://www.youtube.com/embed/IODxDxX7oi4?rel=0&amp;amp;showinfo=0&amp;autoplay=1&amp;loop=0" width= "1280" height="360" frameborder="0" allowfullscreen></iframe></div>

        </div>
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
                          <a href="https://mobirise.com">
                               <img src={Logo} alt="Mobirise" title=""/>
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
      {this.state.offInfo && (
          <div>
            <section class="engine"><a href="https://mobirise.info/p">site templates free download</a></section>
            <section class="mbr-fullscreen mbr-parallax-background" id="header2-j" style={{ backgroundImage: `url(${Background})` }}>
              <div class="mbr-overlay" style={{opacity: 0.8, backgroundColor: '#232323'}}>
              </div>
              {optionsInfo}
            </section>
          </div>
    )
  }
      {this.state.onExercise && (
      <section class="header7 cid-rH9xttLmcq mbr-fullscreen mbr-parallax-background" id="header7-b" style={{ backgroundImage: `url(${Background})` }}>



        <div class="mbr-overlay" style={{opacity: 0.8, backgroundColor: '#232323'}}>
        </div>

        <div class="container">
          {optionsExercise}
        </div>
      </section>
    )
  }
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

export default focusSessionStartExercise;