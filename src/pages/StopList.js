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
import { Link } from "react-router-dom";

const styles = theme => ({
  root: {
    width: "90%",
    margin: "0 auto",
    marginTop: "85px"
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
  return ["Thane Station(W)", "Lala Tulsiram Udyan.", "Shri Durga Snacks", "Fortis Hiranandani Hospital", "Shiv Shankar Temple"];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return (
        <div>
          <div>Full Address: #997, Thane Station(W)</div>
          {/* <a>Directions</a> */}
          <a href="javascript:void(0)">More Info</a>
        </div>
      );
    case 1:
      return (
        <div>
          <div>Full Address: #12, Lala Tulsiram Udyan</div>
          {/* <a>Directions</a> */}
          <a href="javascript:void(0)">More Info</a>
        </div>
      );
    case 2:
      return (
        <div>
          <div>Full Address: #73, Shri Durga Snacks</div>
          {/* <a>Directions</a> */}
          <a href="javascript:void(0)">More Info</a>
        </div>
      );
    case 3:
      return (
        <div>
          <div>Full Address: Dr Rajkumar,Ortho Dept., Fortis Hiranandani Hospital</div>
          {/* <a>Directions</a> */}
          <a href="javascript:void(0)">More Info</a>
        </div>
      );
    case 4:
      return (
        <div>
          <div>Full Address: #121, Shiv Shankar Temple</div>
          {/* <a>Directions</a> */}
          <a href="javascript:void(0)">More Info</a>
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

  componentDidMount() {
    const path = this.props.location.pathname;
    const cust = path.split("/");
    cust.length >= 3 && this.setState({ activeStep: cust[2].toString() });
  }
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
    // console.log("sajsak", activeStep);
    return (
      <div className={classes.root}>
        <Paper>
          <Stepper activeStep={parseInt(activeStep)} orientation="vertical">
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  <Typography>{getStepContent(index)}</Typography>
                  <div className={classes.actionsContainer}>
                    <div>
                      <Button color="primary" variant="contained" disabled={activeStep === 0} onClick={this.handleBack} className={classes.button}>
                        Back
                      </Button>
                      {activeStep === steps.length - 1 ? (
                        <div />
                      ) : (
                        <Button variant="contained" color="primary" onClick={this.handleNext} className={classes.button}>
                          Next
                        </Button>
                      )}
                      <Link to="/map">
                        <Button variant="contained" color="secondary" className={classes.button}>
                          Navigate
                        </Button>
                      </Link>
                    </div>
                  </div>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Paper>
        {activeStep === steps.length && (
          <Paper style={{ marginTop: "20px" }} square elevation={0} className={classes.resetContainer}>
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
