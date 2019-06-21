import React, { Component } from "react";
import SignatureCanvas from "react-signature-canvas";
import CustomSnackbar from "../components/CustomSnackbar";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

class SignaturePage extends Component {
  state = { trimmedDataURL: null, open: false, submit: false };

  handleClick = () => {
    this.setState({ open: true, submit: true });
    this.clear();
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

  sigPad = {};
  clear = () => {
    this.sigPad.clear();
  };

  trim = () => {
    this.setState({ trimmedDataURL: this.sigPad.getTrimmedCanvas().toDataURL("image/png") });
  };
  render() {
    let { trimmedDataURL, open, submit } = this.state;
    return (
      <div style={{ marginTop: "85px" }}>
        <div className="container signature-container">
          <div class="row">
            <div class="col-md-12">
              <h1> {this.props.title}</h1>
            </div>
            <div class="col-md-12">
              <SignatureCanvas
                penColor="green"
                ref={ref => {
                  this.sigPad = ref;
                }}
                canvasProps={{ width: "250px", height: 200, className: "sigCanvas" }}
              />
            </div>
          </div>
          <div class="row" ref="btnWrapper">
            <div class="col-sm-6">
              <div ref="btnSign" onClick={this.handleClick} className="btn btn-success pull-left">
                Submit
              </div>{" "}
              &nbsp;
              <div ref="btnClear" onClick={this.clear} className="btn btn-warning pull-right">
                Clear
              </div>
            </div>
          </div>
        </div>
        {trimmedDataURL ? <img src={trimmedDataURL} /> : null}
        <CustomSnackbar open={open} handleClose={this.handleClose}>
          Parcel Delivered Successfully
        </CustomSnackbar>
        {submit && (
          <Link to="/stoplist/2">
            <Button color="primary" variant="contained" component="span" style={{ position: "fixed", bottom: 0, left: 0, right: 0 }}>
              Go to next customer
            </Button>
          </Link>
        )}
      </div>
    );
  }
}

export default SignaturePage;
