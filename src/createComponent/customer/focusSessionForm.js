import React from 'react';
import Background from '../../assets/images/cardio-fitness-player.jpg';
var Logo = require('../../assets/images/logo-mzt.png');

class FocusSessionForm extends React.Component {
    state = {
        measurements: {
            measurement_date: '2019-11-10T23:14:36.673+00:00',
            customer_id: '5db84e5b006e1f170c40bd7d',
            weight: '',
            height: '',
            chest: '',
            arms: '',
            hips: '',
            thigh: '',
            waist: ''
        }
    }

    // Input Change Handler method to take form inputs

    handleChange = (name, event) => {
        console.log(this.state.measurements);
        this.setState({measurements: {
                ...this.state.measurements,
                [name]: event.target.value

            }});
        console.log(event.target);
    }
    ;
            // Submit handler to add exercise

            handleSubmit = async event => {
                console.log('Testing')
                event.preventDefault();
                const {exercise} = this.state;
                const response = await fetch(`http://localhost:8080/customer/updateMeasurement`, {
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                                // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: JSON.stringify(exercise) // body data type must match "Content-Type" header
                });
                return await response.json(); // parses JSON response into native JavaScript objects
            }
    constructor(props) {
        super(props)
        this.state = {
            image: null
        }
        this.onPick = this.onPick.bind(this)
    }

    onPick(image) {
        this.setState({image})
    }
    render() {
        const {classes} = this.props;
        const {exercise} = this.state;
        return (
                <body>
                    <meta charset="UTF-8" />
                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="generator" content="Mobirise v4.11.2, mobirise.com" />
                    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />
                    <link rel="shortcut icon" href="../../assets/images/logo-mzt2.png" type="image/x-icon" />
                    <meta name="description" content="Website Builder Description" />
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
                
                    <section class="mbr-section form1 cid-rFxS6PmLUN mbr-parallax-background" id="form1-2">
                        <div class="mbr-overlay" style={{opacity: 0.9, backgroundColor: '#c1c1c1', backgroundImage: `url(${Background})`}}>
                        </div>
                        <div class="container">
                            <br/>
                            <h2 class="align-center mbr-fonts-style m-0 display-1">
                                <br/>Focus session 1<br/>
                            </h2>
                            <div class="row justify-content-center">
                                <div class="title col-12 col-lg-8">
                                    <br/>
                                    <h3 class="mbr-section-subtitle align-center mbr-light pb-3 mbr-fonts-style display-5">
                                        You are about to start your focus session. In order to record your progress, please fill out the information below:</h3>
                                </div>
                            </div>
                        </div>
                        <div class="container">
                            <div class="row justify-content-center">
                                <div class="media-container-column col-lg-8">
                                    <form action="https://mobirise.com/" method="POST" class="mbr-form form-with-styler" data-form-title="Mobirise Form"><input type="hidden" name="email" data-form-email="true" value="xBwRiT6nXeo2bF/dVu2/EBCkac7IluadHt0cFITc55G/p30tWqG8gXHl+mdGmsQsN5AatHpswIJCwifAAt0I4mc5f88/NG2BbOC/6ksvRyy5bygRgspSSl6a6sqj6PLA" />
                                        <div class="row">
                                            <div hidden="hidden" data-form-alert="" class="alert alert-success col-12">Thanks for filling out the form!</div>
                                            <div hidden="hidden" data-form-alert-danger="" class="alert alert-danger col-12"> </div>
                                        </div>
                                        <div class="dragArea row">
                                            <div data-for="message" class="col-md-12  form-group">
                                                <label for="message" class="form-control-label mbr-fonts-style display-7">customer</label>
                                                <input data-form-field="Message" required="required" class="form-control display-7" id="email-form1-2" onChange={(e) => this.handleChange('customer_id', e)} />
                                            </div>
                                            <div data-for="message" class="col-md-12  form-group">
                                                <label for="message" class="form-control-label mbr-fonts-style display-7">measurements</label>
                                                <input type="text" data-form-field="Message" required="required" class="form-control display-7" id="email-form1-2" onChange={(e) => this.handleChange('measurement_date', e)} />
                                            </div>
                                            <div data-for="message" class="col-md-12  form-group">
                                                <label for="message" class="form-control-label mbr-fonts-style display-7">Weight</label>
                                                <input data-form-field="Message" required="required" class="form-control display-7" id="email-form1-2" onChange={(e) => this.handleChange('weight', e)} />
                                            </div>
                                            <div data-for="message" class="col-md-12  form-group">
                                                <label for="message" class="form-control-label mbr-fonts-style display-7">Height</label>
                                                <input data-form-field="Message" required="required" class="form-control display-7" id="email-form1-2" onChange={(e) => this.handleChange('height', e)} />
                                            </div>
                                            <div data-for="message" class="col-md-12  form-group">
                                                <label for="message" class="form-control-label mbr-fonts-style display-7">Arms</label>
                                                <input data-form-field="Message" class="form-control display-7" id="phone-form1-2" onChange={(e) => this.handleChange('arms', e)} />
                                            </div>
                                            <div data-for="message" class="col-md-12 form-group">
                                                <label for="message" class="form-control-label mbr-fonts-style display-7">Hips</label>
                                                <input data-form-field="Message" class="form-control display-7" id="messame-form1-2" onChange={(e) => this.handleChange('hips', e)} />
                                            </div>
                                            <div data-for="message" class="col-md-12 form-group">
                                                <label for="message" class="form-control-label mbr-fonts-style display-7">Chest</label>
                                                <input data-form-field="Message" class="form-control display-7" id="message-form1-2" onChange={(e) => this.handleChange('chest', e)} />
                                            </div>
                                            <div data-for="message" class="col-md-12 form-group">
                                                <label for="message" class="form-control-label mbr-fonts-style display-7">Waist</label>
                                                <input type="text" name="text" data-form-field="Message" class="form-control display-7" id="message-form1-2" onChange={(e) => this.handleChange('waist', e)} />
                                            </div>
                                            <div data-for="message" class="col-md-12 form-group">
                                                <label for="message" class="form-control-label mbr-fonts-style display-7">Thigh</label>
                                                <input type="text" name="text" data-form-field="Message" class="form-control display-7" id="message-form1-2" onChange={(e) => this.handleChange('thigh', e)} />
                                            </div>
                                            <div class="mbr-section-btn">
                                                <a class="btn btn-md btn-primary btn-lg display-4" href="focus_session_agenda.html" onClick={this.handleSubmit}>Let's Get Started!</a>
                                                <a class="btn btn-md btn-secondary display-6" href="homepage.html">Back</a>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>
            </body>
        );
    }
}

export default FocusSessionForm;