import React, { Component } from "react";

export default class Room extends Component {
    constructor(props) {
        super(props);
        this.state = {
            votesToSkip: 2,
            guestCanPause: false,
            isHost: false,
        };
        // These lines below will update the state
        this.roomCode = this.props.match.params.roomCode;
        this.getRoomDetails();
    }

    getRoomDetails() {
        fetch("/api/get-room" + "?code=" + this.roomCode)
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    // votesToSkip is react variable
                    // .data is turning the oop into json
                    // votes_to_skip is what we are getting in music_controller views.py class GetRoom
                    votesToSkip: data.votes_to_skip,
                    guestCanPause: data.guest_can_pause,
                    isHost: data.is_host,
                });
            });
    }

    render() {
        return (
            <div>
                <h3>{this.roomCode}</h3>
                <p>Votes: {this.state.votesToSkip}</p>
                <p>Guest: {this.state.guestCanPause.toString()}</p>
                <p>Host: {this.state.isHost.toString()}</p>
            </div>
        );
    }
}
