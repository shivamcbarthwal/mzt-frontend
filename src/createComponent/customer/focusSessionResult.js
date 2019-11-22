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

class FocusSessionResult extends React.Component {
    state = {
        measurements: null,
        exercises: null,
        sessions: null
    }

    componentDidMount() {
        axios.get(`http://localhost:8080/customer/getCustomerMeasurementsById`,
            {
                params: {
                    "customer_id":"5dc541fb717676384459fe66",
                    "program_id":"5dcb2cd4fe74df22bc65702a"
                }
            }
        )
        .then(res => {
            const measurements = res.data;
            console.log('meas',res.data);
            this.setState({measurements});
        }
        )
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
        const {measurements, exercises} = this.state;
        var optionsMeasurement = [];
        var optionsExercise = [];
        if (measurements) {
            optionsMeasurement.push(measurements[measurements.length - 1].dickson_metric);
        }
        if(exercises){
            this.state.exercises.map((exerciseId) => {
                if (exerciseId.set_type === 'TIME'){
                    optionsExercise.push(<li>{exerciseId.result} {exerciseId.name}</li>)
                }
                if (exerciseId.set_type === 'REPETITION'){
                    optionsExercise.push(<li>{exerciseId.result} {exerciseId.name}</li>)
                }
                if (exerciseId.set_type === 'TIME_REPETITION'){
                    optionsExercise.push(<li>{exerciseId.result} {exerciseId.name}</li>)
                }
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
                            <h4 class="mbr-section align-center mbr-bold align-left mbr-light pb-3 mbr-fonts-style display-5">
                                Dickson indicator: {optionsMeasurement} <br/><br/>Very good!
                            </h4>
                        </div>
                        <br/>
                        <div class=" media-container-column col-lg-8 pb-3 col-md-10" style={{border: "2px solid white", background: "white", opacity: 0.8}}>
                            <h3 class="mbr-section align-left mbr-light pb-3 mbr-fonts-style display-6">
                                <br/> Coach feedback:
                            </h3>
                            <p>
                                No feedback yet.
                            </p>
                        </div>
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

export default FocusSessionResult;