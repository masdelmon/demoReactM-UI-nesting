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
    width: "90%"
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
  return ["Select campaign settings", "Create an ad group", "Create an ad"];
}



function getStepContent(step, username, updateState) {
  switch (step) {
    case 0:
     // return (<input type="text" value={data.username} />);
     //   return(<input type = "text" value = {username} onChange = {updateState} />);
     return( <input id="username" name="username"  type="text" value = {username} onChange = {updateState} /><input type="text" />);
    case 1:
      return (<input type="text" />);
    case 2:
      return (<button>Invio</button>);
    default:
      return ('invalid option');
  }
}

class VerticalLinearStepper extends React.Component {
  constructor(props) {
      super(props);
  this.state = {
    activeStep: 0,
    username: 'max',
    password: ''
  };

  this.updateState = this.updateState.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  };
  
  updateState(e) {
      this.setState({username: e.target.value});
  }
  
  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    
    fetch('https://petstore.swagger.io/v2/user/masdelmon', {
      method: 'POST',
      body: data,
    });
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
    const { username } = this.state;
    

    return (
      <div className={classes.root}>
        
                       <form onSubmit={this.handleSubmit}>
                         
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                {getStepContent(index, this.state.username, this.updateState)}
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={this.handleBack}
                      className={classes.button}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
         </form>
                

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
