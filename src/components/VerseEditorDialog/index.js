import React from 'react';
import BaseDialog from '../BaseDialog';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import VerseEditor from './VerseEditor';

class EditorDialog extends BaseDialog {
  render() {

    const {translate, onCancel, open, onNext, verseTitle} = this.props;

    const title = (
      <span>
        <EditIcon/>
        {translate('edit_verse', {verse: verseTitle})}
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

export default EditorDialog;
