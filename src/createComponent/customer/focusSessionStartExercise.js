import React, { Component } from 'react';
import axios from 'axios';
import Select, { components } from 'react-select';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import Background from '../../assets/images/woman-pushup.jpeg';
import Timer from 'react-compound-timer';
import {Button, Header} from 'semantic-ui-react';
var Logo = require('../../assets/images/logo-mzt.png');
var image1 = require('../../assets/images/timed.png');
var image2 = require('../../assets/images/reload.png');
var image3 = require('../../assets/images/emoticons.png');

class FocusSessionStartExercise extends React.Component {
    state = {
        exerciseN: 0,
        exercises: null,
        onExercise: false,
        offInfo: true,
        sessions: null,
        result: ''
    }

    toggle = () => {
        this.setState({
            onExercise: !this.state.onExercise,
            offInfo: !this.state.offInfo
        });
    };
    toggleNext = () => {
        const {exercises, exerciseN, sessions, result} = this.state;
        axios.post('http://localhost:8080/program/updateExerciseResult',{
            program_id:  this.props.match.params.programID,
            sessionNumber : Number(this.props.location.search.slice(1).split("=")[1]),
            exerciseNumber : exerciseN,
            exerciseResult : result
        });
        if (exercises.length === (exerciseN+1)) {
            axios.post('http://localhost:8080/program/customerUpdateSessionStatus',{
                program_id: this.props.match.params.programID,
                sessionNumber: Number(this.props.location.search.slice(1).split("=")[1])
            });
            if(Number(this.props.location.search.slice(1).split("=")[1])===0){
                axios.post('http://localhost:8080/program/customerUpdateProgramStatus',{
                    program_id: this.props.match.params.programID,
                });
            }
            if(Number(this.props.location.search.slice(1).split("=")[1])===(sessions.length-1)){
                axios.post('http://localhost:8080/program/customerUpdateProgramStatus',{
                    program_id: this.props.match.params.programID,
                });
            }
            const index = Number(this.props.location.search.slice(1).split("=")[1]);
            this.props.history.push(`/focusSessionResult/${this.props.match.params.programID}?sessionIndex=${index}`)
            console.log("finished");
            
        } else {
            this.setState({
                onExercise: !this.state.onExercise,
                offInfo: !this.state.offInfo,
                exerciseN: this.state.exerciseN + 1
            });
        }
    };
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
    handleChange = (name, event) => {
        console.log(this.state.session);
        this.setState({
            result: event.target.value
        });
        console.log(event.target);
    };

