import React, { Component } from 'react';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';
import { Table, Button, Modal, ModalHeader, ModalContent, TableBody, TableCell, Image } from 'semantic-ui-react';
import _ from 'lodash';
import Select, { components } from 'react-select';


class VisualizeSession extends Component {
    state = {
        column: null,
        sessions: [],
        direction: null
    };
     // Sort the table according to header
    handleSort = (clickedColumn) => () => {
        const { column, sessions, direction } = this.state;
        if (column !== clickedColumn) {
            this.setState({
              column: clickedColumn,
              sessions: _.sortBy(sessions, [clickedColumn]),
              direction: 'ascending',
            });
            return;
        }
        this.setState({
            sessions: sessions.reverse(),
            direction: direction === 'ascending' ? 'descending' : 'ascending',
        });
    }
    handleClickBack = () => {
        this.props.history.push('/');
    };
    componentDidMount() {
        
        axios.get('http://localhost:8080/sessionTemplate/getAllSessionTemps')
        .then(res => {
            const sessions = res.data;
            this.setState({sessions});
        });
    };
    render() {
        this.handleSort('status');
        var optionsSession = [];
        const { column, direction } = this.state;
        this.state.sessions.map((Session, index) => { 
            var tags = [];
            var optionExercises = [];
            Session.session_template_tag.map((tag,index)=>{
                tags.push(tag + "; ");
            });
            axios.get('http://localhost:8080/sessionTemplate/showInformation/'+Session._id)
            .then(res => {
                var exercises = res.data.exercises;
                console.log("Session: "+exercises);
                Object.keys(exercises).map((key,index) =>{
                    optionExercises.push(
                        <p>{String(exercises[key].name)}</p>
                    )
                });
            });
            optionsSession.push(
                <Table.Row>
                    <Table.Cell><strong>{Session.name}</strong></Table.Cell>
                    <Table.Cell>{Session.session_coach_notes}</Table.Cell>
                    <Table.Cell singleLine>
                        <Modal trigger={<Button primary size="small">See details</Button>} style={{marginLeft:'300px'}} closeIcon>
                            <ModalHeader style={{textAlign:'center'}}>{Session.name}</ModalHeader>
                            <ModalContent>
                                <Table>
                                    <TableBody>
                                        <Table.Row>
                                            <TableCell><strong>Tag</strong></TableCell>
                                            <TableCell>{tags}</TableCell>
                                        </Table.Row>
                                        <Table.Row>
                                            <TableCell><strong>Description</strong></TableCell>
                                            <TableCell>{Session.session_coach_notes}</TableCell>
                                        </Table.Row>
                                        <Table.Row>
                                            <TableCell><strong>Type</strong></TableCell>
                                            <TableCell>{Session.session_type}</TableCell>
                                        </Table.Row>
                                        <Table.Row>
                                            <TableCell><strong>Duration</strong></TableCell>
                                            <TableCell>{Session.session_duration}</TableCell>
                                        </Table.Row>
                                        <Table.Row>
                                            <TableCell><strong>Exercises</strong></TableCell>
                                            <TableCell>{optionExercises}</TableCell>
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
                        <h2 class="mbr-bold mbr-white mbr-fonts-style display-1">Sessions</h2>
                        <br/>
                        <div>
                            <a class="align-center col-md-3 btn btn-orange-outline " href='/createSession' style={{color: "#FFFFFF", backgroundColor: "#C4643B"}}>
                                NEW SESSION
                            </a>
                            <label class="form-control-label mbr-fonts-style " style={{color: "#ffffff", fontWeight: "bold"}}>Search :  </label>
                            <input class="col-md-4" default="search"/>
                            <Button secondary onClick = {this.handleClickBack} floated='right'>Back</Button>
                        </div>
                        <br/><br/>
                            <Table sortable celled structured>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell
                                          sorted={column === 'name' ? direction : null}
                                          onClick={this.handleSort('name')}
                                        >
                                            TITLE
                                        </Table.HeaderCell>
                                        <Table.HeaderCell
                                          sorted={column == 'session_coach_notes' ? direction : null}
                                          onClick={this.handleSort('session_coach_notes')}
                                        >
                                            DESCRIPTION
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            OPERATIONS
                                        </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body textAlign='center'>
                                    {optionsSession}
                                </Table.Body>
                            </Table>
                            <Button secondary onClick = {this.handleClickBack} floated='right'>Back</Button>
                    </div>
                </section>
            </body>
        );
    };
};

export default VisualizeSession;
    
