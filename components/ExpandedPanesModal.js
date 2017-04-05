/**
  * @description This component displays a modal when the user clicks the add
  * resources button on the scripture pane module.
******************************************************************************/
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import ExpandedPane from './ExpandedPane';
import AddBible from './AddBible';

class ExpandedPanesModal extends React.Component {
  render() {
    let { onHide, currentPaneSettings, contextIdReducer, showModal, show, bibles } = this.props;
    let displayExpandedPanes = [];
    currentPaneSettings.forEach((element, index) => {
      displayExpandedPanes.push(
        <ExpandedPane
          {...this.props}
          key={index}
          paneInfo={element}
          contextIdReducer={contextIdReducer}
          bibles={bibles}
        />
      )
    });
    if (displayExpandedPanes.length <= 2) {
      for (let index = displayExpandedPanes.length + 1; displayExpandedPanes.length <= 2; index++) {
        displayExpandedPanes.push(
          <AddBible
            key={index}
            scripturePane={displayExpandedPanes}
            showModal={showModal}
          />
        );
      }
    }
    return (
      <Modal show={show} onHide={onHide} bsSize="lg" aria-labelledby="contained-modal-title-sm">
        <Modal.Header style={{ backgroundColor: "#333333" }} closeButton>
          <Modal.Title id="contained-modal-title-sm"
            style={{ textAlign: "center", color: "#FFFFFF" }}>

          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: '0px', height: "550px", backgroundColor: "#333333", color: "#FFFFFF" }}>
          <div style={{height: "550px", backgroundColor: "#ffffff"}}>
            {displayExpandedPanes}
          </div>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#333333" }}>
          <Button bsStyle="danger" onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

module.exports = ExpandedPanesModal;
