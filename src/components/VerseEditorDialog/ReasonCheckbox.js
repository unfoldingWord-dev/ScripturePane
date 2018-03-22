import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'material-ui/Checkbox';

const styles = {
  root: {
    marginBottom: 16
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
    const {reason, label, selectedReasons} = this.props;
    return (
      <Checkbox style={styles.root}
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

export default ReasonCheckbox;
