import React from "react";
import PropTypes from 'prop-types';
import VerseEditorStepper from './VerseEditorStepper';
import EditScreen  from './EditScreen';
import DoneIcon from 'material-ui/svg-icons/action/done';
import ReasonScreen from './ReasonScreen';

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

/**
 * Checks if the next butt should be enabled
 * @param state
 * @return {*}
 */
export const isNextEnabled = (state) => {
  const {stepIndex, verseChanged, newVerse, reasons} = state;
  switch(stepIndex) {
    case 0:
      return verseChanged && Boolean(newVerse);
    case 1:
      return reasons.length > 0;
    default:
      return false;
  }
};

/**
 * @callback VerseEditor~submitCallback
 * @param {string} originalVerse - the original verse text
 * @param {string} newVerse - the edited version of the verse text
 * @param {string[]} reasons - an array of reasons for editing the verse
 */

/**
 * Renders a form for editing a single verse
 * @property {string} verseText - the verse text to edit
 * @property {func} translate - the locale function
 * @property {VerseEditor~submitCallback} onSubmit - callback when the edit is submitted
 * @property {func} onCancel - callback when the edit is canceled
 */
class VerseEditor extends React.Component {

  constructor(props) {
    super(props);
    this._handleBack = this._handleBack.bind(this);
    this._handleCancel = this._handleCancel.bind(this);
    this._handleNext = this._handleNext.bind(this);
    this._isLastStep = this._isLastStep.bind(this);
    this._handleVerseChange = this._handleVerseChange.bind(this);
    this._handleReasonChange = this._handleReasonChange.bind(this);
    const {verseText} = this.props;
    this.state = {
      stepIndex: 0,
      newVerse: verseText,
      verseChanged: false,
      reasons: []
    };
  }

  _handleBack() {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: Math.max(stepIndex - 1, 0)
    });
  }

  _handleCancel() {
    const {onCancel} = this.props;
    onCancel();
  }

  _handleNext() {
    const {stepIndex, newVerse, reasons} = this.state;
    const {verseText, onSubmit} = this.props;
    if(this._isLastStep()) {
      onSubmit(verseText, newVerse, reasons);
    } else {
      this.setState({
        stepIndex: stepIndex + 1
      });
    }
  }

  _handleVerseChange(newVerse) {
    const {verseText} = this.props;
    this.setState({
      newVerse: newVerse,
      verseChanged: newVerse !== verseText
    });
  }

  _handleReasonChange(newReasons) {
    this.setState({
      reasons: newReasons
    });
  }


  _isLastStep() {
    const {stepIndex} = this.state;
    return stepIndex === steps.length - 1;
  }

  /**
   * Checks if the next button is enabled
   * @return {*}
   */
  _isNextEnabled() {
    return isNextEnabled(this.state);
  }

  render() {
    const {translate, onCancel} = this.props;
    const {stepIndex, newVerse, reasons} = this.state;

    let screen;
    switch(stepIndex) {
      case 0:
        screen = (<EditScreen verseText={newVerse} onChange={this._handleVerseChange}/>);
        break;
      case 1:
        screen = (<ReasonScreen translate={translate} selectedReasons={reasons} onChange={this._handleReasonChange}/>);
        break;
      default:
        screen = "Oops!";
    }

    let nextStepButtonTitle = translate('buttons.next_button');
    if(this._isLastStep()) {
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
          <button className="btn btn-link"
                  disabled={stepIndex === 0}
                  style={{color: stepIndex === 0 ? '#777' : 'var(--accent-color-dark)' }}
                  onClick={this._handleBack}>
            {translate('buttons.back_button')}
          </button>
          <button className="btn-second"
                  onClick={onCancel}>
            {translate('buttons.cancel_button')}
          </button>
          <button className="btn-prime"
                  disabled={!this._isNextEnabled()}
                  onClick={this._handleNext}>
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
