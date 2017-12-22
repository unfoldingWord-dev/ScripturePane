import React from 'react';
import { Row, Glyphicon, Col } from 'react-bootstrap';
import Pane from './Pane';
import AddPaneModal from './AddPaneModal';
import ChapterViewModal from './ChapterViewModal';
import style from '../css/Style';
import AddBible from './AddBible';

class View extends React.Component {
  render() {
    let {
      settingsReducer,
      selectSourceLanguage,
      showExpandModal,
      modalVisibility,
      showModal,
      addPane,
      expandedPaneVisibility,
      selectedPane,
      hideExpandModal,
      hideModal
    } = this.props;
    let staticPaneSettings = settingsReducer.toolsSettings.ScripturePane.staticPaneSettings;
    let currentPaneSettings = settingsReducer.toolsSettings.ScripturePane.currentPaneSettings;

    let scripturePane = currentPaneSettings.map((bibleId, index) => {
      console.log( "Debug props: -actions: "  + JSON.stringify(this.props.actions) + " " + 
                    "-contextidreducer "       + JSON.stringify(this.props.contextIdReducer ) + " " +
                    "-resourcesreducer "       + JSON.stringify(this.props.resourcesReducer ) + " " +
                    "-index "                  + index + " " +
                    "-bibleid "                + bibleId + " " + 
                    "-currentpanesettings "    + JSON.stringify(currentPaneSettings));
      return (
        <Pane
          {...this.props}
          key={index}
          index={index}
          bibleId={bibleId}
          removePane={this.props.removePane}
          arrayLength={currentPaneSettings.length}
        />
      );
    });

    /**
    * @description This will add/push an array element to the scripturePane array
    * only when the length of the array is less than or equal to 2. this element
    * being added is the button to open the modal that adds more resources to
    * the scripturePane component.
    */
    for (let index = scripturePane.length; index < 3; index++) {
      scripturePane.push(
        <div key={index} style={index > 0 ? style.otherBible : style.firstBible}>
          <AddBible
            scripturePane={scripturePane}
            showModal={this.props.showModal}
          />
        </div>
      );
    }
    return (
      <div style={style.scripturePane}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <div style={style.titleBar}>
            <span>Step 1. Read</span>
            <Glyphicon
              onClick={showExpandModal}
              glyph={"fullscreen"}
              style={{ cursor: "pointer" }}
              title="Click to show expanded resource panes"
            />
          </div>
          <div style={style.body}>
            {scripturePane}
          </div>
        </div>
        <AddPaneModal
          {...this.props}
          show={modalVisibility}
          onHide={hideModal}
          staticPaneSettings={staticPaneSettings}
          selectSourceLanguage={selectSourceLanguage}
          addPane={addPane}
          selectedPane={selectedPane}
          currentPaneSettings={currentPaneSettings}
        />
        <ChapterViewModal
          {...this.props}
          bibles={this.props.resourcesReducer.bibles}
          show={expandedPaneVisibility}
          onHide={hideExpandModal}
          currentPaneSettings={currentPaneSettings}
          showModal={showModal}
        />
      </div>
    );
  }
}

export default View;
