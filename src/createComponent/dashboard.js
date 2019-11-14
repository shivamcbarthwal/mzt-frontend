import React, { Component } from 'react';
import axios from 'axios';
import Select, { components } from 'react-select';
import '../assets2/web/assets/mobirise-icons/mobirise-icons.css';
import '../assets2/bootstrap/css/bootstrap.min.css';
import '../assets2/bootstrap/css/bootstrap-grid.min.css';
import '../assets2/bootstrap/css/bootstrap-reboot.min.css';
import '../assets2/tether/tether.min.css';
import '../assets2/dropdown/css/style.css';
import '../assets2/theme/css/style.css';
import '../assets2/mobirise/css/mbr-additional.css';
import Background from '../assets/images/bk_hp.jpg';
import CanvasJSReact from '../assets/canvas/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var Logo = require('../assets2/images/logo-mzt.png');

class dashboard extends React.Component {
    state = {
        exerciseN: 1,
        measurements: [],
        dickson: []
      }
    handleClickBack = () => {
        this.props.history.push('/Homepage');
    }
    componentDidMount(){
        axios.get(`http://localhost:8080/customer/getCustomerMeasurementsById`,
        {
            params: {
                "customer_id":"5dc541fb717676384459fe66",
                "program_id":"5dcbe4cfdeb2027f66d2c4c8"
            }
        })
        .then(res => {
            const measurements = res.data;
            console.log("request",res.data);
            this.setState({ measurements });
          }
        )
     }
    render() {
        const {measurements} = this.state;
        var measurementsData = [];
        if(measurements){
            for (let i = 0; i < measurements.length; i++){
                measurementsData.push({ x: i+1, y: measurements[i].dickson_metric});
            }
        }
        console.log("data ",measurementsData);
        const options = {
            animationEnabled: true,
            exportEnabled: true,
            theme: "dark1", // "light1", "dark1", "dark2"
            title:{
                text: "Dickson Indicator by Week of Focus Session"
            },
            axisY: {
                title: "Dickson Indicator",
                includeZero: false,
                suffix: "%",
                interval: 0.25
            },
            axisX: {
                title: "Week of Focus Session",
                prefix: "W",
                interval: 1
            },
            data: [{
                type: "line",
                toolTipContent: "Week {x}: {y}%",
                dataPoints: measurementsData
            }]
        }
        console.log(options)
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
                                    <span class="navbar-logo" href="homepage">
                                        <a href="homepage">
                                            <img src= {Logo}/>
                                        </a>
                                    </span>
                                    <span class="navbar-caption-wrap"><a class="navbar-caption text-white display-4" href="Homepage">
                                            MZT FITNESS</a>
                                    </span>
                                </div>
                            </div>
                            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                 <ul class="navbar-nav nav-dropdown nav-right" data-app-modern-menu="true">
                                    <li class="nav-item">
                                        <a class="nav-link link text-white display-4" href="Homepage">
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
                                        <a class="nav-link link text-white display-4" >
                                            <span class="mbri-search mbr-iconfont mbr-iconfont-btn"></span>
                                            About Us
                                        </a>
                                    </li>
                                </ul>
                             </div>
                      </nav>
                </section>
                      
                <section class=" mbr-fullscreen" style={{backgroundImage: `url(${Background})`}}>
                    <div class="mbr-overlay" style={{opacity: 0.8, backgroundColor: "#232323"}}>
                    </div>
                    <div class="container">
                        <div class="col-6 ">
                        <CanvasJSChart options = {options} 
                            /* onRef={ref => this.chart = ref} */
                        />
                        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
                        </div>
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
    };
};

export default dashboard;