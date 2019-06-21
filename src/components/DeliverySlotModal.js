import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import SelectDropdown from "../components/SelectDropdown";

function DeliverySlotModal(props) {
  return (
    <div>
      <Dialog open={props.openState} onClose={props.close} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Please Enter the new Delivery Slot</DialogTitle>
        <DialogContent>
          <SelectDropdown
            label="Delivery Slot"
            name="slot"
            handleChange={props.handleChange}
            value={props.slot}
            options={[
              { value: "11AM - 12PM", label: "11AM - 12PM" },
              { value: "12PM - 1PM", label: "12PM - 1PM" },
              { value: "1PM - 2PM", label: "1PM - 2PM" },
              { value: "2PM - 3PM", label: "2PM - 3PM" },
              { value: "3PM - 4PM", label: "3PM - 4PM" },
              { value: "4PM - 5PM", label: "4PM - 5PM" },
              { value: "5PM - 6PM", label: "5PM - 6PM" },
              { value: "6PM - 7PM", label: "6PM - 7PM" }
            ]}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.close} color="primary">
            Cancel
          </Button>
          <Button onClick={props.close} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeliverySlotModal;
