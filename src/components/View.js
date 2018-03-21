import React from 'react';
import PropTypes from 'prop-types';
import {Glyphicon} from 'react-bootstrap';
import Pane from './Pane';
import AddPaneModal from './AddPaneModal';
import ChapterViewModal from './ChapterViewModal';
import style from '../css/Style';
import AddBible from './AddBible';

class View extends React.Component {
  render() {
    let {
      actions,
      translate,
      selectionsReducer,
      settingsReducer,
      selectSourceLanguage,
      showExpandModal,
      projectDetailsReducer,
      contextIdReducer,
      modalVisibility,
      resourcesReducer,
      showModal,
      addPane,
      expandedPaneVisibility,
      selectedPane,
      hideExpandModal,
      hideModal
    } = this.props;
    let currentPaneSettings = settingsReducer.toolsSettings.ScripturePane.currentPaneSettings;
    let scripturePane = currentPaneSettings.map((paneSetting, index) => {
      return (
        <Pane
          actions={actions}
          contextIdReducer={contextIdReducer}
          resourcesReducer={resourcesReducer}
          selectionsReducer={selectionsReducer}
          key={index}
          index={index}
          bibleId={paneSetting.bibleId}
          languageId={paneSetting.languageId}
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
        <div key={index}
             style={index > 0 ? style.otherBible : style.firstBible}>
          <AddBible
            scripturePane={scripturePane}
            showModal={showModal}
          />
        </div>
      );
    }
    return (
      <div style={style.scripturePane}>
        <div style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
          <div style={style.titleBar}>
            <span>{translate('step1')}</span>
            <Glyphicon
              onClick={showExpandModal}
              glyph={'fullscreen'}
              style={{cursor: 'pointer'}}
              title="Click to show expanded resource panes"
            />
          </div>
          <div style={style.body}>
            {scripturePane}
          </div>
        </div>
        <ChapterViewModal
          translate={translate}
          actions={actions}
          selectionsReducer={selectionsReducer}
          settingsReducer={settingsReducer}
          resourcesReducer={resourcesReducer}
          projectDetailsReducer={projectDetailsReducer}
          contextIdReducer={contextIdReducer}
          bibles={this.props.resourcesReducer.bibles}
          show={expandedPaneVisibility}
          onHide={hideExpandModal}
          currentPaneSettings={currentPaneSettings}
          showModal={showModal}
        />
        <AddPaneModal
          {...this.props}
          translate={translate}
          show={modalVisibility}
          onHide={hideModal}
          selectSourceLanguage={selectSourceLanguage}
          addPane={addPane}
          selectedPane={selectedPane}
          currentPaneSettings={currentPaneSettings}
        />
      </div>
    );
  }
}

View.propTypes = {
  translate: PropTypes.func.isRequired,
  projectDetailsReducer: PropTypes.object.isRequired,
  currentToolViews: PropTypes.object.isRequired,
  resourcesReducer: PropTypes.object.isRequired,
  contextIdReducer: PropTypes.object.isRequired,
  settingsReducer: PropTypes.shape({
    toolsSettings: PropTypes.shape({
      ScripturePane: PropTypes.shape({
        currentPaneSettings: PropTypes.array
      })
    })
  }).isRequired,
  actions: PropTypes.shape({
    setToolSettings: PropTypes.func.isRequired,
    getWordListForVerse: PropTypes.func.isRequired,
    loadLexiconEntry: PropTypes.func.isRequired,
    showPopover: PropTypes.func.isRequired
  }).isRequired,
  selectionsReducer: PropTypes.object.isRequired,
  selectSourceLanguage: PropTypes.func.isRequired,
  showExpandModal: PropTypes.func.isRequired,
  modalVisibility: PropTypes.bool.isRequired,
  showModal: PropTypes.func.isRequired,
  addPane: PropTypes.func.isRequired,
  expandedPaneVisibility: PropTypes.bool.isRequired,
  selectedPane: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      bibleId: PropTypes.string,
      languageId: PropTypes.string
    })
  ]),
  hideExpandModal: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
  removePane: PropTypes.func.isRequired
};

export default View;
