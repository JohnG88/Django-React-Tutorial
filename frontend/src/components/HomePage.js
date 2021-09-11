import React, { Component } from "react";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
} from "react-router-dom";

export default class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                {/* add each route into a Switch tag */}
                <Switch>
                    {/* remember to add exact path to base url so /join wont show both home page and join page */}

                    <Route exact path="/">
                        <p>This is the home page</p>
                    </Route>
                </Switch>
                {/* both paths below will not work by themselves, have to implement them in django frontend/urls.py */}
                <Switch>
                    <Route path="/join" component={RoomJoinPage}></Route>
                </Switch>
                <Switch>
                    <Route path="/create" component={CreateRoomPage}></Route>
                </Switch>
                {/**
            <Switch>
                <Route path="*">Error page</Route>
            </Switch>
             */}
            </Router>
        );
    }
}
