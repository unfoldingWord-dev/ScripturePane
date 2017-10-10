/**
  * @description This component displays a modal when the user clicks the add
  * resources button on the scripture pane module.
******************************************************************************/
import React from 'react';
import { Modal, Glyphicon } from 'react-bootstrap';
import style from '../css/Style';

import ChapterView from './chapterView/ChapterView';


class ChapterViewModal extends React.Component {

  render() {
    let { onHide, currentPaneSettings, contextIdReducer, showModal, show, bibles } = this.props;

    return (
      <Modal show={show} onHide={onHide} bsSize="lg" aria-labelledby="contained-modal-title-sm">
        <Modal.Header style={{ backgroundColor: "var(--accent-color-dark)" }}>
          <Modal.Title id="contained-modal-title-sm">
              <Glyphicon
                  onClick={onHide}
                  glyph={"remove"}
                  style={{color: "var(--reverse-color)", cursor: "pointer", fontSize: "18px", float: "right"}}
              />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: '0px', height: "500px", backgroundColor: "var(--reverse-color)", color: "var(--text-color)" }}>
          <div style={{height: "500px", display: 'flex'}}>
            <ChapterView {...this.props} />
          </div>
        </Modal.Body>
        <Modal.Footer style={{ padding: '0', backgroundColor: "var(--reverse-color)" }}>
          <button className="btn-prime" onClick={onHide}>Close</button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ChapterViewModal;
