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
        programsT: [], 
        program:{
            program_template_id:"",
            customer_id: "",
            coach_id: "5dc2f70414b9e52a30d6620e"//get coach
        }        
    }
    /////Get Customers and Programmes templates
    componentDidMount(){
        axios.get('http://localhost:8080/customer/getAllCustomers')
        .then(res => {
            const customers = res.data;
            this.setState({ customers });
            }
        )
        axios.get('http://localhost:8080/programTemplate/getAllProgramTemps')
        .then(res => {
            const programsT = res.data;
            this.setState({ programsT });
          }
        )
    } 

    // Input Change Handler method to take form inputs
    handleChange = (name, event) => {
    console.log(this.state.exercise);
    this.setState({ program: {
      ...this.state.program,
      [name]: event.target.value,
      title: event.target.value

    }});
    console.log(event.target);
    };

    handleSubmit = async event => {
        console.log('Testing')
        event.preventDefault();
        const { program } = this.state;
        const response = await fetch(`http://localhost:8080/program/assignProgramTemplate`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(program) // body data type must match "Content-Type" header
          });
          return await response.json(); // parses JSON response into native JavaScript objects
        }

       
    

render() {
    var optionsCustomer = [];
    this.state.customers.map((Customer) => {
          optionsCustomer.push(

        <option label={Customer.first_name}>
          {Customer.customer_id} 
        </option>
          )
        }
    );

    var optionsProgram = [];
    this.state.programsT.map((Program) => {
    optionsProgram.push(
        <option label={Program.title} >
        {Program.program_template_id}
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
        
            <h2 class="mbr-bold mbr-white  align-center display-1">Assign a Program to a Customer</h2> 
        
        <br/>
		<div class="custom-select container align-center" style={{width:"50%", marginTop:"50px",  height: "100%"}}>
		  	
              <select onChange={(e) => this.handleChange('customer_id', e)}>

		  	  	{optionsCustomer}
		  	  	

		  	</select>
		</div>
		<br/>
		<div class="custom-select container align-center" style={{ width:"50%", marginTop:"50px", height: "10%"}}>
		  	
            <select onChange={(e) => this.handleChange('program_template_id', e)}>
                {optionsProgram}
		  	</select>
		</div>
        
        <br/><br/><br/>
        <label for="name-form1-5" class="form-control-label mbr-fonts-style display-7" style={{color:"#FFFFFF"}}>Starting date</label>
        <input type="date" name="date" data-form-field="Starting Date" required="required" class="form-control display-7 centerize" id="name-form1-5" style={{width:"50%"}}/>
        <br/><br/>
        <a class="align-center col-md-6 btn btn-orange-outline" style={{color:"#FFFFFF", backgroundColor:"#C4643B"}}>ASSIGN</a>
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
