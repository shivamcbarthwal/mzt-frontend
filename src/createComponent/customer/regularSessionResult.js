import React, { Component } from 'react';
import axios from 'axios';
import '../../assets/web/assets/mobirise-icons/mobirise-icons.css';
import '../../assets/bootstrap/css/bootstrap.min.css';
import '../../assets/bootstrap/css/bootstrap-grid.min.css';
import '../../assets/bootstrap/css/bootstrap-reboot.min.css';
import '../../assets/tether/tether.min.css'
import '../../assets/dropdown/css/style.css'
import '../../assets/theme/css/style.css'
import '../../assets/mobirise/css/mbr-additional.css'
var Logo = require('../../assets/images/logo-mzt.png');
const cust_id = '5da86562f964d02c2c679155'

class RegularSessionResult extends React.Component {
    state = {
        exercises: null,
        sessions: null
    }

    componentDidMount() {
        console.log("Query", this.props.location);
        const index = Number(this.props.location.search.slice(1).split("=")[1]);
        console.log("Index", index);
        axios.get(`http://localhost:8080/program/getProgramById/${this.props.match.params.programID}`)
            .then(res => {
                const program = res.data;
                this.setState({
                    exercises: program.sessions[index].exercises,
                    sessions: program.sessions
                });
                console.log('prog',program);
            }
        )
    }

    handleClickBack = () => {
        this.props.history.push(`/listOfSessions/${this.props.match.params.programID}`);
    }

    render() {
        const {exercises} = this.state;
        var optionsExercise = [];
        if(exercises){
            exercises.map((exerciseId) => {
                optionsExercise.push(<li>{exerciseId.name}: {exerciseId.repetition} x {exerciseId.sets} sets for {exerciseId.time}s</li>)
            });
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
                            </ul>
                        </div>
                    </nav>
                </section>
                
                <section class="header10 cid-endFocusSession mbr-fullscreen mbr-parallax-background" id="header10-o">
                    <div class="mbr-overlay">
                    </div>

                    <div class="container">
                        <h2 class="align-left mbr-white mbr-fonts-style m-0 display-1">
                            <br/> Congratulations! <br/> Your session results:
                        </h2>
                        <br/>
                        <div class=" media-container-column col-lg-8 pb-3 col-md-10" style={{border: "2px solid white", background: "white", opacity: 0.8}}>
                            <div class="cid-rFD0NwyLkn">
                                <div class="counter-container col-12 col-md-18 display-5">
                                    <ul>
                                        {optionsExercise}
                                    </ul>
                                </div>
                            </div>
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

export default RegularSessionResult;
