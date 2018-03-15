import React from "react";
import PropTypes from 'prop-types';
import VerseEditorStepper from './VerseEditorStepper';
import EditScreen  from './screens/EditScreen';
import DoneIcon from 'material-ui/svg-icons/action/done';
import ReasonScreen from './screens/ReasonScreen';
import * as stepTypes from './steps';

const styles = {
  screen: {
    padding: '24px'
  },
  stepper: {
    borderBottom: 'solid 1px #999',
    height: '50px'
  },
  actions: {
    padding: '0 24px',
    textAlign: 'right'
  },
  icon: {
    color: '#ffffff',
    width: 20,
    height: 20,
    marginRight: 5,
    marginBottom: 5,
    verticalAlign: 'middle'
  }
};

const steps = ['Edit Verse', 'Select reason(s) for change'];

class VerseEditor extends React.Component {

  constructor(props) {
    super(props);
    this.handleBack = this.handleBack.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.onLastStep = this.onLastStep.bind(this);
    this.state = {
      stepIndex: 0
    };
  }

  handleBack() {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: Math.max(stepIndex - 1, 0)
    });
  }

  handleCancel() {
    const {onCancel} = this.props;
    onCancel();
  }

  handleNext() {
    const {stepIndex} = this.state;
    const {onSubmit} = this.props;
    if(this.onLastStep()) {
      onSubmit();
    } else {
      this.setState({
        stepIndex: stepIndex + 1
      });
    }
  }

  onLastStep() {
    const {stepIndex} = this.state;
    return stepIndex === steps.length - 1;
  }

  render() {
    const {translate, onCancel} = this.props;
    const {stepIndex} = this.state;

    let screen;
    switch(stepIndex) {
      case 0:
        screen = (<ReasonScreen/>);
        break;
      case 1:
      default:
        screen = (<EditScreen/>);
    }

    let nextStepButtonTitle = translate('buttons.next_button');
    if(this.onLastStep()) {
      nextStepButtonTitle = (
        <React.Fragment>
          <DoneIcon style={styles.icon}/>
          {translate('buttons.save_button')}
        </React.Fragment>
      );
    }

    return (
      <div>
        <VerseEditorStepper stepIndex={stepIndex}
                            style={styles.stepper}
                            steps={steps}/>
        <div style={styles.screen}>
          {screen}
        </div>
        <div style={styles.actions}>
          <button className="btn"
                  disabled={stepIndex === 0}
                  onClick={this.handleBack}>
            {translate('buttons.back_button')}
          </button>
          <button className="btn-second"
                  onClick={onCancel}>
            {translate('buttons.cancel_button')}
          </button>
          <button className="btn-prime"
                  onClick={this.handleNext}>
            {nextStepButtonTitle}
          </button>
        </div>
      </div>
    );
  }
}

VerseEditor.propTypes = {
  translate: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default VerseEditor;
