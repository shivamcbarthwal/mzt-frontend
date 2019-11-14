import React, { Component } from 'react';
import axios from 'axios';
import Select, { components } from 'react-select';
import '../assets/web/assets/mobirise-icons/mobirise-icons.css';
import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/bootstrap/css/bootstrap-grid.min.css';
import '../assets/bootstrap/css/bootstrap-reboot.min.css';
import '../assets/tether/tether.min.css';
import '../assets/dropdown/css/style.css';
import '../assets/theme/css/style.css';
import '../assets/mobirise/css/mbr-additional.css';
import Background from '../assets/images/prog_bk.jpg';

class visualizeProgram extends Component {
    state = {
        programs: []
    };
    handleClickBack = () => {
        this.props.history.push('/');
    };
    componentDidMount() {
        axios.get('http://localhost:8080/programTemplate/getAllProgramTemps')
        .then(res => {
            const programs = res.data;
            this.setState({programs});
        });
    };
    render() {
        const {programs} = this.state.programs;
        var optionsProgram = [];
        this.state.programs.map((program) => {
            optionsProgram.push(
                    
                <div class="card col-12 pb-5" >
                    <div class="card-wrapper media-container-row media-container-row" >
                        <div class="card-box" style={{backgroundColor: "#2b2b2b", height: "60%"}} >
                            <div class="row">
                                <div class="col-12 col-md-2">
                                    <div class="mbr-figure">
                                        <img src="https://i.imgur.com/kYd3Yuk.png" alt="Mobirise" title="" />
                                    </div>
                                </div>
                                <div class="col-12 col-md-10">
                                    <div class="wrapper">
                                        <div class="top-line pb-3">
                                            <h4 class="card-title mbr-fonts-style display-5" style={{color: "#FFFFFF"}}>{program.title}</h4>
                                        </div>
                                        <div class="bottom-line">
                                            <p class="mbr-text mbr-fonts-style display-7" style={{color: "#FFFFFF"}}>{program.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
        return (
            <body>
                <section class=" mbr-parallax-background" id="services6-7">
                    <div class="mbr-overlay" style= {{opacity: 0.6, backgroundColor: "#635a51"}}/>
                    <div class="container">
                        <h2 class="mbr-bold mbr-white mbr-fonts-style display-1">Program Templates</h2> <br/>
                        <div>
                            <a class="align-center col-md-2 btn btn-orange-outline " href='/assignPtoC' style={{color: "#FFFFFF", backgroundColor: "#C4643B", fontSize: "80%"}}>
                                ASSIGN A PROGRAM TEMPLATE
                            </a>
                            <a class="align-center col-md-2 btn btn-orange-outline " href='/createProgramT' style={{color: "#FFFFFF", backgroundColor: "#C4643B", fontSize: "80%"}}>
                                CREATE A PROGRAM TEMPLATE
                            </a>
                            <label class="form-control-label mbr-fonts-style " style={{color: "#ffffff", fontWeight: "bold"}}>Search :  </label>
                            <input class="col-md-4" default="search" />
                        </div>
                        <br/><br/>
                        {optionsProgram}
                    </div>
                    <div class="align-right">
                        <button type="button" class="btn btn-primary btn-lg active" role="button" aria-pressed="true" onClick = {this.handleClickBack}>
                            <span class="mbrib-arrow-prev mbr-iconfont mbr-iconfont-btn">
                            </span> 
                            Back
                        </button>
                    </div>
                </section>
                <script src="assets/web/assets/jquery/jquery.min.js"></script>
                <script src="assets/popper/popper.min.js"></script>
                <script src="assets/bootstrap/js/bootstrap.min.js"></script>
                <script src="assets/tether/tether.min.js"></script>
                <script src="assets/smoothscroll/smooth-scroll.js"></script>
                <script src="assets/parallax/jarallax.min.js"></script>
                <script src="assets/theme/js/script.js"></script>
            </body>
        );
    };
};

export default visualizeProgram;
