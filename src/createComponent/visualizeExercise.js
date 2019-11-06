import React, { Component } from 'react'
import axios from 'axios'

import '../assets/web/assets/mobirise-icons/mobirise-icons.css';
import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/bootstrap/css/bootstrap-grid.min.css';
import '../assets/bootstrap/css/bootstrap-reboot.min.css';
import '../assets/tether/tether.min.css'
import '../assets/dropdown/css/style.css'
import '../assets/theme/css/style.css'
import '../assets/mobirise/css/mbr-additional.css'
import '../assets/mobirise/css/mbr-additional.css'

class visualizeExercise extends Component {
   state = {
       exercises: []
   }

componentDidMount(){
   axios.get('http://localhost:8080/exercise/getAllExercises')
   .then(res => {
       const exercises = res.data;
       this.setState({ exercises });
     }
   )
}

render() {
  var optionsExercise = [];
  this.state.exercises.map((exerciseId) => {
    optionsExercise.push(
      <div class="card col-12 pb-5"><br /><br />< br/>
          <div class="card-wrapper media-container-row media-container-row">
              <div class="card-box">
                  <div class="row">
                      <div class="col-12 col-md-2">

                          <div class="mbr-figure">
                              <img src="https://i.imgur.com/kYd3Yuk.png" alt="Mobirise" title="" />
                          </div>
                      </div>
                      <div class="col-12 col-md-10">
                          <div class="wrapper">
                              <div class="top-line pb-3">
                                <h4 class="card-title mbr-fonts-style display-5">{exerciseId.name}</h4>
                                <p class="mbr-text cost mbr-fonts-style m-0 display-5">&nbsp;</p>
                              </div>
                              <div class="bottom-line">
                                <p class="mbr-text mbr-fonts-style display-7">{exerciseId.description}</p>
                                  </div>
                                  </div>
                            </div>
                </div>
                </div>
                </div>
                </div>

              )
  });
  return (
    <body>
      <section class="mbr-section content5 cid-rGoydIydOP" id="content5-9">





        <div class="container">
            <div class="media-container-row">
                    <h2 class="mbr-bold mbr-white mbr-fonts-style display-1">
                        Exercises
                    </h2>

            </div>
        </div>
    </section>



    <section class=" cid-rGowQrNiDe mbr-parallax-background" id="services6-7">
        <div class="mbr-overlay" style= {{ opacity: 0.6, backgroundColor: "#635a51" }} >
        </div>
        <div class="container">
        	<div>
        	<a class="align-center col-md-4 btn btn-white-outline display-4" href='/exercisesCreate' style={{color:"#000000", backgroundColor:"#ffffff"}}>
                CREATE AN EXERCISE
            </a>
            <br /><br /><br />
            <label class="form-control-label mbr-fonts-style display-4" style={{color:"#ffffff"}}>Search</label>
            <input class="form-control display-4 col-md-4" default="search" />
          	</div>

            {optionsExercise}

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
}
}
export default visualizeExercise;
