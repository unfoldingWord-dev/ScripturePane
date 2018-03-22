import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'material-ui/Checkbox';

const styles = {
  root: {
    display: 'flex'
  },
  content: {
    display: 'flex',
    flexGrow: 1
  },
  column: {
    flexGrow: 1
  },
  checkbox: {
    marginBottom: 16
  },
  spacer: {
    flexGrow: 2
  }
};

/**
 * Renders a reason checkbox
 * @param {string} reason - the reason for the edit
 * @param {string} label - the checkbox label
 * @param {string[]} selectedReasons - an array of selected reasons
 * @param {func} onCheck - callback when the checkbox is changed
 * @return {*}
 * @constructor
 */
class ReasonCheckbox extends React.Component {

  constructor(props) {
     super(props);
     this._handleCheck = this._handleCheck.bind(this);
  }

  _handleCheck(e, checked) {
    const {reason, onCheck} = this.props;
    onCheck(reason, checked);
  }

  render() {
    const {reason, label, selectedReasons} =this.props;
    return (
      <Checkbox style={styles.checkbox}
                checked={selectedReasons.includes(reason)}
                onCheck={this._handleCheck}
                label={label}/>
    );
  }
}

ReasonCheckbox.propTypes = {
  reason: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  selectedReasons: PropTypes.arrayOf(PropTypes.string).isRequired,
  onCheck: PropTypes.func.isRequired
};

/**
 * Renders checkboxes for the user to indicate the reason for the change
 */
class ReasonScreen extends React.Component {
  constructor(props) {
    super(props);
    this._handleCheck = this._handleCheck.bind(this);
    this.state = {
      selectedReasons: {}
    };
  }

  /**
   * Checks if a checkbox is selected
   * @param {string} reason
   * @param {bool} checked
   * @return {boolean}
   * @private
   */
  _handleCheck(reason, checked) {
    const {selectedReasons, onChange} = this.props;
    let newReasons = [
      ...selectedReasons
    ];
    if(checked && !newReasons.includes(reason)) {
      newReasons.push(reason);
    } else if(!checked && newReasons.includes(reason)) {
      const index = newReasons.indexOf(reason);
      newReasons.splice(index, 1);
    }
    onChange(newReasons);
  }

  render() {
    const {translate, selectedReasons} = this.props;

    return (
      <div style={styles.root}>
        <div style={styles.spacer}/>
        <div style={styles.content}>
          <div style={styles.column}>
            <ReasonCheckbox reason="spelling"
                            label={translate('editor.spelling')}
                            onCheck={this._handleCheck}
                            selectedReasons={selectedReasons}/>
            <ReasonCheckbox reason="punctuation"
                            label={translate('editor.punctuation')}
                            onCheck={this._handleCheck}
                            selectedReasons={selectedReasons}/>
            <ReasonCheckbox reason="word_choice"
                            label={translate('editor.word_choice')}
                            onCheck={this._handleCheck}
                            selectedReasons={selectedReasons}/>
          </div>
          <div style={styles.column}>
            <ReasonCheckbox reason="meaning"
                            label={translate('editor.meaning')}
                            onCheck={this._handleCheck}
                            selectedReasons={selectedReasons}/>
            <ReasonCheckbox reason="grammar"
                            label={translate('editor.grammar')}
                            onCheck={this._handleCheck}
                            selectedReasons={selectedReasons}/>
            <ReasonCheckbox reason="other"
                            label={translate('editor.other')}
                            onCheck={this._handleCheck}
                            selectedReasons={selectedReasons}/>
          </div>
        </div>
        <div style={styles.spacer}/>
      </div>

    );
  }
}

ReasonScreen.propTypes = {
  onChange: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired,
  selectedReasons: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default ReasonScreen;
