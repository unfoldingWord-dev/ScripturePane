/**
 * @description This component displays the Original Language, Gateway Language,
 * the Target Language and other Resources can be loaded in. It takes it's input
 * from uploads and from the scripture content manager.
 */
import React from 'react';
import PropTypes from 'prop-types';
import View from './components/View';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// constant
const NAMESPACE = 'ScripturePane';

class ScripturePane extends React.Component {
  constructor() {
    super();
    this.state = {
      currentPaneSettings: null,
      modalVisibility: false,
      expandedPaneVisibility: false,
      staticPaneSettings: null,
      selectedPane: false
    };
  }

  /**
   * @description - This removes a scripture source from the scripture pane.
   * @param {number} key - position index of the scripture source language
   *        in the currentPaneSettings array.
   */
  removePane(key) {
    let {settingsReducer, actions} = this.props;
    try {
      if (settingsReducer.toolsSettings.ScripturePane) {
        let paneSettings = settingsReducer.toolsSettings.ScripturePane.currentPaneSettings;
        paneSettings.splice(key, 1);
        actions.setToolSettings(NAMESPACE, 'currentPaneSettings', paneSettings);
      }
    } catch (e) {
      console.warn(e);
    }
  }

  /**
   * This method is called when an user selects a resource name to
   * be added to the scripture pane and it sets the state with this name in the
   * selectedPane property. it matches that name that was sleected with the
   * staticPaneSettings.
   * @param {object} value - selected Language Id And BibleId 'hi_ult', 'en_ult'.
   * @return {state} This will set the state to the selectedPane object
   */
  selectSourceLanguage(value) {
    const identifier = value.split('_');
    const selectedBibleId = {
      languageId: identifier[0],
      bibleId: identifier[1]
    };
    this.setState({selectedPane: value ? selectedBibleId : false});
  }

  /**
   * @description This handles loading a new resource to the scripture pane
   * it gets the currentPaneSettings array (the info of all the panes currently
   * rendered in the scripture pane component) from the checkstore. and then it
   * adds the new pane information and saves it in the checkstore. Finally, it
   * sets the modalVisibility to false to close the modal.
   */
  addPane() {
    let {settingsReducer, actions} = this.props;
    try {
      if (settingsReducer.toolsSettings[NAMESPACE]) {
        let currentPaneSettings = settingsReducer.toolsSettings[NAMESPACE].currentPaneSettings;
        if (this.state.selectedPane) {
          currentPaneSettings.push(this.state.selectedPane);
          actions.setToolSettings(NAMESPACE, 'currentPaneSettings',
            currentPaneSettings);
          this.setState({modalVisibility: false});
        }
      }
    } catch (e) {
      console.warn(e);
    }
  }

  render() {
    const {
      contextIdReducer,
      actions,
      translate,
      settingsReducer,
      resourcesReducer,
      projectDetailsReducer,
      currentToolViews,
      selectionsReducer
    } = this.props;

    return (
      <MuiThemeProvider>
        <View
          translate={translate}
          actions={actions}
          resourcesReducer={resourcesReducer}
          settingsReducer={settingsReducer}
          selectionsReducer={selectionsReducer}
          contextIdReducer={contextIdReducer}
          currentToolViews={currentToolViews}
          contextId={contextIdReducer.contextId}
          projectDetailsReducer={projectDetailsReducer}
          removePane={this.removePane.bind(this)}
          modalVisibility={this.state.modalVisibility}
          showModal={() => this.setState(
            {modalVisibility: true, selectedPane: false})}
          hideModal={() => this.setState({modalVisibility: false})}
          expandedPaneVisibility={this.state.expandedPaneVisibility}
          selectedPane={this.state.selectedPane}
          showExpandModal={() => this.setState({expandedPaneVisibility: true})}
          hideExpandModal={() => this.setState({expandedPaneVisibility: false})}
          selectSourceLanguage={this.selectSourceLanguage.bind(this)}
          addPane={this.addPane.bind(this)}
        />
      </MuiThemeProvider>
    );
  }
}

ScripturePane.propTypes = {
  translate: PropTypes.func.isRequired,
  projectDetailsReducer: PropTypes.object.isRequired,
  selectionsReducer: PropTypes.object.isRequired,
  currentToolViews: PropTypes.object.isRequired,
  resourcesReducer: PropTypes.object.isRequired,
  contextIdReducer: PropTypes.object.isRequired,
  settingsReducer: PropTypes.object.isRequired,
  actions: PropTypes.shape({
    setToolSettings: PropTypes.func.isRequired,
    getWordListForVerse: PropTypes.func.isRequired,
    loadLexiconEntry: PropTypes.func.isRequired,
    showPopover: PropTypes.func.isRequired,

  })
};

export default ScripturePane;
