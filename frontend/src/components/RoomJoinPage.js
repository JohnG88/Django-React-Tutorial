import React, {Component} from "react";

export default class App extends Component {
    constructor(props) {
        super(props);
        // can add this.state, which is same as useState
        // if state is changed/updated then it will rerender that component
        // this.state = {}
    }

    render() {
        return <p>This is the room join page</p>
    }
}