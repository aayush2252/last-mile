import React from "react";
import Paper from "@material-ui/core/Paper";
import Steps from "react-steps";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ReactCountdownClock from "react-countdown-clock";
import GeoLocated from "../components/GeoLocated";
import { Alert } from "react-bootstrap";
import DeliverSlotModal from "../components/DeliverySlotModal";
import { Link } from "react-router-dom";

const styles = theme => ({
  root: {
    width: "70%",
    margin: "0 auto",
    marginTop: "85px"
  }
});

var json = [
  {
    text: "Order Received",
    isActive: false,
    isDone: true
  },
  {
    text: "Packed and Dispatched",
    isActive: false,
    isDone: true
  },
  {
    text: "Received at hub",
    isActive: true,
    isDone: false
  },
  {
    text: "Delivered",
    isActive: false,
    isDone: false
  }
];

class Example extends React.Component {
  render() {
    return (
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "5px",
          padding: "1em",
          margin: "1em"
        }}>
        {this.props.children}
      </div>
    );
  }
}

class CustomerTracking extends React.Component {
  state = { openState: false, slot: "" };
  shareLocation = () => this.setState({ showLocation: true });
  closeModal = () => this.setState({ openState: false });

  openModal = () => this.setState({ openState: true });

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { data, classes } = this.props;

    return (
      <div className={classes.root}>
        <div style={{ textAlign: "left", marginBottom: "20px" }}>
          {/* <Button variant="contained" color="primary">
            Go Back{" "}
          </Button>
          <div style={{ marginLeft: "50px" }}> */}
          {/* <Link to="/stoplist/1">
            <Button variant="contained" color="primary">
              Go to next Route{" "}
            </Button>
          </Link> */}
          {/* </div> */}
        </div>
        <Paper style={{ padding: "10px" }}>
          <h2>Delivery Address: #997, Thane Station(W)</h2>
          <h3>Phone Number: 94885737382</h3>
          <Example>
            <Steps items={json} />
          </Example>

          <div style={{ textAlign: "-webkit-auto" }}>
            <ReactCountdownClock timeFormat="hms" seconds={1440} color="#000" alpha={0.9} size={100} onComplete={() => console.log("complete")} />
          </div>

          <div style={{ marginTop: "15px" }}>Time left to get the Delivery</div>
          <div>
            <Button style={{ marginTop: "20px" }} variant="contained" color="primary" className={classes.button} onClick={this.shareLocation}>
              Share your location
            </Button>
            <Button
              onClick={this.openModal}
              style={{ marginTop: "20px", marginLeft: "20px" }}
              variant="contained"
              color="primary"
              className={classes.button}>
              Change the delivery slot
            </Button>
          </div>
        </Paper>
        <DeliverSlotModal slot={this.state.slot} handleChange={this.handleChange} openState={this.state.openState} close={this.closeModal} />
        {this.state.showLocation && (
          <Alert>
            <GeoLocated />
          </Alert>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(CustomerTracking);
