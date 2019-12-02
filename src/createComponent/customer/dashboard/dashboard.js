import React, { Component } from 'react';
import axios from 'axios';
import Select, { components } from 'react-select';
import '../../../assets/web/assets/mobirise-icons/mobirise-icons.css';
import '../../../assets/bootstrap/css/bootstrap.min.css';
import '../../../assets/bootstrap/css/bootstrap-grid.min.css';
import '../../../assets/bootstrap/css/bootstrap-reboot.min.css';
import '../../../assets/tether/tether.min.css';
import '../../../assets/dropdown/css/style.css';
import '../../../assets/theme/css/style.css';
import './style.css';
import '../../../assets/mobirise/css/mbr-additional.css';
import Background from '../../../assets/images/bk_hp.jpg';
import CanvasJSReact from '../../../assets/canvas/canvasjs.react';
import moment from 'moment';
import { Badge } from '@material-ui/core';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var Logo = require('../../../assets/images/logo-mzt.png');

class Dashboard extends React.Component {
    state = {
        customer:'5dc53fb7717676384459fe63',
        programs: [],
        measurements: [],
        dickson: [],
        points: {
            "totalPoints": null,
            "totalEarned": null,
            "totalRedeemed": null
        },
        badges:null
    
    };
    
    handleClickBack = () => {
        this.props.history.push('/Homepage');
    }
    componentDidMount(){
        axios.get(`http://localhost:8080/performance/getPerformanceIndicators/`+this.state.customer)
    .then(res => {
        const badges = res.data;
        console.log(badges);
        if (!badges) {
            console.log("HERE");
            this.setState({ open: true });
        } 
        else {
            console.log('badges: '+badges);
            this.setState({ badges });
        }
    })
    .catch(e => {
        console.log(e);
    });
    
    axios.get(`http://localhost:8080/program/getProgramByCustomerId/`+this.state.customer)
        .then(res => {
            const programs = res.data;
            console.log(programs);
            if (!programs.length) {
                console.log("HERE");
                this.setState({ open: true });
            } 
            else {
                this.setState({ programs }, ()=>{
                    programs.map(program => {
                        if(program.status === "IN_PROGRESS"){
                            axios.get(`http://localhost:8080/customer/getCustomerMeasurementsById`,
                            {
                                params: {
                                    "customer_id":this.state.customer,
                                    "program_id":program._id
                                }
                            })
                            .then(res => {
                                const measurements = res.data;
                                console.log("request",res.data);
                                this.setState({ measurements });
                            }
                            )
                        }
                    })
                });
                
            }

        })
        .catch(e => {
            console.log(e);
        });
    
    axios.get(`http://localhost:8080/offerTransaction/getTotalPoints/`+this.state.customer)
        .then(res => {
            const points = res.data;
            this.setState({points});
        });
    
    };
    

