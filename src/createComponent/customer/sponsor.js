import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Table, Button } from 'semantic-ui-react';
import Select, { components } from 'react-select';
import Background from '../../assets/images/bk_hp.jpg';
import CanvasJSReact from '../../assets/canvas/canvasjs.react';
var Logo = require('../../assets/images/logo-mzt.png');

class Sponsor extends React.Component { 
    state = {
        column: null,
        offers: [],
        direction: null,
        points: {
            "totalPoints": null,
            "totalEarned": null,
            "totalRedeemed": null
        }
    };

    // Sort the table according to header
    handleSort = (clickedColumn) => () => {
        const { column, offers, direction } = this.state;
        if (column !== clickedColumn) {
            this.setState({
              column: clickedColumn,
              offers: _.sortBy(offers, [clickedColumn]),
              direction: 'ascending',
            });
            return;
        }
        this.setState({
            offers: offers.reverse(),
            direction: direction === 'ascending' ? 'descending' : 'ascending',
        });
    }

    handleClickBack = () => {
        this.props.history.push('/Homepage');
    };
    handleClickChallenge = () => {
        this.props.history.push(`/challenge/${this.props.match.params.customerID}`);
    };
    componentDidMount() {
        axios.get('http://localhost:8080/offer/getAllOffers')
        .then(res => {
            const offers = res.data;
            this.setState({offers});
        });
        axios.get(`http://localhost:8080/offerTransaction/getTotalPoints/${this.props.match.params.customerID}`)
        .then(res => {
            const points = res.data;
            this.setState({points});
        });
    };
    
    render() {
        this.handleSort('status');
        var optionsOffer = [];
        const { column, direction } = this.state;
        this.state.offers.map((Offer) => {
            optionsOffer.push(
                <Table.Row>
                    <Table.Cell href={Offer.link}><strong>{Offer.sponsor_name}</strong></Table.Cell>
                    <Table.Cell>{Offer.offer_description}</Table.Cell>
                    <Table.Cell>{Offer.offer_name}</Table.Cell>
                    <Table.Cell>{Offer.points}</Table.Cell>
                    <Table.Cell singleLine>
                        <Button primary size="small" href={Offer.website_url}>Get the offer</Button>
                    </Table.Cell>
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
                                      <img src={Logo} alt="MZT fitness" title="" />
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
                                <li class="nav-item">
                                    <a class="nav-link link text-white display-4" onClick={()=>this.props.history.push(`/challenge/${this.props.match.params.customerID}`)}>
                                        <span class="mbri-chat mbr-iconfont mbr-iconfont-btn"></span>
                                        Challenge
                                    </a>
                                </li>
                          </ul>
                      </div>
                  </nav>
                </section>
                
                <section class=" mbr-fullscreen" style={{backgroundImage: `url(${Background})`}}>
                    <div class="mbr-overlay" style={{opacity: 0.8, backgroundColor: "#232323"}}>
                    </div>

                    <div class="container">
                        <h2 class="mbr-bold mbr-white mbr-fonts-style display-1">Gifts</h2> <br/>   
                        <div>
                            <a class="align-center col-md-3 btn btn-orange-outline " onClick = {this.handleClickChallenge} style={{color: "#FFFFFF", backgroundColor: "#C4643B"}}>
                                Check the challenge page!</a>
                            <label class="form-control-label mbr-fonts-style " style={{color: "#ffffff", fontWeight: "bold"}}>Search a brand:  </label>
                            <input class="col-md-4" default="search" />
                        </div>
                        <br/>
                        <div>
                            <h5 style={{color:"#FFFFFF"}}>You currently have {this.state.points.totalPoints} points!</h5>   
                        </div>
                        <br />
                        <Table sortable celled structured>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell
                                      sorted={column === 'sponser_name' ? direction : null}
                                      onClick={this.handleSort('sponser_name')}
                                    >
                                        Sponsor Name
                                    </Table.HeaderCell>
                                    <Table.HeaderCell
                                      sorted={column == 'offer_description' ? direction : null}
                                      onClick={this.handleSort('offer_description')}
                                    >
                                        Description
                                    </Table.HeaderCell>
                                    <Table.HeaderCell
                                      sorted={column == 'offer_name' ? direction : null}
                                      onClick={this.handleSort('offer_name')}
                                    >
                                        Offer
                                    </Table.HeaderCell>
                                    <Table.HeaderCell
                                      sorted={column == 'points' ? direction : null}
                                      onClick={this.handleSort('points')}
                                    >
                                        Required points
                                    </Table.HeaderCell>
                                    
                                </Table.Row>
                            </Table.Header>
                            <Table.Body textAlign='center'>
                                {optionsOffer}
                            </Table.Body>
                        </Table>
                        <Button secondary onClick = {this.handleClickBack} floated='right'>Home</Button>
                    </div>
                </section>
                </body>
            );
        }       
    };

export default Sponsor;
