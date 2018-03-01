/**
 * @description This component displays a modal when the user clicks the add
 * resources button on the scripture pane module.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {Modal, Glyphicon, FormControl} from 'react-bootstrap';

class AddPaneModal extends React.Component {
  render() {
    let { selectSourceLanguage, addPane, show, onHide, selectedPane, currentPaneSettings } = this.props;
    let { bibles } = this.props.resourcesReducer;
    let panes = [];

    // generate a list of resource names for dropdown list.
    Object.keys(bibles).forEach((languageId) => {
      const bibleIds = bibles[languageId];
      Object.keys(bibleIds).forEach((bibleId) => {
        console.log(languageId, bibleId);
        let { language_name, resource_title } = bibles[languageId][bibleId]["manifest"];
        let resourceText = bibleId !== "targetBible" ? " (" + resource_title + ")" : " (Current project)";
        let displayText = language_name + resourceText;
        const foundInCurrentPaneSettings = currentPaneSettings.filter((paneSetting) => {
          if (languageId === 'hi') console.log(paneSetting.bibleId, bibleId, paneSetting.languageId);
          return paneSetting.bibleId === bibleId && paneSetting.languageId === languageId;
        }).length > 0;

        panes.push(
          <option
            key={`${languageId}_${bibleId}`}
            value={`${languageId}_${bibleId}`}
            disabled={foundInCurrentPaneSettings}
          >
            {displayText}
          </option>
        );
      });
    });



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
          <FormControl
            componentClass="select"
            style={{ width: "300px" }}
            onChange={e => selectSourceLanguage(e.target.value)}
          >
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

AddPaneModal.propTypes = {
  selectSourceLanguage: PropTypes.func.isRequired,
  addPane: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  selectedPane: PropTypes.shape({
    bibleId: PropTypes.string,
    languageId: PropTypes.string
  }),
  currentPaneSettings: PropTypes.array.isRequired,
  resourcesReducer: PropTypes.object.isRequired
};

export default AddPaneModal;
