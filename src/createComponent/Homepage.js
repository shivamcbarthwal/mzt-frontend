import React from 'react';
import '../assets/web/assets/mobirise-icons/mobirise-icons.css';
import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/bootstrap/css/bootstrap-grid.min.css';
import '../assets/bootstrap/css/bootstrap-reboot.min.css';
import '../assets/tether/tether.min.css';
import '../assets/dropdown/css/style.css';
import '../assets/theme/css/style.css';
import '../assets/mobirise/css/mbr-additional.css';
import Background from '../assets/images/bk_hp.jpg';

class Homepage extends React.Component {
    render() {
        return (
            <div className="App">
                <body>
                    <section class=" mbr-fullscreen" style={{backgroundImage: `url(${Background})`}}>
                        <div class="mbr-overlay" style={{opacity: 0.8, backgroundColor: "#232323"}}/>
                        <div class="container align-center">
                            <div class="mbr-white centerize">
                                <a class="btn btn-white-outline" href="listOfPrograms">WORKOUT</a> 
                                <p class="">LET'S START NOW !&nbsp;<br/>REACH YOUR GOALS</p>  
                                <a class="btn btn-white-outline" href="dashboard">DASHBOARD</a>
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
    };
};

export default Homepage;
