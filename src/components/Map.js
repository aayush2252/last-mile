import React from "react";
import { connect } from "react-redux";
import { sequence } from "../actions/sequence";
// import { calculateRouteFromAtoB } from "./route";
class Map extends React.Component {
  constructor(props) {
    super(props);

    this.platform = null;
    this.map = null;

    this.state = {
      app_id: props.app_id,
      app_code: props.app_code,
      // center: {
      //   lat: props.lat,
      //   lng: props.lng
      // },
      zoom: props.zoom,
      theme: props.theme,
      style: props.style
    };
  }

  // TODO: Add theme selection discussed later HERE

  UNSAFE_componentWillReceiveProps(np) {
    if (this.props.waypoints !== np.waypoints) {
      this.renderMap(np.waypoints);
    }
  }

  componentDidMount() {
    this.props.sequence();
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
      waypoint0: "-36.8414,174.76474",
      waypoint1: "-36.84234,174.76315",
      waypoint2: "-36.84314,174.76681",
      waypoint3: "-36.849635,174.7701",
      waypoint4: "-36.85015,174.76912",
      waypoint5: "-36.85057,174.76792",
      waypoint6: "-36.851082,174.7652",
      waypoint7: "-36.85248,174.76362",
      waypoint8: "-36.84827,174.76223",
      waypoint9: "-36.83908,174.74169",
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

        // Retrieve the mapped positions of the requested waypoints:
        startPoint = route.waypoint[0].mappedPosition;
        endPoint = route.waypoint[1].mappedPosition;

        // Create a polyline to display the route:
        var routeLine = new window.H.map.Polyline(linestring, {
          style: { strokeColor: "blue", lineWidth: 10 }
        });

        // Create a marker for the start point:
        var startMarker = new window.H.map.Marker({
          lat: startPoint.latitude,
          lng: startPoint.longitude
        });

        // Create a marker for the end point:
        var endMarker = new window.H.map.Marker({
          lat: endPoint.latitude,
          lng: endPoint.longitude
        });

        // Add the route polyline and the two markers to the map:
        map.addObjects([routeLine, startMarker, endMarker]);

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
    return <div id="here-map" style={{ width: "100%", height: "600px", background: "grey" }} />;
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
)(Map);

// start: "52.05386,-0.79012",
//       destination1: "51.97726,-0.71706",
//       destination2: "51.99581,-0.73246",
//       destination3: "52.06009,-0.78287",
//       destination4: "51.99317,-0.71749",
//       destination5: "52.06637,-0.77085",
//       destination6: "51.98329,-0.73002",
//       destination7: "51.97808,-0.72822",
//       destination8: "52.07476,-0.75145",
//       destination9: "52.06972,-0.76145",
//       end: "52.05386,-0.79012",
//       improveFor: "distance",
//       mode: "fastest;truck;traffic:enabled"
