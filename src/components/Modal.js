import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Link } from "react-router-dom";

function Modal(props) {
  return (
    <div>
      <Dialog open={props.openState} onClose={props.close} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Share Route with Driver</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter the mobile number of driver</DialogContentText>
          <TextField autoFocus margin="dense" id="name" label="Mobile Number" type="email" fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.close} color="primary">
            Cancel
          </Button>
          <Link to="/stoplist">
            <Button color="primary">Share</Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Modal;
