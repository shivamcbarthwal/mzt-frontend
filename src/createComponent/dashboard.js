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
    handleClickBack = () => {
        this.props.history.push('/Homepage');
    }
    render() {
        return (
                <body onLoad="startTime()">
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
                                            MZT FITNESS</a></span>
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
                                        <a class="nav-link link text-white display-4" href="https://mobirise.com">
                                            <span class="mbri-search mbr-iconfont mbr-iconfont-btn"></span>
                                            About Us
                                        </a>
                                    </li>
                                </ul>
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
                                        <img src= {Logo}/>
                                    </a>
                                </span>
                                <span class="navbar-caption-wrap">
                                    <a class="navbar-caption text-white display-4" href="/Homepage">
                                        MZT FITNESS
                                    </a>
                                </span>
                            </div>
                        </div>
                
                        <div class=" align-center">
                            
                            <div class="card-box" style={{backgroundColor: "#FFFFFF", width:"50%", height:"200px"}}>
                                <div class="card-body"> 
                                <h5 class="card-title">Dikson Indicator graph</h5>  
                                    <p>GRAPH</p>
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
}
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav nav-dropdown nav-right" data-app-modern-menu="true">
                                <li class="nav-item">
                                    <a class="nav-link link text-white display-4" href="/Homepage">
                                        <span class="mbri-home mbr-iconfont mbr-iconfont-btn"/>
                                        Home page
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link link text-white display-4" href="community_page.html">
                                        <span class="mbri-chat mbr-iconfont mbr-iconfont-btn"/>
                                        Community
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link link text-white display-4" href="https://mobirise.com">
                                        <span class="mbri-search mbr-iconfont mbr-iconfont-btn"/>
                                        About Us
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </section>
                <section class=" mbr-fullscreen" style={{backgroundImage: `url(${Background})`}}>
                    <div class="mbr-overlay" style={{opacity: 0.8, backgroundColor: "#232323"}}/>
                    <div class="container align-center">
                        <div class="mbr-white centerize">
                            <p class="">Dash Board</p>
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