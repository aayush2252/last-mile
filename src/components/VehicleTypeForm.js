import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { withRouter } from "react-router-dom";

const styles = theme => ({
  root: {
    width: "90%",
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

class VehicleTypeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transport: "",
      parcelQuantity: ""
    };
  }

  handleChange = name => {
    console.log("handlechange", name);
    this.setState({ transport: name });
  };

  render() {
    console.log("state in upload", this.state);
    const { classes, key } = this.props;
    return (
      <div id={key} className={classes.root}>
        <Paper style={{ padding: "10px" }}>
          <form noValidate autoComplete="off">
            <div>
              <FormControl className={classes.textField}>
                <InputLabel htmlFor="age-simple">Transport Type</InputLabel>
                <Select
                  value={this.state.transport}
                  onChange={e => this.handleChange(e.target.value)}
                  inputProps={{
                    name: "age",
                    id: "age-simple"
                  }}>
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Bikes">Bikes</MenuItem>
                  <MenuItem value="Chota Hathi - 1.5 MT">Chota Hathi - 1.5 MT</MenuItem>
                  <MenuItem value="Bolero - 2MT">Bolero - 2MT</MenuItem>
                  <MenuItem value="TATA 407 - 2.5MT">TATA 407 - 2.5MT</MenuItem>
                  <MenuItem value="Canter- 3.5MT">Canter- 3.5MT</MenuItem>
                  <MenuItem value="LPT-709 - 4.5 MT">LPT-709 - 4.5 MT</MenuItem>
                  <MenuItem value="LPT-709 - 4.5 MT ">LPT-709 - 4.5 MT</MenuItem>
                  <MenuItem value="Full Truck - 9 MT">Full Truck - 9 MT</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <FormControl className={classes.textField}>
                <InputLabel htmlFor="break-simple">Break</InputLabel>
                <Select
                  value={this.state.break}
                  onChange={e => this.setState({ break: e.target.value })}
                  inputProps={{
                    name: "break",
                    id: "break-simple"
                  }}>
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Lunch">Lunch</MenuItem>
                  <MenuItem value="Tea">Tea</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <TextField
                id="parcel"
                label="Number of transport of particular type"
                className={classes.textField}
                value={this.state.parcelQuantity}
                onChange={e => this.setState({ parcelQuantity: e.target.value })}
                margin="normal"
              />
            </div>
            <div>
              <TextField
                id="time"
                label="Time Duration"
                className={classes.textField}
                value={this.state.time}
                onChange={e => this.setState({ time: e.target.value })}
                margin="normal"
              />
            </div>

            {/* <div style={{ marginTop: "20px" }}>
              <input accept="image/*" onChange={this.onFileUpload} className={classes.input} id="contained-button-file" multiple type="file" />
              <label htmlFor="contained-button-file">
                <Button color="primary" variant="contained" component="span">
                  Upload StopList
                </Button>
              </label>
            </div> */}
          </form>
        </Paper>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(VehicleTypeForm));
