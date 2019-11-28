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
        customer:'5dc541fb717676384459fe66',
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
                this.setState({ programs });
            }
        })
        .catch(e => {
            console.log(e);
        });
    axios.get(`http://localhost:8080/customer/getCustomerMeasurementsById`,
        {
            params: {
                "customer_id":this.state.customer,
                "program_id":"5dcb2cd4fe74df22bc65702a"
            }
        })
        .then(res => {
            const measurements = res.data;
            console.log("request",res.data);
            this.setState({ measurements });
          }
        )
    axios.get(`http://localhost:8080/offerTransaction/getTotalPoints/`+this.state.customer)
        .then(res => {
            const points = res.data;
            this.setState({points});
        });
    
    };
    

    render() {
        const { customers, open, measurements, badges } = this.state;
        console.log(open);
        const programList1 = [];
        const programList2 = [];
        const programLists = [];
        this.state.programs.map(Program =>{
            if(Program.status == "ASSIGNED"){
                programList1.push(Program);
            }
            if(Program.status == "IN_PROGRESS"){
                programList1.push(Program);
            }
            if(Program.status == "COMPLETED"){
                programList2.push(Program);
            }
            if(Program.status == "CANCELED"){
                programList2.push(Program);
            }
        });
        
        var test = [];
        console.log('badges: '+badges);
        //badges.map((Badge, index) => {
          //  
        //})
        if(badges){
            console.log('badges CntSession: '+badges.cntSession.displayIndc);
            if(badges.cntSession.displayIndc === "TRUE"){
                test.push(badges.cntSession.msg);
            }
            if(badges.dicksonIndcImprove.displayIndc === "TRUE"){
                test.push(badges.dicksonIndcImprove.msg);
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
            <div class="mbr-overlay" style={{opacity: 0.8, backgroundColor: "#232323"}}>
            </div>

            <div class="container"> 
            <br/> <br/> <br/><br/> <br/> <br/> 
            <div class="display-inline row"> 
                <div>
                    <h1 style={{color:"#FFFFFF", marginleft:"20px"}}> Dashboard </h1>
                    <h3 style={{color:"#FFFFFF", marginleft:"20px"}}>> Let's see what is happening for you!</h3>
                </div>
                <br/><br/>
                <div class="containerc" style={{marginLeft:"250px"}}>
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
                                                <th>1</th>
                                                <th>2</th>
                                                <th>3</th>
                                            </tr>
                                            <tr class="whiteTr">
            					 	<th>4</th>
            					   	<th>5</th>
            					   	<th>6</th>
            					   	<th>7</th>
            					   	<th>8</th>
            					   	<th>9</th>
            					   	<th>10</th>
            					</tr>
            					<tr class="whiteTr">
            					 	<th>11</th>
            					   	<th>12</th>
            					   	<th>13</th>
            					   	<th>14</th>
            					   	<th style={{fontWeight: "bold"}}>15</th>
            					   	<th>16</th>
            					   	<th>17</th>
            					</tr>
            					<tr class="whiteTr">
            					   	<th>18</th>
            					   	<th>19</th>
            					   	<th>20</th>
            					   	<th>21</th>
            					   	<th>22</th>
            					   	<th>23</th>
            					   	<th>24</th>
            					</tr>
            					<tr class="whiteTr">
            					 	<th>25</th>
            					   	<th>26</th>
            					   	<th>27</th>
            					   	<th>28</th>
            					   	<th>29</th>
            					   	<th>30</th>
            					   	<th></th>
            					</tr>
            				</table>
          				</div>
          				<div class="date">
            				<div class="datecont">
              					<div id="day">November</div>
              					<div id="month">Friday, 15th</div>
              						<i class="fa fa-pencil edit" aria-hidden="true"></i>
              						<br/> <br/> <br/> <br/>
              					<div id="month" style={{fontWeight:'bold'}}>> You have a session today</div>
              						<br/> <br/> 
              					<div id="month">> You have a session coming in 2 days</div>
            				</div>
          				</div>
        			</div>
      			</div>
      			<div class="back"></div>
    		</div>
  		</div>
        </div>
        <br/><br/><br/>  
    	<div>
            <div class="card-box" style={{backgroundColor: "#232227",width:"50%" }} >
            <h1 style={{color:"#FFFFFF", marginTop:'5px', marginLeft:'5px', marginRight:'5px', width:"300%"}}>Details</h1>
            <h6 style={{color:"#FFFFFF",marginLeft:'5px',width:"100%" }}> personal details to add</h6>
			<div class="display-inline row"	>
                {programList2.map((program) => {
            		programLists.push(
            			<div class="card" style={{backgroundColor: "#E76642", height:"200px",marginLeft:'20px', width:"100px"}}>
                            <p style={{fontFamily:"bold", color:"#FFFFFF", marginTop:'5px', marginLeft:'5px', marginRight:'5px'}}>SESSION COMPLETED</p> <br/>
                            <p style={{color:"#FFFFFF", marginLeft:'5px'}}>{program.title}</p>
                        </div>    
                	)})
            	}
                
                {programList1.map((program) => {
                    programLists.push(
                    	<div class="card" style={{backgroundColor: "#5FE164", height:"200px",marginLeft:'20px', width:"100px"}}>
                            <p style={{fontFamily:"bold", color:"#FFFFFF", marginTop:'5px', marginLeft:'5px', marginRight:'5px'}}>SESSION IN PROGRESS</p>
                            <p style={{color:"#FFFFFF", marginLeft:'5px'}}>{program.title}</p>
                        </div>   
                    )}) 
            	}
            	
        {programLists}
        </div>
        </div>
        <br/><br/><br/>
        <div class="centerize" style={{color:"#FFFFFF"}}>
                <h1 >Dickson Indicator</h1>
                
                <h6 >It is a physical test that assesses a person's fitness for sport.<br/>
                It will define what is called an athletic heart and an insufficient heart.<br/>
                </h6>
                <h6 style={{}}>
                0 = excellent<br/>
                0 to 2 = very good<br/>
                4 to 6 = medium<br/>
                10 poor adaptation
                </h6>
        </div>
        
        <div class=" centerize" style={{width:"50%"}}>
        
            <CanvasJSChart options = {options} 
            	/* onRef={ref => this.chart = ref} */
                />
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
    	    </div>
        </div>      
    
    <br/><br/>
    <div>
            <h5 style={{color:"#FFFFFF"}}>{test}</h5> 
    <br/>
            
    </div>

    <div class="card-box centerize"  >
        
            <h5 style={{color:"#FFFFFF"}}>You currently have {this.state.points.totalPoints} points!</h5> 
            <br/>
            <button type="button" class="btn " role="button" aria-pressed="true" style={{color:"#FFFFFF", backgroundColor:"#E7505A"}}>
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