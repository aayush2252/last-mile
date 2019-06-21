import React, { Component } from "react";
import VehicleTypeForm from "../components/VehicleTypeForm";
import Button from "@material-ui/core/Button";
import Loader from "../components/Loader";
class UploadList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      formArray: ["x"],
      loader: false
    };
  }

  componentWillMount() {
    this.setState({ loader: false });
  }
  addForm = () => {
    this.setState({ formArray: [...this.state.formArray, "x"] });
  };

  onFileUpload = e => {
    // console.log("skdj", e.target.files[0]);
    this.setState({ file: e.target.files[0], loader: true });
    setTimeout(
      function() {
        this.props.history.push("/insight");
      }.bind(this),
      5000
    );
  };
  render() {
    console.log("peore", this.props);
    return (
      <div>
        <div className="text-right" style={{ marginTop: "85px" }}>
          <Button variant="contained" color="primary" component="span" onClick={this.addForm}>
            Add Vehicle Type
          </Button>
        </div>
        {this.state.loader && <Loader />}
        {this.state.formArray.map((item, key) => (
          <VehicleTypeForm id={key} />
        ))}

        <div style={{ marginTop: "20px" }}>
          <input accept="image/*" onChange={this.onFileUpload} style={{ display: "none" }} id="contained-button-file" multiple type="file" />
          <label htmlFor="contained-button-file">
            <Button color="primary" variant="contained" component="span" style={{ position: "fixed", bottom: 0, left: 0, right: 0 }}>
              Upload StopList
            </Button>
          </label>
        </div>
      </div>
    );
  }
}

export default UploadList;