    render() {
        const {exercises, exerciseN} = this.state;
        var optionsInfo = [];
        var optionsExercise = [];
        console.log(exercises);
        //можно потом использовать if чтобы показывать упражнения на время или на количество
        if (exercises) {
            var timer = [];
            timer.push(
                <p style={{color: '#FFFFFF'}} id='timer'>
                    <Timer
                        initialTime={exercises[exerciseN].exercise_est_duration * 1000}
                        direction="backward"
                        startImmediately={false}
                        lastUnit='s'
                        onStart={() => {
                            document.getElementById('video').removeAttribute('hidden');
                            document.getElementById('start').setAttribute('hidden','hidden');
                        }}
                        checkpoints={[
                            {
                                time: 0,
                                callback: () => {
                                    document.getElementById('result').removeAttribute('hidden');
                                    document.getElementById('timer').setAttribute('hidden','hidden')
                                }
                            }]}
                    >
                    {({ start}) => (
                        <React.Fragment>
                            <Header as='h1' color='green'>
                                <Timer.Seconds /> seconds
                            </Header>
                            <div>
                                <Button id='start' primary size="medium" onClick={start}>Start</Button>
                            </div>
                        </React.Fragment>
                    )}
                    </Timer>
                </p>
            )
          if (exercises[exerciseN].set_type === 'TIME') {
            optionsInfo.push(
                <div class="container align-items-center">
                    <div class="row justify-content-md-center">
                        <div class="mbr-white col-md-10">
                            <h1 class="mbr-text pb-3 mbr-fonts-style display-5">
                                <br /> {exercises[exerciseN].name}
                            </h1>
                            <p class="mbr-text pb-3 mbr-fonts-style display-5">
                                <img src={image1} style={{marginLeft: '10px', width: "10%", height: "10%"}} />
                                <span style={{marginLeft: '1em'}}>
                                    {exercises[exerciseN].time} seconds
                                </span>
                            </p>
                            <p class="mbr-text pb-3 mbr-fonts-style display-5">
                                <img src={image2} style={{marginLeft: '10px', width: "10%", height: "10%"}} />
                                <span style={{marginLeft: '1em'}}>
                                    {exercises[exerciseN].sets} sets
                                </span>
                            </p>
                            <p class="mbr-text pb-3 mbr-fonts-style display-5">
                                <img src={image3} style={{marginLeft: '10px', width: "10%", height: "10%"}} />
                                <span style={{marginLeft: '1em', fontStyle: 'italic'}}>
                                    Coach advice: {exercises[exerciseN].description}
                                </span>
                            </p>
                            <div class="mbr-section-btn">
                                <a class="btn btn-md btn-secondary display-4" onClick={this.toggle} >GO</a>
                            </div>
                        </div>
                    </div>
                </div>
            );
            optionsExercise.push(
                <div class="media-container-row">
                    <div class="media-content align-center">
                        <h1 class="mbr-section-title mbr-white pb-3 mbr-fonts-style display-1">
                            {exercises[exerciseN].name}
                        </h1>
                        </div>
                        <div class="mbr-section-text mbr-white pb-3">
                            <p class="mbr-text mbr-fonts-style display-5">
                                {exercises[exerciseN].description}
                            </p>
                        </div>
                        {timer}
                        <div id='result' hidden class="mbr-section-text mbr-white pb-3">
                            <p class="mbr-text mbr-fonts-style display-5">
                                Your result:
                            </p>
                            <input data-form-field="result" type="number" placeholder='0' required="required" class="form-control display-7 col-md-12" id="email-form1-2" onChange={(e) => this.handleChange('result', e)}/>
                            <div class="mbr-section-btn">
                                <a onClick={this.toggleNext} class="btn btn-md btn-white-outline display-4" >Go next</a>
                            </div>
                        </div>
                    <div class="mbr-figure" style={{width: '145%'}} id='video' hidden>
                        <iframe class="mbr-embedded-video" src={exercises[exerciseN].video_url} width= "1280" height="360" frameborder="0" allowfullscreen></iframe>
                    </div>
                </div>
            );
        }
        if (exercises[exerciseN].set_type === 'REPETITION') {
            optionsInfo.push(
                <div class="container align-items-center">
                    <div class="row justify-content-md-center">
                        <div class="mbr-white col-md-10">
                            <h1 class="mbr-text pb-3 mbr-fonts-style display-5">
                                <br /> {exercises[exerciseN].name}
                            </h1>
                            <p class="mbr-text pb-3 mbr-fonts-style display-5">
                                <img src={image1} style={{marginLeft: '10px', width: "10%", height: "10%"}} />
                                <span style={{marginLeft: '1em'}}>
                                  Repetition: {exercises[exerciseN].repetition}
                                </span>
                            </p>
                            <p class="mbr-text pb-3 mbr-fonts-style display-5">
                                <img src={image2} style={{marginLeft: '10px', width: "10%", height: "10%"}} />
                                <span style={{marginLeft: '1em'}}>
                                    Sets: {exercises[exerciseN].sets}
                                </span>
                            </p>
                            <p class="mbr-text pb-3 mbr-fonts-style display-5">
                                <img src={image3} style={{marginLeft: '10px', width: "10%", height: "10%"}} />
                                <span style={{marginLeft: '1em', fontStyle: 'italic'}}>
                                    Coach advice: {exercises[exerciseN].description}
                                </span>
                            </p>
                            <div class="mbr-section-btn">
                                <a class="btn btn-md btn-secondary display-4" onClick={this.toggle} >GO</a>
                            </div>
                        </div>
                    </div>
                </div>
            );
            optionsExercise.push(
                <div class="media-container-row">
                    <div class="media-content align-center">
                        <h1 class="mbr-section-title mbr-white pb-3 mbr-fonts-style display-1">
                           {exercises[exerciseN].name}
                        </h1>
                        <div class="mbr-section-text mbr-white pb-3">
                            <p class="mbr-text mbr-fonts-style display-5">
                              {exercises[exerciseN].description}
                            </p>
                        </div>
                            {timer}
                        <div id='result' hidden class="mbr-section-text mbr-white pb-3">
                            <p class="mbr-text mbr-fonts-style display-5">
                                Your result:
                            </p>
                            <input data-form-field="result" type="number" placeholder='0' required="required" class="form-control display-7 col-md-12" id="email-form1-2" onChange={(e) => this.handleChange('result', e)}/>
                            <div class="mbr-section-btn">
                                <a onClick={this.toggleNext} class="btn btn-md btn-white-outline display-4" >Go next</a>
                            </div>
                        </div>
                    </div>
                    <div class="mbr-figure" style={{width: '145%'}}>
                        <iframe class="mbr-embedded-video" src={exercises[exerciseN].video_url} width= "1280" height="360" frameborder="0" allowfullscreen></iframe>
                    </div>                      
                </div>
            );
        }
            if (exercises[exerciseN].set_type === 'TIME_REPETITION') {
                optionsInfo.push(
                    <div class="container align-items-center">
                        <div class="row justify-content-md-center">
                            <div class="mbr-white col-md-10">
                                <h1 class="mbr-text pb-3 mbr-fonts-style display-5">
                                    <br /> {exercises[exerciseN].name}
                                </h1>
                                <p class="mbr-text pb-3 mbr-fonts-style display-5">
                                    <img src={image1} style={{marginLeft: '10px', width: "10%", height: "10%"}} />
                                    <span style={{marginLeft: '1em'}}>
                                      Repetition: {exercises[exerciseN].time}sec x{exercises[exerciseN].repetition}
                                    </span>
                                </p>
                                <p class="mbr-text pb-3 mbr-fonts-style display-5">
                                    <img src={image2} style={{marginLeft: '10px', width: "10%", height: "10%"}} />
                                    <span style={{marginLeft: '1em'}}>
                                        Sets: {exercises[exerciseN].sets}
                                    </span>
                                </p>
                                <p class="mbr-text pb-3 mbr-fonts-style display-5">
                                    <img src={image3} style={{marginLeft: '10px', width: "10%", height: "10%"}} />
                                    <span style={{marginLeft: '1em', fontStyle: 'italic'}}>
                                        Coach advice: {exercises[exerciseN].description}
                                    </span>
                                </p>
                                <div class="mbr-section-btn">
                                    <a class="btn btn-md btn-secondary display-4" onClick={this.toggle} >GO</a>
                                </div>
                            </div>
                        </div>
                    </div>
                );
                optionsExercise.push(
                    <div class="media-container-row">
                        <div class="media-content align-center">
                            <h1 class="mbr-section-title mbr-white pb-3 mbr-fonts-style display-1">
                                {exercises[exerciseN].name}
                            </h1>
                            <div class="mbr-section-text mbr-white pb-3">
                                <p class="mbr-text mbr-fonts-style display-5">
                                    {exercises[exerciseN].description}
                                </p>
                            </div>
                                {timer}
                        <div id='result' hidden class="mbr-section-text mbr-white pb-3">
                            <p class="mbr-text mbr-fonts-style display-5">
                                Your result:
                            </p>
                            <input data-form-field="result" type="number" placeholder='0' required="required" class="form-control display-7 col-md-12" id="email-form1-2" onChange={(e) => this.handleChange('result', e)}/>
                            <div class="mbr-section-btn">
                                <a onClick={this.toggleNext} class="btn btn-md btn-white-outline display-4" >Go next</a>
                            </div>
                        </div>
                        </div>
                        <div class="mbr-figure" style={{width: '145%'}}>
                            <iframe class="mbr-embedded-video" src={exercises[exerciseN].video_url} width= "1280" height="360" frameborder="0" allowfullscreen></iframe>
                        </div>
                    </div>
                );
            }
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
                {this.state.offInfo && (
                    <div>
                        <section class="mbr-fullscreen mbr-parallax-background" id="header2-j" style={{backgroundImage: `url(${Background})`}}>
                            <div class="mbr-overlay" style={{opacity: 0.8, backgroundColor: '#232323'}}>
                            </div>
                            {optionsInfo}
                        </section>
                    </div>
                )}
                {this.state.onExercise && (
                    <section class="header7 cid-rH9xttLmcq mbr-fullscreen mbr-parallax-background" id="header7-b" style={{backgroundImage: `url(${Background})`}}>
                        <div class="mbr-overlay" style={{opacity: 0.8, backgroundColor: '#232323'}}>
                        </div>
                        <div class="container">
                            {optionsExercise}
                        </div>
                    </section>
                )}                
            </body>
        );
    }
}

export default FocusSessionStartExercise;
