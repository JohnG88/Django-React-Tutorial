import React, {Component} from "react";
import {render} from "react-dom";
import HomePage from "./HomePage"
import RoomJoinPage from "./RoomJoinPage"
import CreateRoomPage from "./CreateRoomPage"

export default class App extends Component {
    constructor(props) {
        super(props);
        // can add this.state, which is same as useState
        // if state is changed/updated then it will rerender that component
        // this.state = {}
    }

    render() {
        return (
            <div>
                <HomePage />
            </div>)
    }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);