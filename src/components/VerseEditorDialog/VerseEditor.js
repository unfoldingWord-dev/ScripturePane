import React from "react";
import VerseEditorStepper from './VerseEditorStepper';
import EditScreen  from './screens/EditScreen';
import ReasonScreen from './screens/ReasonScreen';
import * as stepTypes from './steps';

class VerseEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      stepIndex: 0
    };
  }

  render() {
    const {stepIndex} = this.state;
    const steps = [stepTypes.STEP_EDIT, stepTypes.STEP_REASON];

    let screen;
    switch(steps[stepIndex]) {
      case stepTypes.STEP_REASON:
        screen = (<ReasonScreen/>);
        break;
      case stepTypes.STEP_EDIT:
      default:
        screen = (<EditScreen/>);
    }

    return (
      <div>
        <VerseEditorStepper index={stepIndex}
                            steps={steps}/>
        {screen}
      </div>
    );
  }
}

export default VerseEditor;
