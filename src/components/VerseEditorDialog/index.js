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
    verticalAlign: 'middle'
  },
  body: {
    padding: 0
  }
};

/**
 * Renders a dialog for editing verses
 */
class VerseEditorDialog extends BaseDialog {
  render() {

    const {translate, onCancel, open, onSubmit, verseTitle} = this.props;

    const title = (
      <span>
        <EditIcon style={styles.icon}/>
        {translate('edit_verse', {passage: verseTitle})}
      </span>
    );

    return (
      <BaseDialog modal={true}
                  open={open}
                  bodyStyle={styles.body}
                  title={title}>
        <VerseEditor onCancel={onCancel}
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
