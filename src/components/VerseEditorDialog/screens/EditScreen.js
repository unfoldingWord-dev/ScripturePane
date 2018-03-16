import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

/**
 * Renders a text area for editing the verse
 */
class EditScreen extends React.Component {

  constructor(props) {
    super(props);
    this._handleChange = this._handleChange.bind(this);
  }

  /**
   * Handles changes to the text field
   * @param event
   */
  _handleChange(event) {
    const {onChange} = this.props;
    onChange(event.target.value);
  }

  render() {
    const {verseText} = this.props;
    return (
      <TextField multiLine={true}
                 rows={4}
                 autoFocus={true}
                 fullWidth={true}
                 onChange={this._handleChange}
                 value={verseText}
                 rowsMax={6}/>
    );
  }
}

EditScreen.propTypes = {
  verseText: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default EditScreen;
