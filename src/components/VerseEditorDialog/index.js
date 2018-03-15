import React from 'react';
import PropTypes from 'prop-types';
import BaseDialog from '../BaseDialog';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import VerseEditor from './VerseEditor';

class VerseEditorDialog extends BaseDialog {
  render() {

    const {translate, onCancel, open, onNext, verseTitle} = this.props;

    const title = (
      <span>
        <EditIcon/>
        {translate('edit_verse', {passage: verseTitle})}
      </span>
    );

    // TODO: pass in custom actions so we can have a back button
    return (
      <BaseDialog secondaryLabel={translate('buttons.cancel_button')}
                  modal={true}
                  open={open}
                  primaryLabel={translate('buttons.next_button')}
                  onSubmit={onNext}
                  title={title}
                  onClose={onCancel}>
        <VerseEditor/>
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

  onNext: PropTypes.func // deprecated
};

export default VerseEditorDialog;
