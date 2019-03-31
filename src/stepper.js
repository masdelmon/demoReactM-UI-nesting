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
  return ["Select account data", "Select personal data", "Select addresses data", "Sum up"];
}



function getStepContent(step, datafrm, updateStateUsername, updateStatePassword, updateStateFirstName, updateStateLastName, updateStateEmail, updateStatePhone, updateStep0, updateStep1, updateStep2, classes) {
  switch (step) {
    case 0:
     return <fieldset><legend>User data:</legend>Username&nbsp;:<input id="username" name="username" type="text" value = {datafrm.username} onChange = {updateStateUsername} />Password  :<input id="password" name="password"  type="text" value = {datafrm.password} onChange = {updateStatePassword} /></fieldset>;
     case 1:
     return <fieldset><legend>Personal data:</legend>Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:<input id="firstName" name="firstName"  type="text" value = {datafrm.firstName} onChange = {updateStateFirstName} />Surname&nbsp;:<input id="lastName" name="lastName"  type="text" value = {datafrm.lastName} onChange = {updateStateLastName} /></fieldset>;
    case 2: 
     return <fieldset><legend>Address data:</legend>Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:<input id="email" name="email"  type="text" value = {datafrm.email} onChange = {updateStateEmail} />Phone&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:<input id="phone" name="phone"  type="text" value = {datafrm.phone} onChange = {updateStatePhone} /></fieldset>;
    case 3:
     //return <fieldset>Username:{datafrm.username} - Password:{datafrm.password} - <Button variant="contained" color="primary" onClick={updateStep0} className={classes.button}>Modifica</Button>Name &nbsp;&nbsp;&nbsp;&nbsp;:{datafrm.firstName} - &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Surname:{datafrm.lastName} - <Button variant="contained" color="primary" onClick={updateStep1} className={classes.button}>Modifica</Button>Email:{datafrm.email} - Password:{datafrm.phone} - <Button variant="contained" color="primary" onClick={updateStep2} className={classes.button}>Modifica</Button></fieldset>;
       return <table><tbody><tr><td>{datafrm.username}</td><td>{datafrm.password}</td><td><Button variant="contained" color="primary" onClick={updateStep0} className={classes.button}>Modifica</Button></td></tr><tr><td>{datafrm.firstName}</td><td>{datafrm.lastName}</td><td><Button variant="contained" color="primary" onClick={updateStep1} className={classes.button}>Modifica</Button></td></tr><tr><td>{datafrm.email}</td><td>{datafrm.phone}</td><td><Button variant="contained" color="primary" onClick={updateStep2} className={classes.button}>Modifica</Button></td></tr></tbody></table>;
     default:
      return ('invalid option');
  }
}

class VerticalLinearStepper extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
    activeStep: 0,
    id: 0,
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    userStatus: 0
  };

  this.updateStateUsername = this.updateStateUsername.bind(this);
  this.updateStatePassword = this.updateStatePassword.bind(this);
  this.updateStateFirstName = this.updateStateFirstName.bind(this);
  this.updateStateLastName = this.updateStateLastName.bind(this);
  this.updateStateEmail = this.updateStateEmail.bind(this);
  this.updateStatePhone = this.updateStatePhone.bind(this);
    
  this.updateStep0 = this.updateStep0.bind(this);
  this.updateStep1 = this.updateStep1.bind(this);
  this.updateStep2 = this.updateStep2.bind(this);
  
  };
  
  updateStep0(e) {
      this.setState({activeStep: 0});
      
  }
  
  updateStep1(e) {
      this.setState({activeStep: 1});
      
  }
  
  updateStep2(e) {
      this.setState({activeStep: 2});
      
  }
  
  
  
  updateStateUsername(e) {
      this.setState({username: e.target.value});
      
  }
  
  updateStatePassword(e) {
      this.setState({password: e.target.value});
      
  }
  
  updateStateFirstName(e) {
      this.setState({firstName: e.target.value});
      
  }
  
  updateStateLastName(e) {
      this.setState({lastName: e.target.value});
      
  }
  
  updateStateEmail(e) {
      this.setState({email: e.target.value});
      
  }
  
  updateStatePhone(e) {
      
      this.setState({phone: e.target.value});
  }
  
  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    
    fetch('https://petstore.swagger.io/v2/user', {
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
                {getStepContent(index, this.state, this.updateStateUsername, this.updateStatePassword, this.updateStateFirstName, this.updateStateLastName, this.updateStateEmail, this.updateStatePhone, this.updateStep0, this.updateStep1, this.updateStep2, classes)}
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
