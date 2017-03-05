/**
  * @author Manny Colon
  * @description This component displays a modal when the user clicks the add
  * resources button on the scripture pane module.
******************************************************************************/
const api = window.ModuleApi;
const React = api.React;
const RB = api.ReactBootstrap;
const { Modal, Button } = RB;
const ExpandedPane = require('./ExpandedPane');
const AddBible = require('./AddBible');

class ExpandedPanesModal extends React.Component {
  render() {
    let { onHide, currentPaneSettings, currentCheck, showModal } = this.props;
    let displayExpandedPanes = [];
      currentPaneSettings.forEach((element, index) =>{
        displayExpandedPanes.push(
          <ExpandedPane
            key={index}
            paneInfo={element}
            currentCheck={currentCheck}
          />
        )
       });
      if(displayExpandedPanes.length <= 2){
       for(let index = displayExpandedPanes.length + 1;  displayExpandedPanes.length <= 2; index++ ){
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
      <Modal {...this.props} bsSize="lg" aria-labelledby="contained-modal-title-sm">
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
