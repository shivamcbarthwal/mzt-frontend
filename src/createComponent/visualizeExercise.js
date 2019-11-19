import React, { Component } from 'react';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';
import { Table, Button, Modal, ModalHeader, ModalContent, TableBody, TableCell, Image } from 'semantic-ui-react';
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
import '../assets/mobirise/css/mbr-additional.css';

class visualizeExercise extends Component {
    state = {
        column: null,
        exercises: [],
        direction: null
    };
    // Sort the table according to header
    handleSort = (clickedColumn) => () => {
        const { column, exercises, direction } = this.state;
        if (column !== clickedColumn) {
            this.setState({
              column: clickedColumn,
              exercises: _.sortBy(exercises, [clickedColumn]),
              direction: 'ascending',
            });
            return;
        }
        this.setState({
            exercises: exercises.reverse(),
            direction: direction === 'ascending' ? 'descending' : 'ascending',
        });
    }
    handleClickBack = () => {
        this.props.history.push('/');
    };
    componentDidMount() {
        axios.get('http://localhost:8080/exercise/getAllExercises')
        .then(res => {
            const exercises = res.data;
            this.setState({exercises});
        });
    };
    render() {  
        this.handleSort('status');
        var optionsExercise = [];
        const { column, direction } = this.state;
        this.state.exercises.map((Exercise) => {
            var tags = [];
            Exercise.exercise_tag.map(tag=>{
                tags.push(tag + "; ");
            })
           optionsExercise.push(
                <Table.Row>
                    <Table.Cell><strong>{Exercise.name}</strong></Table.Cell>
                    <Table.Cell>{Exercise.exercise_type}</Table.Cell>
                    <Table.Cell>{Exercise.muscles_targeted}</Table.Cell>
                    <Table.Cell>{Exercise.equipment_required}</Table.Cell>
                    <Table.Cell singleLine>
                        <Modal trigger={<Button primary size="small">See details</Button>} style={{marginLeft:'300px'}} closeIcon>
                            <ModalHeader style={{textAlign:'center'}}>{Exercise.name}</ModalHeader>
                            <ModalContent>
                                <Table>
                                    <TableBody>
                                        <Table.Row>
                                            <TableCell><strong>Tag</strong></TableCell>
                                            <TableCell>{tags}</TableCell>
                                        </Table.Row>
                                        <Table.Row>
                                            <TableCell><strong>Description</strong></TableCell>
                                            <TableCell>{Exercise.description}</TableCell>
                                        </Table.Row>
                                        <Table.Row>
                                            <TableCell><strong>Equipement Required</strong></TableCell>
                                            <TableCell>{Exercise.equipment_required}</TableCell>
                                        </Table.Row>
                                        <Table.Row>
                                            <TableCell><strong>Type</strong></TableCell>
                                            <TableCell>{Exercise.exercise_type}</TableCell>
                                        </Table.Row>
                                        <Table.Row>
                                            <TableCell><strong>Targeted Muscles</strong></TableCell>
                                            <TableCell>{Exercise.muscles_targeted}</TableCell>
                                        </Table.Row>
                                        <Table.Row>
                                            <TableCell><strong>Set Break</strong></TableCell>
                                            <TableCell>{Exercise.set_break}</TableCell>
                                        </Table.Row>
                                        <Table.Row>
                                            <TableCell><strong>Repetition</strong></TableCell>
                                            <TableCell>{Exercise.repetition}</TableCell>
                                        </Table.Row>
                                        <Table.Row>
                                            <TableCell><strong>Time</strong></TableCell>
                                            <TableCell>{Exercise.time}</TableCell>
                                        </Table.Row>
                                        <Table.Row>
                                            <TableCell><strong>Sets</strong></TableCell>
                                            <TableCell>{Exercise.sets}</TableCell>
                                        </Table.Row>
                                        <Table.Row>
                                            <TableCell><strong>Estimated Duration</strong></TableCell>
                                            <TableCell>{Exercise.exercise_est_duration}</TableCell>
                                        </Table.Row>
                                        <Table.Row>
                                            <TableCell><strong>Image</strong></TableCell>
                                            <TableCell><Image src={Exercise.exercise_img_url}></Image></TableCell>
                                        </Table.Row>
                                    </TableBody>
                                </Table>
                            </ModalContent>
                        </Modal>
                        
                        <Button primary size="small">Update</Button>
                        <Button primary size="small">Delete</Button>
                    </Table.Cell>
                </Table.Row>
            );
        });
        return (
            <body>
                <section class=" cid-rGowQrNiDe mbr-parallax-background" id="services6-7">
                    <div class="mbr-overlay" style= {{opacity: 0.6, backgroundColor: "#635a51"}}/>
                    <div class="container">
                        <h2 class="mbr-bold mbr-white mbr-fonts-style display-1">Exercises</h2> <br/>
                            
                        <div>
                            <a class="align-center col-md-3 btn btn-orange-outline " href='/ExerciseCreate' style={{color: "#FFFFFF", backgroundColor: "#C4643B"}}>
                                NEW EXERCISE</a>
                            <label class="form-control-label mbr-fonts-style " style={{color: "#ffffff", fontWeight: "bold"}}>Search :  </label>
                            <input class="col-md-4" default="search" />
                            <Button secondary onClick = {this.handleClickBack} floated='right'>Back</Button>
                        </div>
                        <br /><br/>
                        <Table sortable celled structured>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell
                                      sorted={column === 'name' ? direction : null}
                                      onClick={this.handleSort('name')}
                                    >
                                        NAME
                                    </Table.HeaderCell>
                                    <Table.HeaderCell
                                      sorted={column == 'exercise_type' ? direction : null}
                                      onClick={this.handleSort('exercise_type')}
                                    >
                                        TYPE
                                    </Table.HeaderCell>
                                    <Table.HeaderCell
                                      sorted={column == 'muscles_targeted' ? direction : null}
                                      onClick={this.handleSort('muscles_targeted')}
                                    >
                                        MUSCLES TARGETED
                                    </Table.HeaderCell>
                                    <Table.HeaderCell
                                      sorted={column == 'equipment_required' ? direction : null}
                                      onClick={this.handleSort('equipment_required')}
                                    >
                                        EQUIPEMENT
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>
                                        OPERATIONS
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body textAlign='center'>
                                {optionsExercise}
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

export default visualizeExercise;
