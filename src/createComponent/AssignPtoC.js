import React from 'react';
import axios from 'axios'

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
    state = {
        customers: [],
        programs: []
    }
    ///////////
    componentDidMount(){
        axios.get('http://localhost:8080/customer/getAllCustomers')
        .then(res => {
            const customers = res.data;
            this.setState({ customers });
            }
        )
        axios.get('http://localhost:8080/program/getAllPrograms')
        .then(res => {
            const programs = res.data;
            this.setState({ programs });
          }
        )
}  


render() {
    var optionsCustomer = [];
    this.state.customers.map((Customer) => {
          optionsCustomer.push(

        <option>
          {Customer.first_name} {Customer.last_name}
        </option>
          )
        }
    );

    var optionsProgram = [];
    this.state.programs.map((Program) => {
    optionsProgram.push(
        <option>
        {Program.programme_} {Program.title}
        </option>
      
          )
        }
    );
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
		<div class="custom-select container align-center" style={{width:"50%", marginTop:"100px",  height: "100%"}}>
		  	
              <select>

		  	  	{optionsCustomer}
		  	  	

		  	</select>
		</div>
		<br/>
		<div class="custom-select container align-center" style={{width:"50%", marginTop:"100px", height: "10%"}}>
		  	
            <select>
                {optionsProgram}
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
