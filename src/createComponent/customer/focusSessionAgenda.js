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
import { program } from '@babel/template';
var Logo = require('../../assets/images/logo-mzt.png');

class FocusSessionAgenda extends React.Component {
    state = {
        exercises: null,
        measurements: [],
        program: null,
        heartRates: {
            customer_id: '',
            program_id: '',
            session_id: '',
            heartRate1: '',
            heartRate2: '',
            heartRate3: ''
        },
        options:{
            weight: '',
            height: '',
            chest: '',
            arms: '',
            hips: '',
            thigh: '',
            waist: ''
        },
        index: null,
        focus: false
    }
    componentDidMount() {
        console.log("Query", this.props.location);
        const index = Number(this.props.location.search.slice(1).split("=")[1]);
        console.log("Index", index);
        axios.get(`http://localhost:8080/program/getProgramById/${this.props.match.params.programID}`)
            .then(res => {
                const program = res.data;
                const {focus, heartRates} = this.state;
                heartRates.customer_id = program.customer_id;
                heartRates.program_id = program._id;
                heartRates.session_id = program.sessions[index]._id;
                this.setState({exercises: program.sessions[index].exercises, heartRates});
                if (program.sessions[index].type === 'Weight loss'){
                    this.setState({focus: true});
                }
                this.setState({heartRates: {
                    customer_id: program.customer_id,
                    program_id: program._id,
                    session_id: program.sessions[index]._id
                }})
                console.log("focus",focus) 
                axios.get(`http://localhost:8080/customer/getCustomerMeasurementsById`,
                {
                    params: {
                        "customer_id": program.customer_id,
                        "program_id": program._id
                    }
                })
                .then(res => {
                    const measurements = res.data;
                    console.log('meas',res.data);
                    this.setState({measurements});
                }
            )   
        })
    }

    handleChange = (name, event) => {
        console.log(this.state.heartRates);
        this.setState({heartRates: {
                ...this.state.heartRates,
                [name]: event.target.value
        }});
        console.log(event.target);
    };

