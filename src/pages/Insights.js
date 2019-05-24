import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Link } from "react-router-dom";
import { type1, type2, type3 } from "../config/data";

const styles = theme => ({
  root: {
    width: "90%",
    margin: "0 auto",
    marginTop: "50px"
  },
  table: {
    minWidth: 700
  }
});

class Insights extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Paper style={{ padding: "40px", marginTop: "50px" }}>
          <h1>Insights</h1>
          <h4>Remove 1 vehicle and increase the capacity to 98%</h4>
          <h4>Cost Saving - Rs 100 per day</h4>
          <h4>Duration - extra 1 hour per vehicle</h4>
        </Paper>

        <Paper style={{ padding: "40px", marginTop: "50px" }}>
          <div style={{ textAlign: "right" }}>
            <Link to="/map">Get Directions</Link>
          </div>
          <h1>Vehicle Type: TATA 407</h1>
          <h3>Duration: 9hrs</h3>
          <h3>Capacity Occupied: 90%</h3>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Address</TableCell>
                <TableCell align="right">PinCode</TableCell>
                <TableCell align="right">Geo Location</TableCell>
                <TableCell align="right">Parcel Dimensions</TableCell>
                <TableCell align="right">Weight</TableCell>
                <TableCell align="right">Customer Time Slot</TableCell>
                <TableCell align="right">Comments</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {type1.map((row, i) => (
                <TableRow key={i}>
                  <TableCell component="th" scope="row">
                    {row.address}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.pin}
                  </TableCell>
                  <TableCell align="right">{row.geoloc}</TableCell>
                  <TableCell align="right">{row.dimension}</TableCell>
                  <TableCell align="right">{row.weight}</TableCell>
                  <TableCell align="right">{row.timeslot}</TableCell>
                  <TableCell align="right">{row.comments}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>

        <Paper style={{ padding: "40px", marginTop: "50px" }}>
          <div style={{ textAlign: "right" }}>
            <Link to="/map">Get Directions</Link>
          </div>
          <h1>Vehicle Type: Chota Hathi</h1>
          <h3>Duration: 9hrs</h3>
          <h3>Capacity Occupied: 90%</h3>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Address</TableCell>
                <TableCell align="right">PinCode</TableCell>
                <TableCell align="right">Geo Location</TableCell>
                <TableCell align="right">Parcel Dimensions</TableCell>
                <TableCell align="right">Weight</TableCell>
                <TableCell align="right">Customer Time Slot</TableCell>
                <TableCell align="right">Comments</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {type2.map((row, i) => (
                <TableRow key={i}>
                  <TableCell component="th" scope="row">
                    {row.address}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.pin}
                  </TableCell>
                  <TableCell align="right">{row.geoloc}</TableCell>
                  <TableCell align="right">{row.dimension}</TableCell>
                  <TableCell align="right">{row.weight}</TableCell>
                  <TableCell align="right">{row.timeslot}</TableCell>
                  <TableCell align="right">{row.comments}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>

        <Paper style={{ padding: "40px", marginTop: "50px" }}>
          <div style={{ textAlign: "right" }}>
            <Link to="/map">Get Directions</Link>
          </div>
          <h1>Vehicle Type: Bikes</h1>
          <h3>Duration: 9hrs</h3>
          <h3>Capacity Occupied: 90%</h3>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Address</TableCell>
                <TableCell align="right">PinCode</TableCell>
                <TableCell align="right">Geo Location</TableCell>
                <TableCell align="right">Parcel Dimensions</TableCell>
                <TableCell align="right">Weight</TableCell>
                <TableCell align="right">Customer Time Slot</TableCell>
                <TableCell align="right">Comments</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {type3.map((row, i) => (
                <TableRow key={i}>
                  <TableCell component="th" scope="row">
                    {row.address}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.pin}
                  </TableCell>
                  <TableCell align="right">{row.geoloc}</TableCell>
                  <TableCell align="right">{row.dimension}</TableCell>
                  <TableCell align="right">{row.weight}</TableCell>
                  <TableCell align="right">{row.timeslot}</TableCell>
                  <TableCell align="right">{row.comments}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Insights);
