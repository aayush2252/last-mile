import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FilledInput from "@material-ui/core/FilledInput";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

class SelectDropdown extends React.Component {
  render() {
    const { classes, label, name, options, handleChange, value } = this.props;
    return (
      <form className={classes.root} autoComplete="off">
        <FormControl fullWidth className={classes.formControl}>
          <InputLabel htmlFor={name}>{label}</InputLabel>
          <Select
            value={value}
            onChange={handleChange}
            inputProps={{
              name: name,
              id: { name }
            }}>
            {options.map((item, key) => {
              return (
                <MenuItem id={key} value={item.value}>
                  {item.label}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </form>
    );
  }
}

SelectDropdown.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SelectDropdown);
