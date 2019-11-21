import React, { Component } from 'react';
import axios from 'axios';
import Select, { components } from 'react-select';
import Background from '../../assets/images/bk_hp.jpg';
import CanvasJSReact from '../../assets/canvas/canvasjs.react';
var Logo = require('../../assets/images/logo-mzt.png');

class Sponsor extends React.Component {
    handleClickBack = () => {
        this.props.history.push('/homepage');
    };

    render() {     
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
                
                <section class=" mbr-fullscreen" style={{backgroundImage: `url(${Background})`}}>
                    <div class="mbr-overlay" style={{opacity: 0.8, backgroundColor: "#232323"}}>
                    </div>

                    <div class="container">

                    </div>
                </section>
                </body>
                );
        }
        
    };


export default Sponsor;
