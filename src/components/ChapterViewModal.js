/**
 * This component displays a modal when the user clicks
 * the button to add resources on the scripture pane module.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {Glyphicon, Modal} from 'react-bootstrap';
import style from '../css/Style';
// components
import ChapterView from './chapterView/ChapterView';

class ChapterViewModal extends React.Component {

  render() {
    const {
      translate,
      onHide,
      show,
      actions,
      selectionsReducer,
      showModal,
      settingsReducer,
      projectDetailsReducer,
      contextIdReducer,
      resourcesReducer
    } = this.props;
    const {target_language, project} = projectDetailsReducer.manifest;
    const title = target_language && target_language.book &&
    target_language.book.name ?
      target_language.book.name :
      project.name;
    return (
      <Modal show={show} onHide={onHide} bsSize="lg"
             aria-labelledby="contained-modal-title-sm">
        <Modal.Header style={{backgroundColor: 'var(--accent-color-dark)'}}>
          <Modal.Title id="contained-modal-title-sm" style={style.modalTitle}>
            {title}
            <Glyphicon
              onClick={onHide}
              glyph={'remove'}
              style={{
                color: 'var(--reverse-color)',
                cursor: 'pointer',
                fontSize: '18px',
                float: 'right'
              }}
            />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{
          padding: '0px',
          height: '500px',
          backgroundColor: 'var(--reverse-color)',
          color: 'var(--text-color)'
        }}>
          <div style={{height: '500px', display: 'flex'}}>
            <ChapterView contextIdReducer={contextIdReducer}
                         translate={translate}
                         settingsReducer={settingsReducer}
                         actions={actions}
                         selectionsReducer={selectionsReducer}
                         showModal={showModal}
                         projectDetailsReducer={projectDetailsReducer}
                         resourcesReducer={resourcesReducer}/>
          </div>
        </Modal.Body>
        <Modal.Footer
          style={{padding: '0', backgroundColor: 'var(--reverse-color)'}}>
          <button className="btn-prime" onClick={onHide}>Close</button>
        </Modal.Footer>
      </Modal>
    );
  }
}

ChapterViewModal.propTypes = {
  translate: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
  selectionsReducer: PropTypes.object.isRequired,
  contextIdReducer: PropTypes.object.isRequired,
  resourcesReducer: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  showModal: PropTypes.func.isRequired,
  settingsReducer: PropTypes.object.isRequired,
  onHide: PropTypes.func.isRequired,
  projectDetailsReducer: PropTypes.object.isRequired
};

export default ChapterViewModal;
