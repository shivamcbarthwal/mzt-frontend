import React, { Component } from 'react';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';
import { Table, Button, TableBody, TableCell, Modal, ModalHeader, ModalContent } from 'semantic-ui-react';
import _ from 'lodash';
import Select, { components } from 'react-select';
import Background from '../../assets/images/prog_bk.jpg';
import { program } from '@babel/template';

class VisualizeProgram extends Component {
    state = {
        column: null,
        programs: [],
        original_programs: [],
        direction: null
    };
    fixBody() {
        const anotherModal = document.getElementsByClassName('ui page modals').length;
        if (anotherModal > 0) document.body.classList.add('scrolling', 'dimmable', 'dimmed');
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
    };
    handleClickBack = () => {
        this.props.history.push('/');
    };
    componentDidMount() {
        axios.get('http://localhost:8080/programTemplate/getAllProgramTemps')
        .then(res => {
            const programs = res.data;
            this.setState({programs, original_programs: programs});
        });
    };

    handleFilter = value => {
        const {original_programs} = this.state;

        let programs = original_programs;

        if (value) {
            programs = original_programs.filter(program => new RegExp(`.*${value}.*`, "i").test(program.title));
        }

        this.setState({programs});
    }
    render() {
        this.handleSort('status');
        var optionProgram = [];
        const { column, direction, programs } = this.state;
        Object.keys(programs).map((Program,index) => {
            var optionSession = [];
            programs[Program].sessions.map((Session, index) => {
                var optionExercise1 = [];
                var optionExercise2 = [];
                Session.exercises.map((Exercise, index) => {
                    optionExercise1.push(
                            <TableCell><strong>Exercise {index + 1}</strong></TableCell>
                    );
                    optionExercise2.push(
                            <TableCell>{String(Exercise.name)}</TableCell>
                    );
                });
                optionSession.push(
                        <Table.Row>
                            <TableCell><strong>Session {index + 1}</strong></TableCell>
                            <TableCell>{String(Session.name)}</TableCell>
                            <TableCell>
                                <Modal trigger={<Button primary size="small">See details</Button>} closeIcon size='fullscreen' centered={false}>
                                    <ModalHeader style={{textAlign:'center'}}>{String(programs[Program].title)}</ModalHeader>
                                    <ModalContent scrolling={true}>
                                        <Table>
                                            <TableBody>
                                                <Table.Row>{optionExercise1}</Table.Row>
                                                <Table.Row>{optionExercise2}</Table.Row>
                                            </TableBody>
                                        </Table>
                                    </ModalContent>
                                </Modal>
                            </TableCell>
                        </Table.Row>
                );
            });
            optionProgram.push(
                <Table.Row>
                    <Table.Cell><strong>{String(programs[Program].title)}</strong></Table.Cell>
                    <Table.Cell>{String(programs[Program].description)}</Table.Cell>
                    <Table.Cell>{String(programs[Program].type)}</Table.Cell>
                    <Table.Cell>{String(programs[Program].duration)} weeks</Table.Cell>
                    <Table.Cell singleLine>       
                        <Modal trigger={<Button primary size="small">See details</Button>} closeIcon size='fullscreen' centered={false}>
                            <ModalHeader style={{textAlign:'center'}}>{String(programs[Program].title)}</ModalHeader>
                            <ModalContent scrolling={true}>
                                <Table>
                                    <TableBody>
                                        {optionSession}
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
                <section class=" mbr-parallax-background mbr-fullscreen" style={{backgroundImage: `url(${Background})`}} id="services6-7">
                    <div class="mbr-overlay" style= {{opacity: 0.6, backgroundColor: "#000000"}}/>
                    <div class="container">
                        <h2 class="mbr-bold mbr-white mbr-fonts-style display-1">Programs</h2> <br/>
                        <div>
                            <a class="align-center col-md-2 btn btn-orange-outline " href='/createProgramT' style={{color: "#FFFFFF", backgroundColor: "#C4643B", fontSize: "80%"}}>
                                NEW PROGRAM
                            </a>
                            <label class="form-control-label mbr-fonts-style " style={{color: "#ffffff", fontWeight: "bold"}}>Search :  </label>
                            <input class="col-md-4" default="search" onChange={e => this.handleFilter(e.target.value)} />
                            <Button secondary onClick = {this.handleClickBack} floated='right'>Back</Button>
                        </div>
                        <br/><br/>
                            <Table sortable celled structured>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell sorted={column === 'title' ? direction : null} onClick={this.handleSort('title')} > TITLE </Table.HeaderCell>
                                        <Table.HeaderCell sorted={column == 'description' ? direction : null} onClick={this.handleSort('description')} > DESCRIPTION </Table.HeaderCell>
                                        <Table.HeaderCell sorted={column == 'type' ? direction : null} onClick={this.handleSort('type')} > TYPE </Table.HeaderCell>
                                        <Table.HeaderCell sorted={column == 'duration' ? direction : null} onClick={this.handleSort('duration')} > DURATION </Table.HeaderCell>
                                        <Table.HeaderCell> OPERATIONS </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body textAlign='center'> {optionProgram} </Table.Body>
                            </Table>
                            <Button secondary onClick = {this.handleClickBack} floated='right'>Back</Button>
                    </div>
                </section>
            </body>
        );
    };
};

export default VisualizeProgram;
