import React, { Component } from 'react';

export default class CreateProgramT extends Component {
    handleClickBack = () => {
        this.props.history.push('/visualizeProgram');
    };
    render() {
        return (
            <div>
                <h1>Create Program Templates</h1>
                <div class="align-right">
                    <button type="button" class="btn btn-primary btn-lg active" role="button" aria-pressed="true" onClick = {this.handleClickBack}>
                        <span class="mbrib-arrow-prev mbr-iconfont mbr-iconfont-btn"/>
                        Back
                    </button>
                </div>
            </div>
        );
    };
};