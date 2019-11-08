import React from 'react';
import '../assets/web/assets/mobirise-icons/mobirise-icons.css';
import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/bootstrap/css/bootstrap-grid.min.css';
import '../assets/bootstrap/css/bootstrap-reboot.min.css';
import '../assets/tether/tether.min.css'
import '../assets/dropdown/css/style.css'
import '../assets/theme/css/style.css'
import '../assets/mobirise/css/mbr-additional.css'
import '../assets/mobirise/css/mbr-additional.css'
import ImagePicker from 'react-image-picker'
import 'react-image-picker/dist/index.css'

import img1 from '../assets/images/absbike-800x600-800x600.png'
import img2 from '../assets/images/a-buttextension-800x600-800x600.png'
import img3 from '../assets/images/a-chilpose-800x600-800x600.png'
import img4 from '../assets/images/a-hamstretch-800x600-800x600.png'

const imageList = [img1, img2, img3, img4]
// Class based component to create Exercise

class ExcerciseCreate extends React.Component {
  state = {
    exercise: {
      name: '',
      description: '',
      exercise_type: '',
      set_break: '',
      sets: '',
      repetition: '',
      exercise_est_duration: '',
      muscles_targeted: '',
      equipement_required: '',
      exercise_tag: ["Later", "Impossible", "NA"]
    }
  }

  // Input Change Handler method to take form inputs

  handleChange = (name, event) => {
    console.log(this.state.exercise);
    this.setState({ exercise: {
      ...this.state.exercise,
      [name]: event.target.value

    }});
    console.log(event.target);
  };

  // Submit handler to add exercise

  handleSubmit = async event => {
    console.log('Testing')
    event.preventDefault();
    const { exercise } = this.state;
    const response = await fetch(`http://localhost:8080/exercise/addExercise`, {
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
    const { classes } = this.props;
    const { exercise } = this.state;
    return (
      <div className="App">
        <body>


        <section class="mbr-section form1 cid-rGoqoMJvGK mbr-parallax-background" id="form1-3">

        


            <div class="mbr-overlay" style={{opacity: 0.7, backgroundColor: "#c1c1c1"}} ></div>
            
            <div class="container">
                <div class="row justify-content-center">
                <h2 class="align-center mbr-bold mbr-white pb-3 mbr-fonts-style display-1" >CREATE AN EXERCISE</h2>
            
                    <div class="media-container-column col-lg-8" data-form-type="formoid">

                        <form action="https://mobirise.com/" method="POST" class="mbr-form form-with-styler">



                            <div class="row">
                                <div hidden="hidden" class="alert alert-danger col-12">
                                </div>
                            </div>
                            <div class="dragArea row">
                            	<div class="col-md-6  form-group" data-for="name">
                                    <label for="name-form1-5" class="form-control-label mbr-fonts-style display-7">Name</label>
                                    <input type="text" name="name" data-form-field="Name" required="required" class="form-control display-7" id="name-form1-5" onChange={(e) => this.handleChange('name', e)} />
                                </div>

                                <div class="col-md-6  form-group" data-for="muscles_targeted">
        						<label for="name-form1-5" class="form-control-label mbr-fonts-style display-7">Muscles targeted</label><br />
                                <select class="form-control display-7" id="name-form1-5" onChange={(e) => this.handleChange('muscles_targeted', e)}  multiple>
        							<option>Abs</option>
        							<option>Calf muscle</option>
        							<option>Back</option>
        							<option>Biceps</option>
        							<option>Triceps</option>
        							<option>Waist</option>
        						</select>
        						</div>

                            	<div class=" col-md-4  form-group" >
                            	<label class="form-control-label mbr-fonts-style display-7">Equipment</label> <br/>
                              <select class="form-control display-7" onChange={(e) => this.handleChange('equipement_required', e)} id="name-form1-5" multiple>
        								<option>Balls</option>
        								<option>Hoop</option>
        								<option>Balls</option>
        								<option>Hoop</option>
        								<option>Balls</option>
        								<option>Hoop</option>
        							</select>
                            	</div>

                            	<div class="box col-md-4  form-group" >
                            	<label class="form-control-label mbr-fonts-style display-7">Type</label> <br/>
          							<select onChange={(e) => this.handleChange('exercise_type', e)}>
            							<option>Cardio</option>
            							<option>Lift</option>
            							<option>Full Body</option>
          							</select>
        						</div>

                                <div class="col-md-4  form-group">
                                    <label class="form-control-label mbr-fonts-style display-7">Tag</label>
                                    <input class="form-control display-7"  />
                                </div>
                                <div data-for="message" class="col-md-12 form-group">
                                    <label for="message-form1-3" class="form-control-label mbr-fonts-style display-7">Description</label>
                                    <textarea name="message" onChange={(e) => this.handleChange('description', e)} data-form-field="Message" class="form-control display-7" id="message-form1-3"></textarea>
                                </div>
                                <div class="col-md-3  form-group" data-for="set_break">
        							<label for="name-form1-5" class="form-control-label mbr-fonts-style display-7">Set breaks</label>
                                    <input type="number" onChange={(e) => this.handleChange('set_break', e)} placeholder="in seconds"  data-form-field="Name" required="required" class="form-control display-7" required pattern="^[0-9]+:[0|1|2|3|4|5][0-9]" id="name-form1-5" />
        						</div>
        						<div class="col-md-3  form-group" data-for="sets">
        							<label for="name-form1-5" class="form-control-label mbr-fonts-style display-7">Number of sets</label>
                                    <input type="number" onChange={(e) => this.handleChange('sets', e)} placeholder="0"  data-form-field="Name" required="required" class="form-control display-7" required pattern="^[0-9]+:[0|1|2|3|4|5][0-9]" id="name-form1-5" />
        						</div>
        						<div class="col-md-3  form-group" data-for="repetition">
        							<label for="name-form1-5" class="form-control-label mbr-fonts-style display-7">Number of repetition</label>
                                    <input type="number" onChange={(e) => this.handleChange('repetition', e)} placeholder="0"  data-form-field="Name" required="required" class="form-control display-7" required pattern="^[0-9]+:[0|1|2|3|4|5][0-9]" id="name-form1-5" />
        						</div>
        						<div class="col-md-3  form-group" data-for="repetition">
        							<label for="name-form1-5" class="form-control-label mbr-fonts-style display-7">Estimated time</label>
                                    <input type="number" onChange={(e) => this.handleChange('exercise_est_duration', e)} placeholder="0"  data-form-field="Name" required="required" class="form-control display-7" required pattern="^[0-9]+:[0|1|2|3|4|5][0-9]" id="name-form1-5" />
        						</div>
        						<button type="button" class="btn btn-primary col-md-6" data-toggle="modal" data-target="#exampleModalLong">
        							Add picture
        						</button>
                    <div>
                      <ImagePicker
                        images={imageList.map((image, i) => ({src: image, value: i}))}
                        onPick={this.onPick}
                      />
                      <button type="button" onClick={() => console.log(this.state.image)}>OK</button>
                    </div>
                                <div class="col-md-12 input-group-btn align-center" />
                                	<button type="submit" class="btn btn-form btn-warning display-4" onClick={this.handleSubmit}>
                                		CREATE
                                	</button>
                                </div>
  </form>
                            </div>
                    </div>
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
      </div>
    );
  }
}

export default ExcerciseCreate;
