import React, { Component } from 'react'
import '../assets2/web/assets/mobirise-icons/mobirise-icons.css';
import '../assets2/bootstrap/css/bootstrap.min.css';
import '../assets2/bootstrap/css/bootstrap-grid.min.css';
import '../assets2/bootstrap/css/bootstrap-reboot.min.css';
import '../assets2/tether/tether.min.css';
import '../assets2/dropdown/css/style.css';
import '../assets2/theme/css/style.css';
import '../assets2/mobirise/css/mbr-additional.css';
import '../assets2/mobirise/css/mbr-additional.css';
var Logo = require('../assets2/images/logo-mzt.png');

export default class CoachHome extends Component {
    render() {
        return (
        
                    <body>
                       
    <section class="menu cid-rFxS6PmLUN" id="menu1-r">
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
                    <span class="navbar-caption-wrap"><a class="navbar-caption text-white display-4" href="https://mobirise.com">
                            MZT FITNESS</a></span>
                </div>
            </div>
            {/* <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav nav-dropdown nav-right" data-app-modern-menu="true">
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
            </div> */}
        </nav>
    </section>
    

    <section class="cid-rFCUpdpwBS mbr-fullscreen">
        <div class="mbr-overlay" style={{opacity: 0.8, backgroundColor: "#232323"}}> 
            </div>
                <div class="container align-center">
                    <div class="mbr-white centerize">
                    <br /><br /><br />
                            <a class="btn btn-white-outline" href="visualizeProgram">PROGRAMS </a> 
 
                            <a class="btn btn-white-outline" href="customerList">CUSTOMERS</a>
                    </div>
        </div>    
    </section>

  <script src="assets2/web/assets/jquery/jquery.min.js"></script>
  <script src="assets2/popper/popper.min.js"></script>
  <script src="assets2/bootstrap/js/bootstrap.min.js"></script>
  <script src="assets2/tether/tether.min.js"></script>
  <script src="assets2/smoothscroll/smooth-scroll.js"></script>
  <script src="assets2/dropdown/js/nav-dropdown.js"></script>
  <script src="assets2/dropdown/js/navbar-dropdown.js"></script>
  <script src="assets2/touchswipe/jquery.touch-swipe.min.js"></script>
  <script src="assets2/theme/js/script.js"></script>
    </body>

        )
    }
}
