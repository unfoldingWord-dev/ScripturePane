import React from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Step, Stepper, StepLabel } from "material-ui/Stepper";

/**
 * Renders the steps for editing the verse
 */
class VerseEditorStepper extends React.Component {
  render() {
    const {stepIndex, steps, style} = this.props;

    console.log('step', stepIndex);

    return (
      <MuiThemeProvider>
        <Stepper activeStep={stepIndex} style={style}>
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
  style: PropTypes.object,
  stepIndex: PropTypes.number.isRequired,
  steps: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default VerseEditorStepper;
