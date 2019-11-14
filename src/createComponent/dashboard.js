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


var Logo = require('../assets2/images/logo-mzt.png');

class dashboard extends React.Component {
    state = {
        customer:'5da86562f964d02c2c679155',
        programs: []
    };
    
    handleClickBack = () => {
        this.props.history.push('/Homepage');
    }
    componentDidMount(){
    axios.get(`http://localhost:8080/program/getProgramByCustomerId/5da86562f964d02c2c679155`)
        .then(res => {
            const programs = res.data;
            console.log(programs);
            if (!programs) {
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
    };

    render() {
       
        const { customers, open } = this.state;
        console.log(open);
        const programList1 = [];
        const programList2 = [];
        const programLists = [];
        this.state.programs.map(Program =>{
            if(Program.status == "ASSIGNED"){
                programList1.push(Program);
            }
        });
        this.state.programs.map(Program =>{
            if(Program.status == "IN_PROGRESS"){
                programList1.push(Program);
            }
        });
        this.state.programs.map(Program =>{
            if(Program.status == "COMPLETED"){
                programList2.push(Program);
            }
        });
        this.state.programs.map(Program =>{
            if(Program.status == "CANCELED"){
                programList2.push(Program);
            }
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
                    <div class="container ">
                    <br/>       
                <h1 style={{color:"#FFFFFF"}}> Dashboard </h1>
                <h3 style={{color:"#FFFFFF"}}> Let's see what is happening for you!</h3>
                <br/><br/>
                    
                    <div class="card-box col-4 " style={{backgroundColor: "#FFFFFF",display:"inline-block", height:"300px"}} >
                            <div class="row">
                                        <h1>Graph indicator</h1>
                            </div>
                    </div>
                    <div style={{opacity: 0,display:"inline-block"}} >
                            <h1>SPACESP</h1>
                    </div>
                    <div class="card-box col-3" style={{backgroundColor: "#2C2C2C",display:"inline-block"}} >
                            <div class="row">
                                <h1 style={{color:"#FFFFFF", marginTop:'5px', marginLeft:'5px'}}>Details</h1>
                                <h4 style={{color:"#FFFFFF",marginLeft:'5px'}}> personnal details of the customer</h4>


                {programList1.map((program) => {
                    programLists.push(<div class="card" style={{backgroundColor: "#5FE164", height:"200px",width:"50%",marginLeft:'5px'}}>
                                    <p style={{fontFamily:"bold", color:"#FFFFFF"}}>SESSION IN PROGRESS</p>
                                    <p style={{color:"#FFFFFF"}}>{program.title}</p>
                                </div>   
                                )}) 
            }
            {programList2.map((program) => {
                
                programLists.push(<div class="card" style={{backgroundColor: "#FFFFFF", height:"200px",width:"80px"}}>
                                <p>Session completed</p> <br/>
                                    <p>{program.title}</p>
                                </div> 
                    
                )})
            }
            {programLists}

            </div>
                    </div>
                    <br/><br/>
                    <div style={{opacity: 0,display:"inline-block"}} >
                            <h1>SPACESP</h1>
                    </div>
                    <div class="card-box " style={{backgroundColor: "#FFFFFF",display:"inline-block", width: "500px",height:"150px"}} >
                            <div class="row">
                                        <h1 style={{marginLeft:"15px"}}>Reward section (Challenges)</h1>
                            </div>
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
        }
        
    };


export default dashboard;
