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
    // this.state = {}
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
              <div align="center">Guest Control of Playback State</div>
            </FormHelperText>
            <RadioGroup row defaultValue="true">
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
              inputProps={{ min: 1 }}
            />
            <FormHelperText>
              <div align="center">
                Votes required to skip song
              </div>
            </FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
    );
  }
}
