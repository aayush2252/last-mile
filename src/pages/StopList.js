import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    width: "50%",
    margin: "0 auto",
    marginTop: "50px"
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2
  },
  resetContainer: {
    padding: theme.spacing.unit * 3
  }
});

function getSteps() {
  return ["Marc: #10, Urban Estate, Ludhiana", "Aman: #221, Sector-5, Chd", "Ruby: #123, Sector-10, Mohali"];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return (
        <div>
          <div>Full Address: Loeere sdsk dsnkds nds</div>
          <a>Directions</a>
          <a>More Info</a>
        </div>
      );
    case 1:
      return (
        <div>
          <div>Full Address: Loeere sdsk dsnkds nds</div>
          <a>Directions</a>
          <a>More Info</a>
        </div>
      );
    case 2:
      return (
        <div>
          <div>Full Address: Loeere sdsk dsnkds nds</div>
          <a>Directions</a>
          <a>More Info</a>
        </div>
      );
    default:
      return "Unknown step";
  }
}

class VerticalLinearStepper extends React.Component {
  state = {
    activeStep: 0
  };

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <div className={classes.root}>
        <Paper>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  <Typography>{getStepContent(index)}</Typography>
                  <div className={classes.actionsContainer}>
                    <div>
                      <Button disabled={activeStep === 0} onClick={this.handleBack} className={classes.button}>
                        Back
                      </Button>
                      <Button variant="contained" color="primary" onClick={this.handleNext} className={classes.button}>
                        {activeStep === steps.length - 1 ? "Finish" : "Next"}
                      </Button>
                      <Button variant="contained" color="secondary" className={classes.button}>
                        Re-Optimize
                      </Button>
                    </div>
                  </div>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Paper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={this.handleReset} className={classes.button}>
              Reset
            </Button>
          </Paper>
        )}
      </div>
    );
  }
}

VerticalLinearStepper.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(VerticalLinearStepper);
