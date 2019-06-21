import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const styles = theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
});

function Accordions(props) {
  const { classes, heading, children } = props;
  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>{heading}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>{children}</Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}

Accordions.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Accordions);
