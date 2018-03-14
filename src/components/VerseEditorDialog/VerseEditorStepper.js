import React from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Step, Stepper, StepLabel } from "material-ui/Stepper";

/**
 * Renders the steps for editing the verse
 */
class VerseEditorStepper extends React.Component {
  render() {
    const {stepIndex, steps} = this.props;

    return (
      <MuiThemeProvider>
        <Stepper activeStep={stepIndex}>
          {steps.map((step, index) => {
            return (
              <Step key={index}>
                <StepLabel>{step}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </MuiThemeProvider>
    );
  }
}

VerseEditorStepper.propTypes = {
  stepIndex: PropTypes.number,
  steps: PropTypes.string
};

export default VerseEditorStepper;
