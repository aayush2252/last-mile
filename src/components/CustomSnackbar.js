import React, { Children } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2
  }
});

class CustomSnackbar extends React.Component {
  render() {
    const { classes, open, handleClose, children } = this.props;
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">{children}</span>}
          action={[
            <IconButton key="close" aria-label="Close" color="inherit" className={classes.close} onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
    );
  }
}

CustomSnackbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CustomSnackbar);
