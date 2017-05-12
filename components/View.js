import React from 'react';
import {Row, Glyphicon, Col} from 'react-bootstrap';
import Pane from './Pane';
import AddPaneModal from './AddPaneModal';
import ExpandedPanesModal from './ExpandedPanesModal';
import style from '../css/Style';
import AddBible from './AddBible';

class View extends React.Component {
  render() {
    let {
      modulesSettingsReducer,
      selectSourceLanguage,
      showExpandModal,
      modalVisibility,
      showModal,
      addPane,
      expandedPaneVisibility,
      selectedPane,
      hideExpandModal,
      hideModal,
      contextIdReducer
    } = this.props;
    let staticPaneSettings = modulesSettingsReducer.ScripturePane.staticPaneSettings;
    let currentPaneSettings = modulesSettingsReducer.ScripturePane.currentPaneSettings;
    let pane = currentPaneSettings;
    let scripturePane = [];
    let greek = false;
    let isGatewayLanguage = false;
    let bibles = this.props.resourcesReducer.bibles
    for (let key in pane) {
      let content = bibles[pane[key].sourceName];
      let heading = pane[key].heading;
      if (pane[key].sourceName === "originalLanguage") {
        greek = true;
      }
      if (pane[key].sourceName === "gatewayLanguage") {
        isGatewayLanguage = true;
      }
      let dir = pane[key].dir || this.props.projectDetailsReducer.manifest.target_language.direction;
      if (scripturePane.length <= 3) {
        scripturePane.push(
          <Pane
            {...this.props}
            isGatewayLanguage={isGatewayLanguage}
            greek={greek}
            key={key}
            id={key}
            content={content}
            heading={heading}
            dir={dir}
            removePane={this.props.removePane}
            arrayLength={pane.length}
          />
        );
        greek = false;
        isGatewayLanguage = false;
      } else {
        // will prompt user that only 4 scripture sources can be loaded at once
        console.warn("Only 4 scripture sources can be loaded at once");
      }
    }
    /**
    * @description This will add/push an array element to the scripturePane array
    * only when the length of the array is less than or equal to 2. this element
    * being added is the button to open the modal that adds more resources to
    * the scripturePane component.
    */
    for (let index = scripturePane.length; index < 3; index++ ) {
      scripturePane.push(
        <AddBible
          key={index}
          id={index}
          scripturePane={scripturePane}
          showModal={this.props.showModal}
        />
      );
    }

    return (
      <div style={style.scripturePane}>
        <div style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
          <div style={style.titleBar}>
            <span>Step 1. Read</span>
            <Glyphicon
                onClick={showExpandModal}
                glyph={"fullscreen"}
                style={{cursor: "pointer"}}
            />
          </div>
          <div style={style.body}>
            {scripturePane}
          </div>
        </div>
      <AddPaneModal
        show={modalVisibility}
        onHide={hideModal}
        staticPaneSettings={staticPaneSettings}
        selectSourceLanguage={selectSourceLanguage}
        addPane={addPane}
        selectedPane={selectedPane}
      />
      <ExpandedPanesModal
        {...this.props}
        bibles={this.props.resourcesReducer.bibles}
        show={expandedPaneVisibility}
        onHide={hideExpandModal}
        currentPaneSettings={currentPaneSettings}
        contextIdReducer={contextIdReducer}
        showModal={showModal}
      />
      </div>
    );
  }
}

module.exports = View;
