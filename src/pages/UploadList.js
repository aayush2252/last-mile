import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

const styles = theme => ({
  root: {
    width: "50%",
    margin: "0 auto",
    marginTop: "50px"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300
  },
  input: {
    display: "none"
  }
});

class UploadList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Paper style={{ padding: "40px" }}>
          <form noValidate autoComplete="off">
            <div>
              <FormControl className={classes.textField}>
                <InputLabel htmlFor="age-simple">Transport Type</InputLabel>
                <Select
                  value={this.state.age}
                  onChange={this.handleChange}
                  inputProps={{
                    name: "age",
                    id: "age-simple"
                  }}>
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={30}>Chota Hathi - 1.5 MT</MenuItem>
                  <MenuItem value={30}>Bolero - 2MT</MenuItem>
                  <MenuItem value={10}>TATA 407 - 2.5MT</MenuItem>
                  <MenuItem value={20}>Canter- 3.5MT</MenuItem>
                  <MenuItem value={30}>LPT-709 - 4.5 MT</MenuItem>
                  <MenuItem value={30}>LPT-709 - 4.5 MT</MenuItem>
                  <MenuItem value={30}>Full Truck - 9 MT</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <FormControl className={classes.textField}>
                <InputLabel htmlFor="age-simple">Break</InputLabel>
                <Select
                  value={this.state.age}
                  onChange={this.handleChange}
                  inputProps={{
                    name: "age",
                    id: "age-simple"
                  }}>
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={30}>Lunch</MenuItem>
                  <MenuItem value={30}>Tea</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <TextField
                id="parcel"
                label="Number of Parcels"
                className={classes.textField}
                value={this.state.parcelQuantity}
                onChange={this.handleChange("parcelQuantity")}
                margin="normal"
              />
            </div>
            <div>
              <TextField
                id="time"
                label="Time Duration"
                className={classes.textField}
                value={this.state.time}
                onChange={this.handleChange("time")}
                margin="normal"
              />
            </div>

            <div style={{ marginTop: "20px" }}>
              <input accept="image/*" className={classes.input} id="contained-button-file" multiple type="file" />
              <label htmlFor="contained-button-file">
                <Button variant="contained" component="span">
                  Upload StopList
                </Button>
              </label>
            </div>
          </form>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(UploadList);
