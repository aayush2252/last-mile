import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
    // width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
});

class CustomTextField extends React.Component {
  render() {
    const { classes, label, id, name, value, handleDestinationsChange } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          fullWidth
          id={id}
          label={label}
          className={classes.textField}
          value={value}
          onChange={handleDestinationsChange(name)}
          margin="normal"
        />
      </form>
    );
  }
}

CustomTextField.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CustomTextField);
