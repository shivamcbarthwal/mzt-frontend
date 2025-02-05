import React, { Component } from 'react';
import axios from 'axios';


class editSession extends Component {
    state = {
        exercises: []
    };
    componentDidMount() {
        axios.get('http://localhost:8080/exercise/getAllExercises/')
        .then(res => {
            const exercises = res.data;
            this.setState({exercises});
        });
    };
    render() {
        var optionsSession = [];
        this.state.exercises.map((sessionId) => {
            optionsSession.push(
                <div>
                    <div class="img-edit " data-toggle="modal">
                        <label class="form-control-label mbr-fonts-style display-7">{sessionId.name}</label> <br/><br/>
                        <img class="col-md-4" src="https://i.imgur.com/kYd3Yuk.png" alt="" title="" />
                        <button type="link" class="btn btn-form btn-warning display-4">
                            Delete this exercise
                        </button>
                        <button type="link" class="btn btn-form btn-warning display-4">
                            Edit this exercise
                        </button>

                    </div>
                    <br/>
                </div>
            )
        });
        return (
            <body>
                <section class="mbr-section content5 cid-rGostJvFvM mbr-parallax-background" id="content5-5">
                    <div class="container">
                        <div class="media-container-row">
                            <div class="title col-12 col-md-8">
                                <h2 class="align-center mbr-bold mbr-white pb-3 mbr-fonts-style display-1">Full body workout - Editing</h2>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="mbr-gallery mbr-slider-carousel cid-rGossidMiZ" id="gallery1-4">
                    <div class="container">
                        {optionsSession}
                    </div>
                    <br/>
                    <div class="col-md-12 input-group-btn align-center">
                        <button type="link" class="btn btn-form btn-warning display-4">
                            + Add an exercise
                        </button>
                    </div>
                </section>
            </body>
        );
    };
};

export default editSession;
