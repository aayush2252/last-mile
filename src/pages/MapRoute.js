import React, { Component } from "react";
import styled from "styled-components";
import StartLocation from "../components/StartLocation";
import PlacePlanner from "../components/PlacePlanner";
import Map from "../components/Map";

const Wrapper = styled.section`
  padding: 1em;
`;

class MapRoute extends Component {
  constructor(props) {
    super(props);

    this.state = {
      here: {
        app_id: "LgSX5H49ey4TlUS7lCkP",
        app_code: "xRmuALQVNJKr_-_5Byrrmg"
      },
      start: {
        lat: 30.901,
        lng: 75.8573
      }
    };

    this.onLocate = this.onLocate.bind(this);
    this.onLocationChanged = this.onLocationChanged.bind(this);
  }

  // Set geocordinates using HTML5 geolocation for current location
  onLocate(e) {
    e.preventDefault();

    const self = this;
    navigator.geolocation.getCurrentPosition(function(position) {
      self.setState({
        start: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      });
    });
  }

  // User manually changing latitude or longitude
  onLocationChanged(e) {
    e.preventDefault();

    let state = this.state;
    state["start"][e.target.id] = e.target.value;
    this.setState(state);
  }

  render() {
    return (
      <div className="App">
        <Map app_id="LgSX5H49ey4TlUS7lCkP" app_code="xRmuALQVNJKr_-_5Byrrmg" lat="42.345978" lng="-83.0405" zoom="12" theme="normal.day" />
        <StartLocation
          lat={this.state.start.lat}
          lng={this.state.start.lng}
          key="MyLocator"
          onChange={this.onLocationChanged}
          onLocate={this.onLocate}
        />

        <Wrapper>
          <p>Search for nearby places.</p>
          <PlacePlanner app_id={this.state.here.app_id} app_code={this.state.here.app_code} lat={this.state.start.lat} lng={this.state.start.lng} />
        </Wrapper>
      </div>
    );
  }
}

export default MapRoute;
