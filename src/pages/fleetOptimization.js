import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import SelectDropdown from "../components/SelectDropdown";
import CustomTextField from "../components/CustomTextField";
import { sequence } from "../actions/sequence";

const styles = () => ({
  root: {
    width: "90%",
    margin: "0 auto",
    marginTop: "50px"
  }
});

class fleetOptimization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optimizefor: "",
      vehicle: "",
      trafficaware: "",
      locations: "",
      height: "",
      width: "",
      length: "",
      limitedwt: ""
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleDestinationsChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleOptimize = () => {
    const { optimizefor, vehicle, height, width, length, limitedwt } = this.state || {};
    this.props.sequence({ improveFor: optimizefor, mode: vehicle, height, width, length, limitedwt });
  };

  render() {
    const { classes } = this.props || {};
    console.log("state", this.props);
    return (
      <div className={classes.root}>
        <Paper style={{ padding: "20px", marginTop: "85px" }}>
          <SelectDropdown
            name="optimizefor"
            label={"Optimize For"}
            options={[{ value: "time", label: "time" }, { value: "distance", label: "distance" }]}
            value={this.state.optimizefor}
            handleChange={this.handleChange}
          />
          <SelectDropdown
            name="vehicle"
            label={"Vehicle"}
            value={this.state.vehicle}
            options={[{ value: "car", label: "car" }, { value: "truck", label: "truck" }, { value: "pedestrian", label: "pedestrian" }]}
            handleChange={this.handleChange}
          />
          <SelectDropdown
            name="trafficaware"
            label={"Traffic Aware Routing"}
            value={this.state.trafficaware}
            options={[{ value: "enabled", label: "enabled" }, { value: "disabled", label: "disabled" }]}
            handleChange={this.handleChange}
          />
          <CustomTextField
            value={this.state.locations}
            handleDestinationsChange={this.handleDestinationsChange}
            id="loc"
            name="locations"
            label="Destinations"
            multiline
          />
          {this.state.vehicle === "truck" && (
            <div>
              <div>Truck Attributes</div>
              <CustomTextField
                value={this.state.height}
                handleDestinationsChange={this.handleDestinationsChange}
                id="ht"
                name="height"
                label="Height[m]"
              />

              <CustomTextField
                value={this.state.locations}
                handleDestinationsChange={this.handleDestinationsChange}
                id="wdth"
                name="width"
                label="Width[m]"
              />
              <CustomTextField
                value={this.state.locations}
                handleDestinationsChange={this.handleDestinationsChange}
                id="lt"
                name="length"
                label="Length[m]"
              />
              <CustomTextField
                value={this.state.locations}
                handleDestinationsChange={this.handleDestinationsChange}
                id="lw"
                name="limitedwt"
                label="Limited Weight[t]"
              />
            </div>
          )}
          <Button
            onClick={this.handleOptimize}
            color="primary"
            variant="contained"
            component="span"
            style={{ position: "fixed", bottom: 0, left: 0, right: 0 }}>
            Optimize Routing
          </Button>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { sequence } = state || {};
  const { waypoints } = sequence || {};
  return {
    waypoints
  };
};

export default connect(
  mapStateToProps,
  { sequence }
)(withStyles(styles)(fleetOptimization));