    render() {
        const { customers, open, measurements, badges, programs } = this.state;
        console.log(open);
        const programList1 = [];
        const programList2 = [];
        const programList3 = [];
        const programList4 = [];
        const programLists = [];
        console.log("Programs:" +programs)
        programs.map(Program =>{
            if(Program.status == "ASSIGNED"){
                console.log("ASSIGNED: "+Program.title)
                programList1.push(Program);
            }
            if(Program.status == "IN_PROGRESS"){
                console.log("IN_PROGRESS: "+Program.title)
                programList2.push(Program);
            }
            if(Program.status == "COMPLETED"){
                console.log("COMPLETED: "+Program.title)
                programList3.push(Program);
            }
            if(Program.status == "CANCELED"){
                programList4.push(Program);
            }
        });
        
        var test1 = [];
        var test2 = [];
        var test3 = [];
        console.log('badges: '+badges);
        //badges.map((Badge, index) => {
          //  
        //})
        if(badges){
            console.log('badges CntSession: '+badges.cntSession.displayIndc);
            if(badges.cntSession.displayIndc === "TRUE"){
                test1.push(
                    <div class="card" style={{width: "33%", color: "green"}}>
                        <div class="panel-item p-3">
                            <div class="card-img pb-3">
                                <span class="mbr-iconfont pr-2 mbri-star" style={{fontSize: "80px"}}></span>
                                <h3 class="count py-3 mbr-fonts-style display-2">
                                    {badges.cntSession.indc}
                                </h3>
                            </div>
                            <div class="card-text">
                                <p class="mbr-content-text mbr-fonts-style display-7 align-center">
                                    {badges.cntSession.msg}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            }
            if(badges.dicksonIndcImprove.displayIndc === "TRUE"){
                test1.push(
                    <div class="card" style={{width: "33%", color: "green"}}>
                        <div class="panel-item p-3">
                            <div class="card-img pb-3">
                                <span class="mbr-iconfont pr-2 mbri-hearth" style={{fontSize: "80px"}}></span>
                                <h3 class="count py-3 mbr-fonts-style display-2">
                                    {badges.dicksonIndcImprove.indc}
                                </h3>
                            </div>
                            <div class="card-text">
                                <p class="mbr-content-text mbr-fonts-style display-7 align-center">
                                    {badges.dicksonIndcImprove.msg}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            }
            else{
                test1.push(
                    <div class="card" style={{width: "33%", color: "red"}}>
                        <div class="panel-item p-3">
                            <div class="card-img pb-3">
                                <span class="mbr-iconfont pr-2 mbri-hearth" style={{fontSize: "80px"}}></span>
                                <h3 class="count py-3 mbr-fonts-style display-2">
                                    {badges.dicksonIndcImprove.indc}
                                </h3>
                            </div>
                            <div class="card-text">
                                <p class="mbr-content-text mbr-fonts-style display-7 align-center">
                                    For dickson metric, You need work harder!
                                </p>
                            </div>
                        </div>
                    </div>
                );
            }
            if(badges.planksImprove.displayIndc === "TRUE"){
                test1.push(
                    <div class="card" style={{width: "33%", color: "green"}}>
                        <div class="panel-item p-3">
                            <div class="card-img pb-3">
                                <span class="mbr-iconfont pr-2 mbri-paper-plane" style={{fontSize: "80px"}}></span>
                                <h3 class="count py-3 mbr-fonts-style display-2">
                                    {badges.planksImprove.indc}
                                </h3>
                            </div>
                            <div class="card-text">
                                <p class="mbr-content-text mbr-fonts-style display-7 align-center">
                                    {badges.planksImprove.msg}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            }
            else{
                test1.push(
                    <div class="card" style={{width: "33%", color: "red"}}>
                        <div class="panel-item p-3">
                            <div class="card-img pb-3">
                                <span class="mbr-iconfont pr-2 mbri-paper-plane" style={{fontSize: "80px"}}></span>
                                <h3 class="count py-3 mbr-fonts-style display-2">
                                    {badges.planksImprove.indc}
                                </h3>
                            </div>
                            <div class="card-text">
                                <p class="mbr-content-text mbr-fonts-style display-7 align-center">
                                    For planks, You need work harder !
                                </p>
                            </div>
                        </div>
                    </div>
                );
            }
            if(badges.lungesImprove.displayIndc === "TRUE"){
                test2.push(
                    <div class="card" style={{width: "33%", color: "green"}}>
                        <div class="panel-item p-3">
                            <div class="card-img pb-3">
                                <span class="mbr-iconfont pr-2 mbri-speed" style={{fontSize: "80px"}}></span>
                                <h3 class="count py-3 mbr-fonts-style display-2">
                                    {badges.lungesImprove.indc}
                                </h3>
                            </div>
                            <div class="card-text">
                                <p class="mbr-content-text mbr-fonts-style display-7 align-center">
                                    {badges.lungesImprove.msg}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            }
            else{
                test2.push(
                    <div class="card" style={{width: "33%", color: "red"}}>
                        <div class="panel-item p-3">
                            <div class="card-img pb-3">
                                <span class="mbr-iconfont pr-2 mbri-speed" style={{fontSize: "80px"}}></span>
                                <h3 class="count py-3 mbr-fonts-style display-2">
                                    {badges.lungesImprove.indc}
                                </h3>
                            </div>
                            <div class="card-text">
                                <p class="mbr-content-text mbr-fonts-style display-7 align-center">
                                    For badges, You need work harder !
                                </p>
                            </div>
                        </div>
                    </div>
                );
            }
            if(badges.crunchesImprove.displayIndc === "TRUE"){
                test2.push(
                    <div class="card" style={{width: "33%", color: "green"}}>
                        <div class="panel-item p-3">
                            <div class="card-img pb-3">
                                <span class="mbr-iconfont pr-2 mbri-alert" style={{fontSize: "80px"}}></span>
                                <h3 class="count py-3 mbr-fonts-style display-2">
                                    {badges.crunchesImprove.indc}
                                </h3>
                            </div>
                            <div class="card-text">
                                <p class="mbr-content-text mbr-fonts-style display-7 align-center">
                                    {badges.crunchesImprove.msg}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            }
            else{
                test2.push(
                    <div class="card" style={{width: "33%", color: "red"}}>
                        <div class="panel-item p-3">
                            <div class="card-img pb-3">
                                <span class="mbr-iconfont pr-2 mbri-alert" style={{fontSize: "80px"}}></span>
                                <h3 class="count py-3 mbr-fonts-style display-2">
                                    {badges.crunchesImprove.indc}
                                </h3>
                            </div>
                            <div class="card-text">
                                <p class="mbr-content-text mbr-fonts-style display-7 align-center">
                                    For crunches, You need work harder !
                                </p>
                            </div>
                        </div>
                    </div>
                );
            }
            if(badges.pushupsImprove.displayIndc === "TRUE"){
                test2.push(
                    <div class="card" style={{width: "33%", color: "green"}}>
                        <div class="panel-item p-3">
                            <div class="card-img pb-3">
                                <span class="mbr-iconfont pr-2 mbri-paperclip" style={{fontSize: "80px"}}></span>
                                <h3 class="count py-3 mbr-fonts-style display-2">
                                    {badges.pushupsImprove.indc}
                                </h3>
                            </div>
                            <div class="card-text">
                                <p class="mbr-content-text mbr-fonts-style display-7 align-center">
                                    {badges.pushupsImprove.msg}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            }
            else{
                test2.push(
                    <div class="card" style={{width: "33%", color: "red"}}>
                        <div class="panel-item p-3">
                            <div class="card-img pb-3">
                                <span class="mbr-iconfont pr-2 mbri-paperclip" style={{fontSize: "80px"}}></span>
                                <h3 class="count py-3 mbr-fonts-style display-2">
                                    {badges.pushupsImprove.indc}
                                </h3>
                            </div>
                            <div class="card-text">
                                <p class="mbr-content-text mbr-fonts-style display-7 align-center">
                                    For Half push-ups, You need work harder !
                                </p>
                            </div>
                        </div>
                    </div>
                );
            }
            if(badges.squatsImprove.displayIndc === "TRUE"){
                test3.push(
                    <div class="card" style={{width: "33%", color: "green"}}>
                        <div class="panel-item p-3">
                            <div class="card-img pb-3">
                                <span class="mbr-iconfont pr-2 mbri-rocket" style={{fontSize: "80px"}}></span>
                                <h3 class="count py-3 mbr-fonts-style display-2">
                                    {badges.squatsImprove.indc}
                                </h3>
                            </div>
                            <div class="card-text">
                                <p class="mbr-content-text mbr-fonts-style display-7 align-center">
                                    {badges.squatsImprove.msg}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            }
            else{
                test3.push(
                    <div class="card" style={{width: "33%", color: "red"}}>
                        <div class="panel-item p-3">
                            <div class="card-img pb-3">
                                <span class="mbr-iconfont pr-2 mbri-rocket" style={{fontSize: "80px"}}></span>
                                <h3 class="count py-3 mbr-fonts-style display-2">
                                    {badges.squatsImprove.indc}
                                </h3>
                            </div>
                            <div class="card-text">
                                <p class="mbr-content-text mbr-fonts-style display-7 align-center">
                                    For Squats, You need work harder !
                                </p>
                            </div>
                        </div>
                    </div>
                );
            }
            if(badges.tricepsImprove.displayIndc === "TRUE"){
                test3.push(
                    <div class="card" style={{width: "33%", color: "green"}}>
                        <div class="panel-item p-3">
                            <div class="card-img pb-3">
                                <span class="mbr-iconfont pr-2 mbri-edit2" style={{fontSize: "80px"}}></span>
                                <h3 class="count py-3 mbr-fonts-style display-2">
                                    {badges.tricepsImprove.indc}
                                </h3>
                            </div>
                            <div class="card-text">
                                <p class="mbr-content-text mbr-fonts-style display-7 align-center">
                                    {badges.tricepsImprove.msg}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            }
            else{
                test3.push(
                    <div class="card" style={{width: "33%", color: "red"}}>
                        <div class="panel-item p-3">
                            <div class="card-img pb-3">
                                <span class="mbr-iconfont pr-2 mbri-edit2" style={{fontSize: "80px"}}></span>
                                <h3 class="count py-3 mbr-fonts-style display-2">
                                    {badges.tricepsImprove.indc}
                                </h3>
                            </div>
                            <div class="card-text">
                                <p class="mbr-content-text mbr-fonts-style display-7 align-center">
                                    For triceps, You need work harder !
                                </p>
                            </div>
                        </div>
                    </div>
                );
            }
            if(badges.lastChallengePtsEarned.displayIndc === "TRUE"){
                test3.push(
                    <div class="card" style={{width: "33%", color: "green"}}>
                        <div class="panel-item p-3">
                            <div class="card-img pb-3">
                                <span class="mbr-iconfont pr-2 mbri-cash" style={{fontSize: "80px"}}></span>
                                <h3 class="count py-3 mbr-fonts-style display-2">
                                    {badges.lastChallengePtsEarned.indc}
                                </h3>
                            </div>
                            <div class="card-text">
                                <p class="mbr-content-text mbr-fonts-style display-7 align-center">
                                    {badges.lastChallengePtsEarned.msg}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            }
        }
        

        var measurementsData = [];
        if(measurements){
            for (let i = 0; i < measurements.length; i++){
                measurementsData.push({ 'label': moment(measurements[i].measurement_date).format("YYYY-MM-DD"), 
                        y: measurements[i].dickson_metric, indexLabel: measurements[i].coach_feedback});
            }
        }
        console.log("data ",measurementsData);
        const options = {
            animationEnabled: true,
            exportEnabled: true,
            theme: "dark1", // "light1", "dark1", "dark2"
            title:{
                text: "Dickson Indicator of Focus Session"
            },
            axisY: {
                title: "Dickson Indicator",
                includeZero: false,
                interval: 0.25
            },
            axisX: {
                title: "Measurement Date of Focus Session",
                interval: 1
            },
            data: [{
                type: "line",
                dataPoints: measurementsData
            }]
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
                            <a class="nav-link link text-white display-4" onClick={()=>this.props.history.push('/challenge/'+this.state.customer)}>
                                <span class="mbri-chat mbr-iconfont mbr-iconfont-btn"></span>
                                Challenge
                            </a>
                        </li>
                    </ul>
                </div>
          </nav>
        </section>
        <section class=" mbr-fullscreen" style={{backgroundImage: `url(${Background})`}}>
            <div class="mbr-overlay" style={{opacity: 0.8, backgroundColor: "#232323"}}/>
            <div class="container"> 
            <br/>
                <div class="align-center">
                    <h1 style={{color:"#FFFFFF", marginleft:"20px"}}> Dashboard </h1>
                    <h3 style={{color:"#FFFFFF", marginleft:"20px"}}>> Let's see what is happening for you!</h3>
                </div>
                <br/>
                <div class="media-container-row"> 
                    <div class="containerc" style={{marginRight: "20px"}}>
                        <div class="cardc">
                            <div class="front">
                                <div class="contentfront">
                                    <div class="month">
                                        <table>
                                            <tr class="orangeTr">
                                                <th>M</th>
                                                <th>T</th>
                                                <th>W</th>
                                                <th>T</th>
                                                <th>F</th>
                                                <th>S</th>
                                                <th>S</th>
                                            </tr>
                                            <tr class="whiteTr">
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                                <th>1</th>
                                            </tr>
                                            <tr class="whiteTr">
                                                <th>2</th>
                                                <th>3</th>
                                                <th style={{fontWeight: "bold"}}>4</th>
                                                <th>5</th>
                                                <th>6</th>
                                                <th>7</th>
                                                <th>8</th>
                                            </tr>
                                            <tr class="whiteTr">
                                                <th>9</th>
                                                <th>10</th>
                                                <th>11</th>
                                                <th>12</th>
                                                <th>13</th>
                                                <th>14</th>
                                                <th>15</th>
                                            </tr>
                                            <tr class="whiteTr">
                                                <th>16</th>
                                                <th>17</th>
                                                <th>18</th>
                                                <th>19</th>
                                                <th>20</th>
                                                <th>21</th>
                                                <th>22</th>
                                            </tr>
                                            <tr class="whiteTr">
                                                <th>23</th>
                                                <th>24</th>
                                                <th>25</th>
                                                <th>26</th>
                                                <th>27</th>
                                                <th>28</th>
                                                <th>29</th>
                                            </tr>
                                            <tr class="whiteTr">
                                                <th>30</th>
                                                <th>31</th>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                            </tr>
                                        </table>
                                    </div>
                                    <div class="date">
                                        <div class="datecont">
                                            <div id="day">December</div>
                                            <div id="month">Wedn, 4th</div>
                                                <i class="fa fa-pencil edit" aria-hidden="true"></i>
                                                <br/> <br/> <br/> <br/>
                                            <div id="month" style={{fontWeight:'bold'}}>> You have a session today</div>
                                                <br/> <br/> 
                                            <div id="month">> You have a session coming in 2 days</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{marginLeft:'20px'}}>
                        <h1 style={{color:"#FFFFFF", marginTop:'5px', marginLeft:'5px', marginRight:'5px', width:"300%"}}>Details</h1>
                        <h6 style={{color:"#FFFFFF",marginLeft:'5px',width:"100%" }}> personal details to add</h6>
                    <div class="card-box" style={{backgroundColor: "#232227", width: '108%'}} >
                        <div class="display-inline row"	>
                            {programList1.map((program) => {
                                programLists.push(
                                    <div class="card" style={{backgroundColor: "#E76642", marginLeft:'20px', width:"100px"}}>
                                        <p style={{fontFamily:"bold", color:"#FFFFFF", marginTop:'5px', marginLeft:'5px', marginRight:'5px'}}>PROGRAM ASSIGNED</p> <br/>
                                        <p style={{color:"#FFFFFF", marginLeft:'5px'}}>{program.title}</p>
                                    </div>    
                                )})
                            }
                            
                            {programList2.map((program) => {
                                programLists.push(
                                    <div class="card" style={{backgroundColor: "olive", marginLeft:'20px', width:"100px"}}>
                                        <p style={{fontFamily:"bold", color:"#FFFFFF", marginTop:'5px', marginLeft:'5px', marginRight:'5px'}}>PROGRAM IN PROGRESS</p>
                                        <p style={{color:"#FFFFFF", marginLeft:'5px'}}>{program.title}</p>
                                    </div>   
                                )}) 
                            }
                            {programList3.map((program) => {
                                programLists.push(
                                    <div class="card" style={{backgroundColor: "green", marginLeft:'20px', width:"100px"}}>
                                        <p style={{fontFamily:"bold", color:"#FFFFFF", marginTop:'5px', marginLeft:'5px', marginRight:'5px'}}>PROGRAM COMPLETED</p>
                                        <p style={{color:"#FFFFFF", marginLeft:'5px'}}>{program.title}</p>
                                    </div>   
                                )}) 
                            }
                            {programList4.map((program) => {
                                programLists.push(
                                    <div class="card" style={{backgroundColor: "red", marginLeft:'20px', width:"100px"}}>
                                        <p style={{fontFamily:"bold", color:"#FFFFFF", marginTop:'5px', marginLeft:'5px', marginRight:'5px'}}>PROGRAM CANCELED</p>
                                        <p style={{color:"#FFFFFF", marginLeft:'5px'}}>{program.title}</p>
                                    </div>   
                                )}) 
                            }
                        {programLists}
                        </div>
                    </div>
                    </div>
                </div>
        <br/>
        <div class="align-center">
        <div class="media-block" style={{color: "#FFFFFF"}}>
            <h4 class="mbr-section-title pb-3 mbr-fonts-style display-2">Dickson Indicator</h4>
            <h5 class="mbr-section-subtitle pb-5 mbr-fonts-style display-5">
                It is a physical test that assesses a person's fitness for sport.<br/>
                It will define what is called an athletic heart and an insufficient heart.
            </h5>
            <h6>
                0 = excellent<br/>
                0 to 2 = very good<br/>
                4 to 6 = medium<br/>
                10 poor adaptation
            </h6>
            <CanvasJSChart options = {options} />
        </div>
        </div>
        <br/><br/>
        <div class="cards-block">
                <div class="cards-container media-container-row">
                    {test1}
                </div>
                <div class="cards-container media-container-row">
                    {test2}
                </div>
                <div class="cards-container media-container-row">
                    {test3}
                </div>
            </div>
    <br/><br/>



    <div class="card-box centerize"  >
        
            <h5 style={{color:"#FFFFFF"}}>You currently have {this.state.points.totalPoints} points!</h5> 
            <br/>
            <button type="button" class="btn " role="button" aria-pressed="true" style={{color:"#FFFFFF", backgroundColor:"#E7505A"}}
            onClick={()=>{this.props.history.push('/Challenge/'+this.state.customer)}}>
            <span class="mbrib-arrow-prev mbr-iconfont mbr-iconfont-btn"/>
            Check your challenge page !
            </button>
        
    </div>
    <br/><br/>
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
    };

export default Dashboard;