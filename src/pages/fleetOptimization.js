import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import SelectDropdown from "../components/SelectDropdown";
import CustomTextField from "../components/CustomTextField";
import { sequence } from "../actions/sequence";
import { Link } from "react-router-dom";

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
      optimizefor: "time",
      vehicle: "car",
      trafficaware: "disabled",
      locations: "",
      height: "",
      width: "",
      length: "",
      limitedwt: "",
      app_id: "bpvUJEyQdIwIjwNt44Mk",
      app_code: "VrWI7IaJQ2uPTvOs-s1cVg",
      zoom: "12",
      theme: "normal.day",
      showMap: false
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
    this.props.sequence({ improveFor: optimizefor, vehicle, height, width, length, limitedwt });
    this.setState({ showMap: true });
  };

  UNSAFE_componentWillReceiveProps(np) {
    if (this.props.waypoints !== np.waypoints) {
      this.renderMap(np.waypoints);
    }
  }

  renderMap = waypoint => {
    console.log("props", waypoint);

    this.platform = new window.H.service.Platform(this.state);

    var layer = this.platform.createDefaultLayers();
    var container = document.getElementById("here-map");

    var map = new window.H.Map(container, layer.normal.map, {
      center: { lat: 52.51, lng: 13.4 },
      zoom: this.state.zoom
    });

    var events = new window.H.mapevents.MapEvents(map);
    // eslint-disable-next-line
    var behavior = new window.H.mapevents.Behavior(events);
    // eslint-disable-next-line
    var ui = new window.H.ui.UI.createDefault(map, layer);

    // Create the parameters for the routing request:
    var routingParameters = {
      // The routing mode:
      mode: "fastest;pedestrian",
      // The start point of the route:
      waypoint0: "19.126856,73.004379",
      waypoint1: "19.1243057,73.0035507",
      waypoint2: "19.1867685,72.9750417",
      waypoint3: "19.1421305,72.9667101",
      waypoint4: "19.2638124,73.1121202",
      // waypoint5: "19.1759002,72.9452778",
      // // waypoint6: "19.1421305,72.9667101",
      // waypoint7: "19.2638124,73.1121202",
      // waypoint8: "19.1445261,73.1316009",
      // waypoint9: "19.1243057,73.0035507",
      // waypoint0: "geo!50.1120423728813,8.68340740740811",
      // // The end point of the route:
      // waypoint1: "geo!52.5309916298853,13.3846220493377",
      // waypoint2: "geo!52.53099,13.39",

      // To retrieve the shape of the route we choose the route
      // representation mode 'display'
      representation: "display"
    };

    // Define a callback function to process the routing response:
    var onResult = function(result) {
      var route, routeShape, startPoint, endPoint, linestring;
      if (result.response.route) {
        // Pick the first route from the response:
        route = result.response.route[0];
        // Pick the route's shape:
        routeShape = route.shape;

        // Create a linestring to use as a point source for the route line
        linestring = new window.H.geo.LineString();

        // Push all the points in the shape into the linestring:
        routeShape.forEach(function(point) {
          var parts = point.split(",");
          linestring.pushLatLngAlt(parts[0], parts[1]);
        });

        var waypoints = route.waypoint;
        waypoints.forEach(item => {
          const { mappedPosition, label } = item || {};
          const { latitude, longitude } = mappedPosition || {};
          var mark = new window.H.map.Marker({ lat: latitude, lng: longitude });
          map.addObject(mark);
        });

        // Create a polyline to display the route:
        var routeLine = new window.H.map.Polyline(linestring, {
          style: { strokeColor: "blue", lineWidth: 10 }
        });

        // Add the route polyline and the two markers to the map:
        map.addObjects([routeLine]);

        // Set the map's viewport to make the whole route visible:
        map.setViewBounds(routeLine.getBounds());
      }
    };

    // Get an instance of the routing service:
    var router = this.platform.getRoutingService();

    // Call calculateRoute() with the routing parameters,
    // the callback and an error callback function (called if a
    // communication error occurs):
    router.calculateRoute(routingParameters, onResult, function(error) {
      alert(error.message);
    });
  };

  render() {
    const { classes } = this.props || {};
    const { showMap } = this.state || {};
    console.log("state", this.state);
    return (
      <div className={classes.root}>
        <div style={{ textAlign: "right", marginTop: "85px" }}>
          <Link to="/insight">
            <Button variant="contained" color="secondary">
              Back
            </Button>
          </Link>
        </div>
        {showMap && <div id="here-map" style={{ width: "100%", height: "600px", background: "grey" }} />}
        <Paper style={{ padding: "20px", marginTop: "20px" }}>
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
