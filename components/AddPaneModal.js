/**
 * @description This component displays a modal when the user clicks the add
 * resources button on the scripture pane module.
 */
import React from 'react';
import {Modal, Glyphicon, FormControl} from 'react-bootstrap';

export default class AddPaneModal extends React.Component {
  render() {
    let { selectSourceLanguage, addPane, show, onHide, selectedPane } = this.props;
    let { bibles } = this.props.resourcesReducer;
    /**
     * @description The code below generates a list of resource names and saves
     * it in option elements for the user to select from a dropdown list.
     */
    let panes = [];
    for (let bibleId in bibles) {
      if (bibles.hasOwnProperty(bibleId)) {
        let { language_name, resource_title } = bibles[bibleId]["manifest"];
        let resourceText = bibleId !== "targetLanguage" ? " (" + resource_title + ")" : "" ;
        let displayText = language_name + resourceText;
        panes.push(
          <option key={bibleId} value={bibleId.toString()}>
            {displayText}
          </option>
        );
      }
    }

    return (
      <Modal show={show} onHide={onHide} bsSize="lg" aria-labelledby="contained-modal-title-sm">
        <Modal.Header style={{ backgroundColor: "var(--accent-color-dark)" }}>
          <Modal.Title id="contained-modal-title-sm"
            style={{ textAlign: "center", color: "var(--reverse-color)" }}>
            Add Resources
            <Glyphicon
                onClick={onHide}
                glyph={"remove"}
                style={{color: "var(--reverse-color)", cursor: "pointer", fontSize: "18px", float: "right"}}
            />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "var(--reverse-color)", color: "var(--accent-color-dark)", padding: "45px", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <h4 style={{ marginBottom: "30px" }}>
            Select language
            </h4>
          <FormControl componentClass="select" style={{ width: "300px" }}
            onChange={e => { selectSourceLanguage(e) }}>
            <option value="">Select</option>
            {panes}
          </FormControl>
        </Modal.Body>
        <Modal.Footer style={{ padding: '0', backgroundColor: "var(--reverse-color)" }}>
          <button className="btn-second" onClick={onHide}>Close</button>
          <button className="btn-prime" disabled={ !selectedPane } onClick={() => addPane()}>Load</button>
        </Modal.Footer>
      </Modal>
    );
  }
}
