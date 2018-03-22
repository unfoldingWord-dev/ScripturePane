import React from "react";
import PropTypes from 'prop-types';
import VerseEditorStepper from './VerseEditorStepper';
import EditScreen  from './screens/EditScreen';
import DoneIcon from 'material-ui/svg-icons/action/done';
import ReasonScreen from './screens/ReasonScreen';

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
    this.handleVerseChange = this.handleVerseChange.bind(this);
    this.handleReasonChange = this.handleReasonChange.bind(this);
    const {verseText} = this.props;
    this.state = {
      stepIndex: 0,
      newVerse: verseText,
      verseChanged: false,
      reasons: []
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
    const {stepIndex, newVerse, reasons} = this.state;
    const {onSubmit} = this.props;
    if(this.onLastStep()) {
      onSubmit(newVerse, reasons);
    } else {
      this.setState({
        stepIndex: stepIndex + 1
      });
    }
  }

  handleVerseChange(newVerse) {
    const {verseText} = this.props;
    this.setState({
      newVerse: newVerse,
      verseChanged: newVerse !== verseText
    });
  }
  
  handleReasonChange(newReasons) {
    this.setState({
      reasons: newReasons
    });
  }
  

  onLastStep() {
    const {stepIndex} = this.state;
    return stepIndex === steps.length - 1;
  }

  render() {
    const {translate, onCancel} = this.props;
    const {stepIndex, verseChanged, newVerse, reasons} = this.state;

    let screen;
    switch(stepIndex) {
      case 0:
        screen = (<EditScreen verseText={newVerse} onChange={this.handleVerseChange}/>);
        break;
      case 1:
        screen = (<ReasonScreen translate={translate} selectedReasons={reasons} onChange={this.handleReasonChange}/>);
        break;
      default:
        screen = "Oops!";
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
                  disabled={!verseChanged && newVerse}
                  onClick={this.handleNext}>
            {nextStepButtonTitle}
          </button>
        </div>
      </div>
    );
  }
}

VerseEditor.propTypes = {
  verseText: PropTypes.string.isRequired,
  translate: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default VerseEditor;
