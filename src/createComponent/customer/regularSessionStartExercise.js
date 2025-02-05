import React from 'react';
import axios from 'axios';
import Background from '../../assets/images/woman-pushup.jpeg';
import Timer from 'react-compound-timer';
import {Button, Header} from 'semantic-ui-react';
import ReactPlayer from 'react-player'
var Logo = require('../../assets/images/logo-mzt.png');
var image1 = require('../../assets/images/timed.png');
var image2 = require('../../assets/images/reload.png');
var image3 = require('../../assets/images/emoticons.png');
var angry = require('../../assets/images/angry.png');
var neutral = require('../../assets/images/neutral.png');
var happy = require('../../assets/images/very-happy.png');

class RegularSessionStartExercise extends React.Component {
    state = {
        exerciseN: 0,
        exercises: null,
        onExercise: false,
        offInfo: true,
        sessions: null,
        result: null
    }

    toggle = () => {
        this.setState({
            onExercise: !this.state.onExercise,
            offInfo: !this.state.offInfo
        });
    }
    ;
    toggleNext = (result) => {
        const {exercises, exerciseN, sessions} = this.state;
        console.log(result);
        this.state.result = result
        console.log('Result: ',this.state.result);
        axios.post('http://localhost:8080/program/updateExerciseResult',{
            program_id:  this.props.match.params.programID,
            sessionNumber : Number(this.props.location.search.slice(1).split("=")[1]),
            exerciseNumber : exerciseN,
            exerciseResult : result
        }).then( res => {
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
            this.props.history.push(`/regularSessionResult/${this.props.match.params.programID}?sessionIndex=${index}`)
            console.log("finished");
            
        } else {
            this.setState({
                onExercise: !this.state.onExercise,
                offInfo: !this.state.offInfo,
                exerciseN: this.state.exerciseN + 1
            });
            console.log("exerciseN ",exerciseN)
        }
    });
    }
    ;
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

    render() {
        const {exercises, exerciseN} = this.state;
        var optionsInfo = [];
        var optionsExercise = [];
        console.log(exercises);
        //можно потом использовать if чтобы показывать упражнения на время или на количество
        if (exercises) {
            var time = exercises[exerciseN].exercise_est_duration * 1000;
            var set = exercises[exerciseN].time * exercises[exerciseN].repetition * 1000;
            var rest = exercises[exerciseN].set_break * 1000;
            var timer = [];
            var words = [];
            var checkpoints = [
                {
                    time: 0,
                    callback: () => {
                        document.getElementById('result').removeAttribute('hidden');
                        document.getElementById('timer').setAttribute('hidden','hidden');
                        document.getElementById('rest').setAttribute('hidden','hidden');
                    }
                }
            ];
            words.push(
                <p class="mbr-text mbr-fonts-style display-5">
                    Finish 1 set ?
                </p>
            )
            for(var i=1; i <= exercises[exerciseN].sets; i++){
                checkpoints.push({
                    time: time - set * i - rest * (i - 1),
                    callback: () => {
                        document.getElementById('rest').removeAttribute('hidden');
                    }
                })
            }
            timer.push(
                <div>
                    <p style={{color: '#FFFFFF'}} id='timer'>
                        <Timer
                            initialTime={time}
                            direction="backward"
                            startImmediately={false}
                            lastUnit='s'
                            onStart={() => {
                                document.getElementById('video').removeAttribute('hidden');
                                document.getElementById('start').setAttribute('hidden','hidden');
                            }}
                            checkpoints={checkpoints}
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
                    <div id='rest' hidden>
                        <Timer
                            initialTime={rest}
                            direction="backward"
                            lastUnit='s'
                            startImmediately={false}
                            onStart={() => {
                                document.getElementById('startRest').setAttribute('hidden','hidden');
                            }}
                            checkpoints={[
                                {
                                    time: 0,
                                    callback: () => {
                                        document.getElementById('rest').setAttribute('hidden','hidden');
                                        document.getElementById('reset').click();
                                        document.getElementById('startRest').removeAttribute('hidden')
                                    }
                                }
                            ]}
                        >
                            {({start, reset}) => (
                                <React.Fragment>
                                    {words}
                                    <p class="mbr-text mbr-fonts-style display-5">
                                        Take a <Timer.Seconds /> seconds rest
                                    </p>
                                    <Button id='startRest' primary size="medium" onClick={start}>Start</Button>
                                    <Button id='reset' hidden primary size="medium" onClick={reset}>Reset</Button>
                                </React.Fragment>
                            )}
                        </Timer>
                    </div>
                </div>
            );
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
                        <div class="media-content align-center media-container-column">
                            <h1 class="mbr-section-title mbr-white pb-3 mbr-fonts-style display-1">
                                {exercises[exerciseN].name}
                            </h1>
                            <div class="mbr-section-text mbr-white pb-3">
                                <p class="mbr-text mbr-fonts-style display-5">
                                    {exercises[exerciseN].description}
                                </p>
                                {timer}
                                <div id='result' hidden>
                                    <p class="mbr-text mbr-fonts-style display-5">
                                        How do you feel?
                                    </p>
                                    <div class="mbr-section-btn">
                                        <p class="align-center mbr-text pb-3 mbr-fonts-style display-5">
                                            <a onClick={() => this.toggleNext(angry)} ><img src={angry} alt="Angry"  style={{height: 70}}/></a>
                                            <a onClick={() => this.toggleNext(neutral)} ><img src={neutral} alt="Neutral" style={{height: 70}}/></a>
                                            <a onClick={() => this.toggleNext(happy)} ><img src={happy} alt="Happy" style={{height: 70}}/></a>          
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="mbr-figure" style={{width: '145%'}} id='video' hidden>
                            <ReactPlayer
                                url={exercises[exerciseN].video_url}
                            />
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
                            <div class="media-content align-center media-container-column">
                                <h1 class="mbr-section-title mbr-white pb-3 mbr-fonts-style display-1">
                                    {exercises[exerciseN].name}
                                </h1>
                                <div class="mbr-section-text mbr-white pb-3">
                                    <p class="mbr-text mbr-fonts-style display-5">
                                      {exercises[exerciseN].description}
                                    </p>
                                    <div id='result'>
                                        <p class="mbr-text mbr-fonts-style display-5">
                                            How do you feel?
                                        </p>
                                        <div class="mbr-section-btn">
                                            <p class="align-center mbr-text pb-3 mbr-fonts-style display-5">
                                                <a onClick={() => this.toggleNext(angry)} ><img src={angry} alt="Angry"  style={{height: 70}}/></a>
                                                <a onClick={() => this.toggleNext(neutral)} ><img src={neutral} alt="Neutral" style={{height: 70}}/></a>
                                                <a onClick={() => this.toggleNext(happy)} ><img src={happy} alt="Happy" style={{height: 70}}/></a>          
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="mbr-figure" style={{width: '145%'}} id='video'>
                            <ReactPlayer
                                url={exercises[exerciseN].video_url}
                            />    
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
                                    <br/> 
                                    {exercises[exerciseN].name}
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
                        <div class="media-content align-center media-container-column">
                            <h1 class="mbr-section-title mbr-white pb-3 mbr-fonts-style display-1">
                                {exercises[exerciseN].name}
                            </h1>
                            <div class="mbr-section-text mbr-white pb-3">
                                <p class="mbr-text mbr-fonts-style display-5">
                                    {exercises[exerciseN].description}
                                </p>
                                {timer}
                                <div id='result' hidden>
                                    <p class="mbr-text mbr-fonts-style display-5">
                                        How do you feel?
                                    </p>
                                    <div class="mbr-section-btn">
                                        <p class="align-center mbr-text pb-3 mbr-fonts-style display-5">
                                            <a onClick={() => this.toggleNext(angry)} ><img src={angry} alt="Angry"  style={{height: 70}}/></a>
                                            <a onClick={() => this.toggleNext(neutral)} ><img src={neutral} alt="Neutral" style={{height: 70}}/></a>
                                            <a onClick={() => this.toggleNext(happy)} ><img src={happy} alt="Happy" style={{height: 70}}/></a>          
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="mbr-figure" style={{width: '145%'}} id='video' hidden>
                            <ReactPlayer
                                url={exercises[exerciseN].video_url} playing
                            />    
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
                    {
                        this.state.offInfo && (
                            <div>
                                <section class="engine"><a href="https://mobirise.info/p">site templates free download</a></section>
                                <section class="mbr-fullscreen mbr-parallax-background" id="header2-j" style={{backgroundImage: `url(${Background})`}}>
                                        <div class="mbr-overlay" style={{opacity: 0.8, backgroundColor: '#232323'}}>
                                        </div>
                                        {optionsInfo}
                                </section>
                            </div>
                        )
                    }
                    {
                        this.state.onExercise && (
                            <section class="header7 cid-rH9xttLmcq mbr-fullscreen mbr-parallax-background" id="header7-b" style={{backgroundImage: `url(${Background})`}}>
                                <div class="mbr-overlay" style={{opacity: 0.8, backgroundColor: '#232323'}}>
                                </div>
                                <div class="container">
                                    {optionsExercise}
                                </div>
                            </section>
                        )
                    }
                </body>
        );
    }
}

export default RegularSessionStartExercise;
