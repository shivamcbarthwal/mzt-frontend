import React from 'react';
import '../assets/web/assets/mobirise-icons/mobirise-icons.css';
import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/bootstrap/css/bootstrap-grid.min.css';
import '../assets/bootstrap/css/bootstrap-reboot.min.css';
import '../assets/tether/tether.min.css';
import '../assets/dropdown/css/style.css';
import '../assets/theme/css/style.css';
import '../assets/mobirise/css/mbr-additional.css';
import '../assets/mobirise/css/mbr-additional.css';
import Background from '../assets/images/PtoC-bk.jpg';


class AssignPtoC extends React.Component {

render(){
    return (
        <div>
            <body>
                
       
        <section class="mbr-fullscreen centerize align-center" style={{ backgroundImage: `url(${Background})` }}>
       
         <div class="mbr-overlay" style={{opacity: 0.8, backgroundColor: "#232323"}}>
         </div>

        <div class="container">
        <div class="container">
            <h2 class="mbr-bold mbr-white  align-center display-1">Assign a Program to a Customer</h2> 
        </div>
        <br/>
		<div class="custom-select container align-center" style={{width:"200px", marginTop:"100px",  height: "100%"}}>
		  	
              <select>
		  	  	<option value="0">Select a customer</option>
		  	  	<option value="1">Audi</option>
                <option value="2">BMW</option>
                <option value="3">Citroen</option>
                <option value="4">Ford</option>
                <option value="5">Honda</option>
                <option value="6">Jaguar</option>
                <option value="7">Land Rover</option>
                <option value="8">Mercedes</option>
                <option value="9">Mini</option>
                <option value="10">Nissan</option>
                <option value="11">Toyota</option>
                <option value="12">Volvo</option>

		  	</select>
		</div>
		<br/>
		<div class="custom-select container align-center" style={{width:"200px", marginTop:"100px", height: "10%"}}>
		  	
        <select>
		  	  	<option value="0">Select a program:</option>
		  	  	<option value="1">Audi</option>
                <option value="2">BMW</option>
                <option value="3">Citroen</option>
                <option value="4">Ford</option>
                <option value="5">Honda</option>
                <option value="6">Jaguar</option>
                <option value="7">Land Rover</option>
                <option value="8">Mercedes</option>
                <option value="9">Mini</option>
                <option value="10">Nissan</option>
                <option value="11">Toyota</option>
                <option value="12">Volvo</option>

		  	</select>
		</div>
        </div>
   
		</section>
		
		  <script src="assets/web/assets/jquery/jquery.min.js"></script>
		  <script src="assets/popper/popper.min.js"></script>
		  <script src="assets/bootstrap/js/bootstrap.min.js"></script>
		  <script src="assets/tether/tether.min.js"></script>
		  <script src="assets/smoothscroll/smooth-scroll.js"></script>
		  <script src="assets/dropdown/js/nav-dropdown.js"></script>
		  <script src="assets/dropdown/js/navbar-dropdown.js"></script>
		  <script src="assets/touchswipe/jquery.touch-swipe.min.js"></script>
		  <script src="assets/theme/js/script.js"></script>
		  

            </body>
        </div>
    );
    }
}

export default AssignPtoC;
