import React, { Component } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import StartLocation from "../components/StartLocation";
import PlacePlanner from "../components/PlacePlanner";
import Map from "../components/Map";
import { Link } from "react-router-dom";
import CustomTextField from "../components/CustomTextField";

const Wrapper = styled.section`
  padding: 1em;
`;

class MapRoute extends Component {
  constructor(props) {
    super(props);

    this.state = {
      here: {
        app_id: "bpvUJEyQdIwIjwNt44Mk",
        app_code: "VrWI7IaJQ2uPTvOs-s1cVg"
      },
      start: {
        lat: 19.122481,
        lng: 73.0178634999
      },
      searchText: ""
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

  handleSearchTextChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  // User manually changing latitude or longitude
  onLocationChanged(e) {
    e.preventDefault();

    let state = this.state;
    state["start"][e.target.id] = e.target.value;
    this.setState(state);
  }

  render() {
    console.log("location", this.state);
    return (
      <div className="App">
        <Map
          app_id="LgSX5H49ey4TlUS7lCkP"
          app_code="xRmuALQVNJKr_-_5Byrrmg"
          lat={this.state.start.lat}
          lng={this.state.start.lng}
          zoom="12"
          theme="normal.day"
        />
        <Link to="/sign">
          <Button color="primary" variant="contained" component="span" style={{ position: "fixed", bottom: 0, left: 0, right: 0 }}>
            Stop & Deliver Parcel
          </Button>
        </Link>

        {/* <CustomTextField
          value={this.state.searchText}
          handleDestinationsChange={this.handleSearchTextChange}
          id="search"
          name="searchText"
          label="Enter the Location"
        /> */}
        {/* <StartLocation
          lat={this.state.start.lat}
          lng={this.state.start.lng}
          key="MyLocator"
          onChange={this.onLocationChanged}
          onLocate={this.onLocate}
        />

        <Wrapper>
          <p>Search for nearby places.</p>
          <PlacePlanner app_id={this.state.here.app_id} app_code={this.state.here.app_code} lat={this.state.start.lat} lng={this.state.start.lng} />
        </Wrapper> */}
      </div>
    );
  }
}

export default MapRoute;