    handleSubmit = async event => {
        console.log('Testing')
        event.preventDefault();
        const {heartRates} = this.state;
        const response = await fetch(`http://localhost:8080/customer/addMeasurement`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                        // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(heartRates) // body data type must match "Content-Type" header
        });
        const index = Number(this.props.location.search.slice(1).split("=")[1]);
        this.props.history.push(`/focusSessionStartExercise/${this.props.match.params.programID}?sessionIndex=${index}`)

    }

    render() {
        const {measurements, focus, exercises} = this.state;
        var optionsMeasurements = [];
        var optionsMeasurement1 = [];
        var optionsMeasurement2 = [];
        var optionsMeasurement3 = [];
        var optionsMeasurementWeight = [];
        var optionsMeasurementHeight = [];
        var optionsMeasurementChest = [];
        var optionsMeasurementArms = [];
        var optionsMeasurementHips = [];
        var optionsMeasurementThigh = [];
        var optionsMeasurementWaist = [];
        if (measurements.length) {
            optionsMeasurement1.push("Previous: " + measurements[measurements.length - 1].heartRate1);
            optionsMeasurement2.push("Previous: " + measurements[measurements.length - 1].heartRate2);
            optionsMeasurement3.push("Previous: " + measurements[measurements.length - 1].heartRate3);
            optionsMeasurementWeight.push("Previous: " + measurements[measurements.length - 1].weight);
            optionsMeasurementHeight.push("Previous: " + measurements[measurements.length - 1].height);
            optionsMeasurementChest.push("Previous: " + measurements[measurements.length - 1].chest);
            optionsMeasurementArms.push("Previous: " + measurements[measurements.length - 1].arms);
            optionsMeasurementHips.push("Previous: " + measurements[measurements.length - 1].hips);
            optionsMeasurementThigh.push("Previous: " + measurements[measurements.length - 1].thigh);
            optionsMeasurementWaist.push("Previous: " + measurements[measurements.length - 1].waist);
        }
        if(focus){
            optionsMeasurements.push(
                <div>
                    <div data-for="message" class="col-md-12  form-group">
                        <label for="message" class="form-control-label mbr-fonts-style display-7">Weight:</label>
                        <input data-form-field="Message" placeholder={optionsMeasurementWeight} class="form-control display-7" id="phone-form1-2" onChange={(e) => this.handleChange('weight', e)}/>
                    </div>
                    <div data-for="message" class="col-md-12  form-group">
                        <label for="message" class="form-control-label mbr-fonts-style display-7">Height:</label>
                        <input data-form-field="Message" placeholder={optionsMeasurementHeight} class="form-control display-7" id="phone-form1-2" onChange={(e) => this.handleChange('height', e)}/>
                    </div>
                    <div data-for="message" class="col-md-12  form-group">
                        <label for="message" class="form-control-label mbr-fonts-style display-7">Arms:</label>
                        <input data-form-field="Message" placeholder={optionsMeasurementArms} class="form-control display-7" id="phone-form1-2" onChange={(e) => this.handleChange('arms', e)}/>
                    </div>
                    <div data-for="message" class="col-md-12  form-group">
                        <label for="message" class="form-control-label mbr-fonts-style display-7">Hips:</label>
                        <input data-form-field="Message" placeholder={optionsMeasurementHips} class="form-control display-7" id="phone-form1-2" onChange={(e) => this.handleChange('hips', e)}/>
                    </div>
                    <div data-for="message" class="col-md-12  form-group">
                        <label for="message" class="form-control-label mbr-fonts-style display-7">Chest:</label>
                        <input data-form-field="Message" placeholder={optionsMeasurementChest} class="form-control display-7" id="phone-form1-2" onChange={(e) => this.handleChange('chest', e)}/>
                    </div>
                    <div data-for="message" class="col-md-12  form-group">
                        <label for="message" class="form-control-label mbr-fonts-style display-7">Waist:</label>
                        <input data-form-field="Message" placeholder={optionsMeasurementWaist} class="form-control display-7" id="phone-form1-2" onChange={(e) => this.handleChange('waist', e)}/>
                    </div>
                    <div data-for="message" class="col-md-12  form-group">
                        <label for="message" class="form-control-label mbr-fonts-style display-7">Thigh:</label>
                        <input data-form-field="Message" placeholder={optionsMeasurementThigh} class="form-control display-7" id="phone-form1-2" onChange={(e) => this.handleChange('thigh', e)}/>
                    </div>
                </div>
            )
        }
        //!!!!!!!!!!!!!!! NEED TO CREATE A LOOP
        var optionsExercise = [];
        console.log('ex',exercises)
        if(exercises){
            this.state.exercises.map((exerciseId) => {
                if (exerciseId.set_type === 'TIME'){
                    optionsExercise.push(<li>{exerciseId.time}sec x {exerciseId.sets}: {exerciseId.name}</li>)
                }
                if (exerciseId.set_type === 'REPETITION'){
                    optionsExercise.push(<li>{exerciseId.repetition} x {exerciseId.sets}: {exerciseId.name}</li>)
                }
                if (exerciseId.set_type === 'TIME_REPETITION'){
                    optionsExercise.push(<li>{exerciseId.repetition} x {exerciseId.sets} for {exerciseId.time}sec: {exerciseId.name}</li>)
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
                
                    <section class="header9 cid-rFCsMVPnbl mbr-fullscreen mbr-parallax-background" id="header9-e">
                        <div class="mbr-overlay" style={{opacity: 0.8}}>
                        </div>
                
                        <div class="container">
                            <div class="mbr-white col-lg-8 col-md-12">
                                <h1 class="align-left mbr-fonts-style m-0 display-1">
                                    <br /> Today is your focus session!
                                </h1>
                                <h3 class="mbr-section align-left mbr-light pb-3 mbr-fonts-style display-6">
                                    <br /> Physical condition
                                </h3>
                                <form action="https://mobirise.com/" method="POST" class="mbr-form form-with-styler" data-form-title="Mobirise Form"><input type="hidden" name="email" data-form-email="true" value="xBwRiT6nXeo2bF/dVu2/EBCkac7IluadHt0cFITc55G/p30tWqG8gXHl+mdGmsQsN5AatHpswIJCwifAAt0I4mc5f88/NG2BbOC/6ksvRyy5bygRgspSSl6a6sqj6PLA" />
                                    <div data-for="message" class="col-md-12  form-group">
                                        <label for="message" class="form-control-label mbr-fonts-style display-7">Lay down for 5 min</label><br />
                                        <label for="message" class="form-control-label mbr-fonts-style display-7">Heart Rate:</label>
                                        <input type='number' placeholder={optionsMeasurement1} required="required" class="form-control display-7" onChange={(e) => this.handleChange('heartRate1', e)} />
                                    </div>
                                    <div data-for="message" class="col-md-12  form-group">
                                        <label for="message" class="form-control-label mbr-fonts-style display-7">Do 30 complete flexions in 45 sec</label><br />
                                        <label for="message" class="form-control-label mbr-fonts-style display-7">Heart rate:</label>
                                        <input type='number' placeholder={optionsMeasurement2} required="required" class="form-control display-7" onChange={(e) => this.handleChange('heartRate2', e)}/>
                                    </div>
                                    <div data-for="message" class="col-md-12  form-group">
                                        <label for="message" class="form-control-label mbr-fonts-style display-7">Lay down for 1 min</label><br />
                                        <label for="message" class="form-control-label mbr-fonts-style display-7">Heart rate:</label>
                                        <input type='number' placeholder={optionsMeasurement3} class="form-control display-7" onChange={(e) => this.handleChange('heartRate3', e)}/>
                                    </div>
                                    {optionsMeasurements}
                                </form>
                                <h3 class="mbr-section align-left mbr-light pb-3 mbr-fonts-style display-6">
                                    <br /> Performance
                                </h3>
                                <div class="mbr-section mbr-text-challenge counter-container col-12 col-md-12 display-5" style={{color: "#cccccc"}}>
                                    <h4 class="mbr-section-subtitle align-left mbr-light pb-3 mbr-fonts-style display-5">
                                        You have 4 exercises today. <br />You don't need any material. <br />Do as much as you can for each exercise!
                                    </h4>
                                    <ul>
                                        {optionsExercise}
                                    </ul>
                                </div>
                                <div class="mbr-section-btn align-left">
                                    <a class="btn btn-md btn-primary btn-lg display-4"  onClick={this.handleSubmit}>Let's Get Started!</a>
                                </div>
                            </div>
                        </div>
                    </section>
                </body>
                );
    }
}

export default FocusSessionAgenda;
