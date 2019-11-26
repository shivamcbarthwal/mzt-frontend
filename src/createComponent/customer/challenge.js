import React from 'react'
import axios from 'axios'
import { Table, Button, Image } from 'semantic-ui-react'
import _ from 'lodash';
import Background from '../../assets/images/bk_hp.jpg'
var Logo = require('../../assets/images/logo-mzt.png')
var certificate = require("../../assets/images/certificate.png")

class Challenge extends React.Component {
    state = {
        column: null,
        direction: null,
        points: {
            "totalPoints": null,
            "totalEarned": null,
            "totalRedeemed": null
          },
        transactions: []
    };
    // Sort the table according to header
    handleSort = (clickedColumn) => () => {
        const { column, transactions, direction } = this.state;
        if (column !== clickedColumn) {
            this.setState({
              column: clickedColumn,
              transactions: _.sortBy(transactions, [clickedColumn]),
              direction: 'ascending',
            });
            return;
        }
        this.setState({
            transactions: transactions.reverse(),
            direction: direction === 'ascending' ? 'descending' : 'ascending',
        });
    }
    handleClickBack = () => {
        this.props.history.push('/homepage');
    };
    handleClickSponsor = () => {
        this.props.history.push(`/sponsor/${this.props.match.params.customerID}`);
    };
    // Submit handler to add new challenge
    handleSubmit = async event => {
        console.log('Testing');
        event.preventDefault();
        const {newChallenge} = this.state;
        const response = await fetch(`http://localhost:8080/offerTransaction/challengeCustomer`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newChallenge) // body data type must match "Content-Type" header
        });
        this.props.history.push(`/challenge/${this.props.match.params.customerID}`);
        return await response.json(); // parses JSON response into native JavaScript objects
    };
    componentDidMount() {
        // To display some of the challenges on the lottery wheel
        axios.get(`http://localhost:8080/challenge/getAllChallenges`) 
        .then(res => {
            const challenges = res.data;
            this.setState({challenges});
        });
        //To display the total points a customer has
        axios.get(`http://localhost:8080/offerTransaction/getTotalPoints/${this.props.match.params.customerID}`)  
        .then(res => {
            const points = res.data;
            console.log("res.data: "+JSON.stringify(res.data));
            this.setState({points});
        });
        // To display the history of challenges done, canceled or in progress
        axios.get(`http://localhost:8080/offerTransaction/findByCustAndTransType?customer_id=${this.props.match.params.customerID}&transaction_type=EARNED&transaction_type=IN_PROGRESS`)
        .then(res => {
            const transactions = res.data;
            this.setState({transactions});
        });

    };
    
    render() {
        this.handleSort('status');
        var optionTransaction = [];
        const { column, direction, transactions} = this.state;
        Object.keys(transactions).map((Transaction,index) => {  
            optionTransaction.push(
                <Table.Row>
                    <Table.Cell><strong>{String(transactions[Transaction].challenge_id.description)}</strong></Table.Cell>
                    <Table.Cell>{String(transactions[Transaction].transaction_type)}</Table.Cell>
                </Table.Row>
            );        
        });
        
        return (
            <body>
              <section class="menu cid-rFxS6PmLUN" once="menu" id="menu1-a"> 
                <nav class="navbar navbar-expand beta-menu navbar-dropdown align-items-center navbar-fixed-top navbar-toggleable-sm bg-color transparent">
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
                        <Button onClick = {this.handleClickSponsor} floated='center' color='green'>See offers</Button>
                    </div>
                    <br/><br/>
                    <h2 class="mbr-white mbr-fonts-style m-0 display-5">
                        Challenges history
                    </h2>
                    <Table sortable celled structured>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>
                                    CHALLENGE
                                </Table.HeaderCell>
                                <Table.HeaderCell
                                  sorted={column == 'transaction_type' ? direction : null}
                                  onClick={this.handleSort('transaction_type')}
                                >
                                    STATUS
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body textAlign='center'>
                            {optionTransaction}
                        </Table.Body>
                    </Table>  
                </div>  
            </section>
        </body>
    )
  }
}

export default Challenge;
