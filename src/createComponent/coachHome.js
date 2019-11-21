import React, { Component } from 'react';
import '../assets/web/assets/mobirise-icons/mobirise-icons.css';
import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/bootstrap/css/bootstrap-grid.min.css';
import '../assets/bootstrap/css/bootstrap-reboot.min.css';
import '../assets/tether/tether.min.css';
import '../assets/dropdown/css/style.css';
import '../assets/theme/css/style.css';
import '../assets/mobirise/css/mbr-additional.css';
var Logo = require('../assets/images/logo-mzt.png');

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
                                    <a href="/">
                                        <img src= {Logo}/>
                                    </a>
                                </span>
                                <span class="navbar-caption-wrap">
                                    <a class="navbar-caption text-white display-4" href="/">
                                        MZT FITNESS
                                    </a>
                                </span>
                            </div>
                        </div>
                    </nav>
                </section>
                <section class="cid-rFCUpdpwBS mbr-fullscreen">
                    <div class="mbr-overlay" style={{opacity: 0.8, backgroundColor: "#232323"}}/>
                    <div class="container align-center">
                        <div class="mbr-white centerize">
                            <br/><br/><br/>
                            <a class="btn btn-white-outline" href="visualizeExercise">EXERCISES </a>
                            <a class="btn btn-white-outline" href="visualizeSession">SESSIONS </a>
                            <a class="btn btn-white-outline" href="visualizeProgram">PROGRAMS </a> 
                            <a class="btn btn-white-outline" href="customerList">CUSTOMERS</a>
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
                <script src="assets/theme/js/script.js"></script>
            </body>
        )
    }
}
