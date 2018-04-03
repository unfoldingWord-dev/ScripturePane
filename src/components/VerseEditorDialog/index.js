import React from 'react';
import PropTypes from 'prop-types';
import BaseDialog from '../BaseDialog';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import VerseEditor from './VerseEditor';

const styles = {
  icon: {
    color: '#ffffff',
    width: 25,
    height: 25,
    marginRight: 5,
    marginBottom: 5,
    verticalAlign: 'middle',
  },
  body: {
    padding: 0
  }
};

/**
 * Renders a dialog for editing verses
 * @property {func} translate - the locale function
 * @property {func} onCancel - callback when the edit is canceled
 * @property {bool} open - controls whether the dialog is open
 * @property {func} onSubmit - callback when the edit is submitted
 * @property {string} verseTitle - the human readable title of the verse passage
 * @property {string} verseText - the verse text to be edited
 */
class VerseEditorDialog extends React.Component {
  render() {

    const {translate, onCancel, open, onSubmit, verseText, verseTitle} = this.props;

    const title = (
      <span>
        <EditIcon style={styles.icon}/>
        {translate('edit_verse_title', {passage: verseTitle})}
      </span>
    );

    return (
      <BaseDialog modal={true}
                  open={open}
                  bodyStyle={styles.body}
                  title={title}>
        <VerseEditor onCancel={onCancel}
                     verseText={verseText}
                     translate={translate}
                     onSubmit={onSubmit}/>
      </BaseDialog>
    );
  }
}

VerseEditorDialog.propTypes = {
  translate: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  verseTitle: PropTypes.string.isRequired,
  verseText: PropTypes.string.isRequired,
};

export default VerseEditorDialog;
