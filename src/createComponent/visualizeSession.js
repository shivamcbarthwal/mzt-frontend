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

class visualizeSession extends Component {
   state = {
       exercises: []
   }

componentDidMount(){
   axios.get('http://localhost:8080/exercise/getAllExercises/')
   .then(res => {
       const exercises = res.data;
       this.setState({ exercises });
     }
   )
}

render() {
  var optionsSession = [];
  this.state.exercises.map((sessionId) => {
    optionsSession.push(
      <div class="mbr-gallery-item mbr-gallery-item--p2" data-video-url="false" data-tags="Animé">
        <div href="#lb-gallery1-4" data-slide-to="0" data-toggle="modal">
          <img src="https://i.imgur.com/kYd3Yuk.png" alt="" title="" />
          <a href= "/exercise/deleteExercise"><span class="icon-focus"></span><span class="mbr-gallery-title mbr-fonts-style display-7">{sessionId.name}</span></a>
        </div>
      </div>
)
  });
  return (
    <body>
      <section class="mbr-section content5 cid-rGostJvFvM mbr-parallax-background" id="content5-5">





        <div class="container">
            <div class="media-container-row">
                <div class="title col-12 col-md-8">
                    <h2 class="align-center mbr-bold mbr-white pb-3 mbr-fonts-style display-1">Full body workout</h2>



                </div>
            </div>
        </div>
    </section>
    <section class="mbr-gallery mbr-slider-carousel cid-rGossidMiZ" id="gallery1-4">



        <div class="container">
            <div>
            	<div class="mbr-gallery-row">
            		<div class="mbr-gallery-layout-default">
            			<div>
            				<div>
            					{optionsSession}
            				</div>
                  </div>
                <div class="clearfix"></div>
            	</div>
            </div>
        </div>
        <div class="col-md-12 input-group-btn align-center">
          <form action="/exercisesCreate">
            <input type="submit" value="+ Add an exercise" class="btn btn-form btn-warning display-4" />
          </form>
          <form action="/exercisesCreate">
            <input type="submit" value="Edit" class="btn btn-form btn-warning display-4" />
          </form>
        </div>
      </div>

    </section>


      <script src="assets/web/assets/jquery/jquery.min.js"></script>
      <script src="assets/popper/popper.min.js"></script>
      <script src="assets/bootstrap/js/bootstrap.min.js"></script>
      <script src="assets/tether/tether.min.js"></script>
      <script src="assets/smoothscroll/smooth-scroll.js"></script>
      <script src="assets/masonry/masonry.pkgd.min.js"></script>
      <script src="assets/imagesloaded/imagesloaded.pkgd.min.js"></script>
      <script src="assets/bootstrapcarouselswipe/bootstrap-carousel-swipe.js"></script>
      <script src="assets/vimeoplayer/jquery.mb.vimeo_player.js"></script>
      <script src="assets/parallax/jarallax.min.js"></script>
      <script src="assets/theme/js/script.js"></script>
      <script src="assets/gallery/player.min.js"></script>
      <script src="assets/gallery/script.js"></script>
      <script src="assets/slidervideo/script.js"></script>


    </body>
  );
}
}
export default visualizeSession;
