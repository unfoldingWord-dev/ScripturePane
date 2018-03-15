import React from 'react';
import PropTypes from 'prop-types';
import { Step, Stepper, StepLabel } from "material-ui/Stepper";

/**
 * Renders the steps for editing the verse
 */
class VerseEditorStepper extends React.Component {
  render() {
    const {stepIndex, steps, style} = this.props;
    return (
      <Stepper activeStep={stepIndex} style={style}>
        {steps.map((step, index) => {
          return (
            <Step key={index}>
              <StepLabel>{step}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    );
  }
}

VerseEditorStepper.propTypes = {
  style: PropTypes.object,
  stepIndex: PropTypes.number.isRequired,
  steps: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default VerseEditorStepper;
