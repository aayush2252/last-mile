import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import CustomTextField from "../components/CustomTextField";
import MUIDataTable from "mui-datatables";

const columns = ["Pincode", "Provider Name", "Available Weight", "Available Size", "Rating(Based on profile)", "Cost(per parcel)"];

const data1 = [
  ["136119", "Swarn Logistics", "100kg", "500*500", "4", "50 Rs (100*100)"],
  ["136119", "SRB Logistics", "200kg", "700*600", "5", "70 Rs (100*100)"],
  ["136119", "Reliance Logistics", "500kg", "1000*1000", "4", "40Rs (90*90)"]
];

const data2 = [
  ["141010", "Ajad Logistics", "100kg", "500*500", "4", "50 Rs (100*100)"],
  ["141010", "Saurastra Logistics", "200kg", "700*600", "5", "70 Rs (100*100)"],
  ["141010", "TCI Logistics", "500kg", "1000*1000", "5", "100Rs (90*90)"]
];

const options = {
  filterType: "checkbox",
  responsive: "scroll"
};

class MarketPlace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pincode: ""
    };
  }

  handlePincodeChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    return (
      <div style={{ marginTop: "85px" }}>
        <CustomTextField
          value={this.state.pincode}
          handleDestinationsChange={this.handlePincodeChange}
          id="pincode"
          name="pincode"
          label="Search for Logistic Provider by Pincode"
        />
        {/* <Button color="primary" variant="contained" component="span" style={{ marginTop: "20px", width: "100%" }}>
          Search
        </Button> */}
        {this.state.pincode === "136119" ? (
          <div style={{ marginTop: "20px" }}>
            <MUIDataTable title={"LSPs List"} data={data1} columns={columns} options={options} />
          </div>
        ) : this.state.pincode === "141010" ? (
          <div style={{ marginTop: "20px" }}>
            <MUIDataTable title={"LSPs List"} data={data2} columns={columns} options={options} />
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

export default MarketPlace;
