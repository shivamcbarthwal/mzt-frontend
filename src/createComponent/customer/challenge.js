import React from 'react'
import axios from 'axios'
import 'semantic-ui-css/semantic.min.css'
import { Table, Button, Image } from 'semantic-ui-react'
import _ from 'lodash';
import Background from '../../assets/images/bk_hp.jpg'
var Logo = require('../../assets/images/logo-mzt.png')
var certificate = require("../../assets/images/certificate.png")
const cust_id = '5dc53fb7717676384459fe63'

class Challenge extends React.Component {
    state = {
        column: null,
        challenges: [],
        direction: null,
        points: {
            "totalPoints": null,
            "totalEarned": null,
            "totalRedeemed": null
          },
        transactions: null
    };
    // Sort the table according to header
    handleSort = (clickedColumn) => () => {
        const { column, challenges, direction } = this.state;
        if (column !== clickedColumn) {
            this.setState({
              column: clickedColumn,
              challenges: _.sortBy(challenges, [clickedColumn]),
              direction: 'ascending',
            });
            return;
        }
        this.setState({
            challenges: challenges.reverse(),
            direction: direction === 'ascending' ? 'descending' : 'ascending',
        });
    }
    handleClickBack = () => {
        this.props.history.push('/homepage');
    };
    handleClickSponsor = () => {
        this.props.history.push('/sponsor');
    };
    componentDidMount() {
        axios.get('http://localhost:8080/challenge/getAllChallenges')
        .then(res => {
            const challenges = res.data;
            this.setState({challenges});
        });
        axios.get(`http://localhost:8080/offerTransaction/getTotalPoints/${this.props.match.params.customerID}`)
        .then(res => {
            const points = res.data;
            this.setState({points});
        });
        axios.get(`http://localhost:8080//offerTransaction/getAllTransByCustomerId/${this.props.match.params.customerID}`)
        .then(res => {
            const transactions = res.data;
            this.setState({transactions});
        });
    };
    
    render() {
        console.log("state: "+JSON.stringify(this.state)
                )
        this.handleSort('status');
        var optionChallenge = [];
        const { column, direction } = this.state;
        this.state.challenges.map((Challenge) => {   
            optionChallenge.push(
                <Table.Row>
                    <Table.Cell><strong>{Challenge.description}</strong></Table.Cell>
                    <Table.Cell>{Challenge.type}</Table.Cell>
                </Table.Row>
            );        
        });
        return (
            <body>
              <section class="menu cid-rFxS6PmLUN" once="menu" id="menu1-a"> 
                <nav class="navbar navbar-expand beta-menu navbar-dropdown align-items-center navbar-fixed-top navbar-toggleable-sm bg-color transparent">
                  <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                      <div class="hamburger">
                          <span></span>
                          <span></span>
                          <span></span>
                          <span></span>
                      </div>
                  </button>
                  <div class="menu-logo">
                      <div class="navbar-brand">
                          <span class="navbar-logo">
                              <a href="/homepage">
                                  <img src={Logo} alt="MZT fitness" />
                              </a>
                          </span>
                          <span class="navbar-caption-wrap">
                              <a class="navbar-caption text-white display-4" href="/homepage">
                                  MZT FITNESS
                              </a>
                          </span>
                      </div>
                  </div>
                  <div class="collapse navbar-collapse" id="navbarSupportedContent">
                      <ul class="navbar-nav nav-dropdown nav-right" data-app-modern-menu="true">
                          <li class="nav-item">
                              <a class="nav-link link text-white display-4" href="/homepage">
                                  <span class="mbri-home mbr-iconfont mbr-iconfont-btn"></span>
                                  Home page
                              </a>
                          </li>
                      </ul>
                  </div>
              </nav>
            </section>

            <section class="header10 cid-rFCyM8AuwD mbr-fullscreen mbr-parallax-background" id="header10-o">
                <div class="mbr-overlay"> 
                </div>

                <div class="container">
                    <h2 class="mbr-white mbr-fonts-style m-0 display-1 align-center">
                        Challenge yourself and earn points
                    </h2>      
                    <br/>
                    <div class="container align-center">
                    </div>
                    <div class="container align-center">
                        <h1 class="mbr-section-title mbr-bold mbr-fonts-style mbr-white display-2">
                            <Image src={certificate} alt="Certificate" size="small" centered/>
                            {this.state.points.totalPoints} points
                        </h1>	
                        <Button onClick = {this.handleClickSponsor} floated='center' color='green'>Convert to vouchers</Button>
                    </div>
                    <br/>
                    <Table sortable celled structured>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell
                                  sorted={column === 'description' ? direction : null}
                                  onClick={this.handleSort('description')}
                                >
                                    CHALLENGE
                                </Table.HeaderCell>
                                <Table.HeaderCell
                                  sorted={column == 'type' ? direction : null}
                                  onClick={this.handleSort('type')}
                                >
                                    STATUS
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body textAlign='center'>
                            {optionChallenge}
                        </Table.Body>
                    </Table>  
                </div>  
            </section>
        </body>
    )
  }
}

export default Challenge;