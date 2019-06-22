import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300
  }
});

function CustomTimePicker(props) {
  const { classes, id, label, defaultValue } = props;

  return (
    <form className={classes.container} noValidate>
      <TextField
        id={id}
        label={label}
        type="time"
        fullWidth
        defaultValue={defaultValue}
        className={classes.textField}
        InputLabelProps={{
          shrink: true
        }}
        inputProps={{
          step: 300 // 5 min
        }}
      />
    </form>
  );
}

CustomTimePicker.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CustomTimePicker);
