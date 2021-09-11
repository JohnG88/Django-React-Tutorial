import React, { Component } from "react";

// google material ui to see how it works
import Button from "@material-ui/core/button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Link } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export default class App extends Component {
    defaultVotes = 2;
    constructor(props) {
        super(props);
        // can add this.state, which is same as useState
        // if state is changed/updated then it will rerender that component
        // just like useState, this is value of state
        this.state = {
            guestCanPause: true,
            votesToSkip: this.defaultVotes,
        };

        // binding method to class
        // It seems that when working with react component classes you have to bind the button functionality with the class, have to look into it more
        this.handleVotesChange = this.handleVotesChange.bind(this);
        this.handleGuestCanPauseChange =
            this.handleGuestCanPauseChange.bind(this);
        this.handleRoomButtonPressed = this.handleRoomButtonPressed.bind(this);
    }

    //   this function will handle the setState of input field when it changes
    handleVotesChange(e) {
        this.setState({
            votesToSkip: e.target.value,
        });
    }

    handleGuestCanPauseChange(e) {
        this.setState({
            // if target value ===  string of true then set to true, else set false
            guestCanPause: e.target.value === "true" ? true : false,
        });
    }

    handleRoomButtonPressed() {
        // console.log(this.state)
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            // convert data into json and stringify it 
            body: JSON.stringify({
                // The keys that are stringified have to match the get requests from def post from api views.py
                // votes_to_skip is the value of current state's votesToSkip
                votes_to_skip: this.state.votesToSkip,
                // guest_can_pause is the value of current state's guestCanPause
                guest_can_pause: this.state.guestCanPause,
            }),
        };
        // idk what requestOptions is
        fetch("/api/create-room", requestOptions)
            // take response and convert it into json 
            .then((response) => response.json())
            // then pass it into data
            .then((data) => console.log(data));
    }

    render() {
        return (
            //container will hold things vertically adn spacing is how many pixels of space between items, 1=8, 2=16 ...
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Typography component="h4" variant="h4">
                        Create A Room
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl component="fieldset">
                        <FormHelperText>
                            <div align="center">
                                Guest Control of Playback State
                            </div>
                        </FormHelperText>
                        <RadioGroup
                            row
                            defaultValue="true"
                            onChange={this.handleGuestCanPauseChange}
                        >
                            <FormControlLabel
                                value="true"
                                control={<Radio color="primary" />}
                                label="Play/Pause"
                                labelPlacement="bottom"
                            />
                            <FormControlLabel
                                value="false"
                                control={<Radio color="secondary" />}
                                label="No Control"
                                labelPlacement="bottom"
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl>
                        {/* inputProps has a minimum of 1, meaning no 0 or negative votes  */}
                        <TextField
                            required={true}
                            type="number"
                            defaultValue={this.defaultVotes}
                            inputProps={{
                                min: 1,
                                style: { textAlign: "center" },
                            }}
                            onChange={this.handleVotesChange}
                        />
                        <FormHelperText>
                            <div align="center">
                                Votes required to skip song
                            </div>
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={this.handleRoomButtonPressed}
                    >
                        Create a Room
                    </Button>
                </Grid>

                <Grid item xs={12} align="center">
                    <Button
                        color="secondary"
                        variant="contained"
                        to="/"
                        component={Link}
                    >
                        Back
                    </Button>
                </Grid>
            </Grid>
        );
    }
}
