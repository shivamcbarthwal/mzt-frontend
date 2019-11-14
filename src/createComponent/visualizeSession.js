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

class visualizeSession extends Component {
    state = {
        sessions: []
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
        this.state.sessions.map((Session) => {   
            optionsSession.push(
                <Table.Row>
                    <Table.Cell><strong>{Session.name}</strong></Table.Cell>
                    <Table.Cell>{Session.session_coach_notes}</Table.Cell>
                    <Table.Cell>
                        <Button primary size="small">See details</Button>
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
                            <a class="align-center col-md-3 btn btn-orange-outline " href='/SessionCreate' style={{color: "#FFFFFF", backgroundColor: "#C4643B"}}>
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

export default visualizeSession;
    