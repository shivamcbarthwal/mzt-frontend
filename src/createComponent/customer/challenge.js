import React from 'react';
import axios from 'axios';
import { Table, Button, Image, Confirm } from 'semantic-ui-react'
import _ from 'lodash';
import Background from '../../assets/images/bk_hp.jpg';
import Wheel from '../../../node_modules/lottery-wheel/dist/lottery-wheel.min.js';
import ReactTurntable from "react-turntable";
import "../../../node_modules/react-turntable/assets/index.css";
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
        transactions: [],
        challenges: [],
        text: []
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
    handleSubmit = (challId) => {
        console.log('Testing');
        console.log('Challenge Id: '+challId);
        axios.post('http://localhost:8080/offerTransaction/challengeCustomer', {
            customer_id: this.props.match.params.customerID,
            challenge_id: challId
        })
        .then(res => {
            console.log(res)
        });
        window.location.href='/challenge/'+this.props.match.params.customerID;
    };
    componentDidMount() {
        // To display some of the challenges on the lottery wheel
        axios.get(`http://localhost:8080/challenge/getRandom6Challenges`) 
        .then(res => {
            const challenges = res.data;
            console.log("challenges："+challenges)
            var texts = [];
            challenges.map(challenge=>{
                texts.push(challenge.name);
            });
            this.setState({text: texts, challenges: challenges}, ()=>{
                console.log('text of state: ' + this.state.text)
            })
        });
        axios.get(`http://localhost:8080/offerTransaction/getTotalPoints/${this.props.match.params.customerID}`)
        .then(res => {
            const points = res.data;
            console.log("res.data: "+JSON.stringify(res.data));
            this.setState({points});
        });
        axios.get('http://localhost:8080/offerTransaction/getAllTransByCustomerId/'+this.props.match.params.customerID)
        .then(res => {
            const transactions = res.data;
            this.setState({transactions});
        });
        
    };
    
    render() {
        this.handleSort('status');
        var transactionDone = [];
        var transactionProgress = [];
        var transactionFail = [];
        var transactionSpent = [];
        var pointEarn = 0;
        var pointProgress = 0;
        var pointFail = 0;
        var pointSpent = 0;
        const wheel = [];
        const confirm = [];
        const { column, direction, transactions, text, challenges} = this.state;
        console.log('texts in render: '+text)
        if(transactions.length){
            Object.keys(transactions).map((Transaction,index) => {  
                if(String(transactions[Transaction].transaction_type) === 'IN_PROGRESS'){
                    transactionProgress.push(
                        <Table.Row>
                            <Table.Cell colSpan='2'><strong>{String(transactions[Transaction].challenge_id.description)}</strong></Table.Cell>
                            <Table.Cell>{String(transactions[Transaction].points)}</Table.Cell>
                            <Table.Cell>{String(transactions[Transaction].transaction_type)}</Table.Cell>
                        </Table.Row>
                    );
                    pointProgress = pointProgress + Number(transactions[Transaction].points);
                }
                if(String(transactions[Transaction].transaction_type) === 'EARNED'){
                    transactionDone.push(
                        <Table.Row>
                            <Table.Cell colSpan='2'><strong>{String(transactions[Transaction].challenge_id.description)}</strong></Table.Cell>
                            <Table.Cell>{String(transactions[Transaction].points)}</Table.Cell>
                            <Table.Cell>{String(transactions[Transaction].transaction_type)}</Table.Cell>
                        </Table.Row>
                    );
                    pointEarn = pointEarn + Number(transactions[Transaction].points);
                }
                if(String(transactions[Transaction].transaction_type) === 'NOT_EARNED'){
                    transactionFail.push(
                        <Table.Row>
                            <Table.Cell colSpan='2'><strong>{String(transactions[Transaction].challenge_id.description)}</strong></Table.Cell>
                            <Table.Cell>{String(transactions[Transaction].points)}</Table.Cell>
                            <Table.Cell>{String(transactions[Transaction].transaction_type)}</Table.Cell>
                        </Table.Row>
                    );
                    pointFail = pointFail + Number(transactions[Transaction].points);
                }
                if(String(transactions[Transaction].transaction_type) === 'REDEEMED'){
                    transactionSpent.push(
                        <Table.Row>
                            <Table.Cell><strong>{String(transactions[Transaction].offer_id.sponsor_name)}</strong></Table.Cell>
                            <Table.Cell><strong>{String(transactions[Transaction].offer_id.offer_name)}</strong></Table.Cell>
                            <Table.Cell>{String(transactions[Transaction].offer_id.points)}</Table.Cell>
                        </Table.Row>
                    );
                    pointSpent = pointSpent + Number(transactions[Transaction].offer_id.points);
                }
            });
            if(!transactionProgress.length){
                wheel.push(
                    <ReactTurntable prizes = {text} width = {600} height = {600}
                        primaryColor = "#83AF9B" secondaryColor = "#C8C8A9"
                        fontStyle = {{ 
                            color:"#fff",
                            size:"20px",
                            fontVertical:true,
                            fontWeight:"bold"
                        }} speed = {2000} duration = {3000} clickText = "Click"
                        onComplete = {(prize)=>{
                            challenges.map(challenge => {
                                if(prize === challenge.name){
                                    console.log(challenge.description);
                                    if(
                                        window.confirm("Are you sure to accept this challenge: \n" + challenge.description)
                                    ){
                                        this.handleSubmit(challenge._id);
                                    };
                                };
                            })
                        }}
                        />
                )
                document.getElementById('wheel-div').removeAttribute('hidden');
            }
            document.getElementById('challenge').removeAttribute('hidden');
            document.getElementById('points').removeAttribute('hidden');
            if(transactionSpent.length){
                document.getElementById('point').removeAttribute('hidden');
            }
        }
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
                    <br/><br/>
                    <h2 class="mbr-white">Try a new challenge!</h2>
                    <div style={{
                        justifyContent:"center",
                        alignContent:"center",
                        display:"flex"
                    }} hidden id='wheel-div'>
                        {wheel}
                    </div>
                    <div id='confirm'>
                        {confirm}
                    </div>
                    <div class="container align-center">
                        <h1 class="mbr-section-title mbr-bold mbr-fonts-style mbr-white display-2" id='points' hidden>
                            <Image src={certificate} alt="Certificate" size="small" centered/>
                            {this.state.points.totalPoints} points
                        </h1>
                        <Button onClick = {this.handleClickSponsor} floated='center' color='green'>See offers</Button>
                    </div>
                    <br/><br/>
                    <div hidden id='challenge'>
                    <h2 class="mbr-white mbr-fonts-style m-0 display-5">
                        Challenges History
                    </h2>
                    <Table sortable celled structured>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell colSpan='2'>
                                    CHALLENGE
                                </Table.HeaderCell>
                                <Table.HeaderCell colSpan='1'>
                                    POINTS
                                </Table.HeaderCell>
                                <Table.HeaderCell colSpan='1'
                                  sorted={column == 'transaction_type' ? direction : null}
                                  onClick={this.handleSort('transaction_type')}
                                >
                                    STATUS
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body textAlign='center'>
                            {transactionProgress}
                            {transactionDone}
                            {transactionFail}
                        </Table.Body>
                        <Table.Footer>
                            <Table.Row>
                                <Table.Cell><strong>RESULT</strong></Table.Cell>
                                <Table.Cell positive>
                                    <strong>{pointEarn} Points Earned</strong>
                                </Table.Cell>
                                <Table.Cell warning>
                                    <strong>{pointProgress} Points In Progress</strong>
                                </Table.Cell>
                                <Table.Cell negative>
                                    <strong>{pointFail} Points Failed</strong>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Footer>
                    </Table>
                    </div>
                    <br/><br/>
                    <div hidden id='point'>
                    <h2 class="mbr-white mbr-fonts-style m-0 display-5">
                        Points Spent History
                    </h2>
                    <Table sortable celled structured>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>
                                    BRAND
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                    OFFER
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                    POINTS
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body textAlign='center'>
                            {transactionSpent}
                        </Table.Body>
                        <Table.Footer>
                            <Table.Row>
                                <Table.Cell><strong>RESULT</strong></Table.Cell>
                                <Table.Cell warning colSpan='2' textAlign='center' verticalAlign='middle'>
                                    <strong>{pointSpent} Points Spent</strong>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Footer>
                    </Table>
                    </div>
                </div>  
            </section>
        </body>
    )
  }
}

export default Challenge;
