import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'material-ui/Checkbox';

const styles = {
  root: {
    display: 'flex'
  },
  column: {
    flexGrow: 1
  },
  checkbox: {
    marginBottom: 16
  }
};

/**
 * Renders checkboxes for the user to indicate the reason for the change
 */
class ReasonScreen extends React.Component {
  render() {
    const {translate} = this.props;

    return (
      <div style={styles.root}>
        <div style={styles.column}>
          <Checkbox style={styles.checkbox} label={translate('editor.spelling')}/>
          <Checkbox style={styles.checkbox} label={translate('editor.punctuation')}/>
          <Checkbox style={styles.checkbox} label={translate('editor.word_choice')}/>
        </div>
        <div style={styles.column}>
          <Checkbox style={styles.checkbox} label={translate('editor.meaning')}/>
          <Checkbox style={styles.checkbox} label={translate('editor.grammar')}/>
          <Checkbox style={styles.checkbox} label={translate('editor.other')}/>
        </div>
      </div>
    );
  }
}

ReasonScreen.propTypes = {
  translate: PropTypes.func.isRequired
};

export default ReasonScreen;
