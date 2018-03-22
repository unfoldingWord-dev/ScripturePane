import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

const styles = {
  input: {
    width: '100%',
    resize: 'none',
    padding: '10px',
    border: 'solid 1px var(--border-color)',
    fontStyle: 'inherit',
    fontVariant: 'inherit',
    fontWeight: 'inherit',
    fontStretch: 'inherit',
    fontSize: 'inherit',
    lineHeight: 'inherit',
    fontFamily: 'inherit',
    cursor: 'inherit',
    outline: 'none',
    backgroundColor: 'transparent',
    WebkitAppearance: 'textfield',
    color: 'rgba(0, 0, 0, 0.870588)'
  }
};

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
      <textarea
        id="verse-editor-field"
        rows={4}
        style={styles.input}
        autoFocus={true}
        onChange={this._handleChange}
        value={verseText}/>
    );
  }
}

EditScreen.propTypes = {
  verseText: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default EditScreen;
