import React, { Component } from 'react';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';
import { Table, Button } from 'semantic-ui-react';
import _ from 'lodash';
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
        column: null,
        programs: [],
        direction: null
    };
    // Sort the table according to header
    handleSort = (clickedColumn) => () => {
        const { column, programs, direction } = this.state;
        if (column !== clickedColumn) {
            this.setState({
              column: clickedColumn,
              programs: _.sortBy(programs, [clickedColumn]),
              direction: 'ascending',
            });
            return;
        }
        this.setState({
            programs: programs.reverse(),
            direction: direction === 'ascending' ? 'descending' : 'ascending',
        });
    }
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
        this.handleSort('status');
        var optionsProgram = [];
        const { column, direction } = this.state;
        this.state.programs.map((Program) => {   
            optionsProgram.push(
                <Table.Row>
                    <Table.Cell><strong>{Program.title}</strong></Table.Cell>
                    <Table.Cell>{Program.description}</Table.Cell>
                    <Table.Cell>{Program.type}</Table.Cell>
                    <Table.Cell>{Program.duration} weeks</Table.Cell>
                     <Table.Cell singleLine>       
                    <Button primary size="small">See details</Button>
                    <Button primary size="small">Update</Button>
                    <Button primary size="small">Delete</Button>
                    </Table.Cell>
                </Table.Row>
            );        
        });
        return (
            <body>
                <section class=" mbr-parallax-background mbr-fullscreen" id="services6-7">
                    <div class="mbr-overlay" style= {{opacity: 0.6, backgroundColor: "#635a51"}}/>
                    <div class="container">
                        <h2 class="mbr-bold mbr-white mbr-fonts-style display-1">Programs</h2> <br/>
                        <div>
                            <a class="align-center col-md-2 btn btn-orange-outline " href='/createProgramT' style={{color: "#FFFFFF", backgroundColor: "#C4643B", fontSize: "80%"}}>
                                NEW PROGRAM
                            </a>
                            <label class="form-control-label mbr-fonts-style " style={{color: "#ffffff", fontWeight: "bold"}}>Search :  </label>
                            <input class="col-md-4" default="search" />
                            <Button secondary onClick = {this.handleClickBack} floated='right'>Back</Button>
                        </div>
                        <br/><br/>
                            <Table sortable celled structured>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell
                                          sorted={column === 'title' ? direction : null}
                                          onClick={this.handleSort('tite')}
                                        >
                                            TITLE
                                        </Table.HeaderCell>
                                        <Table.HeaderCell
                                          sorted={column == 'description' ? direction : null}
                                          onClick={this.handleSort('description')}
                                        >
                                            DESCRIPTION
                                        </Table.HeaderCell>
                                        <Table.HeaderCell
                                          sorted={column == 'type' ? direction : null}
                                          onClick={this.handleSort('type')}
                                        >
                                            TYPE
                                        </Table.HeaderCell>
                                        <Table.HeaderCell
                                          sorted={column == 'duration' ? direction : null}
                                          onClick={this.handleSort('duration')}
                                        >
                                            DURATION
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            OPERATIONS
                                        </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body textAlign='center'>
                                    {optionsProgram}
                                </Table.Body>
                            </Table>
                            <Button secondary onClick = {this.handleClickBack} floated='right'>Back</Button>
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
