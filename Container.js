/**
 * @description This component displays the Original Language, Gateway Language,
 * the Target Language and other Resources can be loaded in. It takes it's input
 * from uploads and from the scripture content manager.
 */
import React from 'react';
import View from './components/View';
import BooksOfBible from './js/BooksOfBible.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// constant declaration
const NAMESPACE = "ScripturePane";

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
    let { settingsReducer, actions } = this.props;
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
  * @description this methos is called when an user selects a resource name to
  * be added to the scripture pane and it sets the state with this name in the
  * selectedPane property. it matches that name that was sleected with the
  * staticPaneSettings.
  * @param {object} event - An event object that we use to get the value
  * selected by the user from the select element
  * @return {state} This will set the state to the selectedPane object
  */
  selectSourceLanguage(event) {
    let selectedBibleId = event.target.value;
    this.setState({ selectedPane: selectedBibleId });
  }
  /**
   * @description This handles loading a new resource to the scripture pane
   * it gets the currentPaneSettings array (the info of all the panes currently
   * rendered in the scripture pane component) from the checkstore. and then it
   * adds the new pane information and saves it in the checkstore. Finally, it
   * sets the modalVisibility to false to close the modal.
   */
  addPane() {
    let { settingsReducer, actions } = this.props;
    try {
      if (settingsReducer.toolsSettings[NAMESPACE]) {
        let currentPaneSettings = settingsReducer.toolsSettings[NAMESPACE].currentPaneSettings;
        if (this.state.selectedPane) {
          currentPaneSettings.push(this.state.selectedPane);
          actions.setToolSettings(NAMESPACE, 'currentPaneSettings', currentPaneSettings);
          this.setState({ modalVisibility: false });
        }
      }
    } catch (e) {
      console.warn(e);
    }
  }

  render() {
    return (
      <MuiThemeProvider>
        <View
          {...this.props}
          contextId={this.props.contextIdReducer.contextId}
          removePane={this.removePane.bind(this)}
          modalVisibility={this.state.modalVisibility}
          showModal={() => this.setState({ modalVisibility: true, selectedPane: false })}
          hideModal={() => this.setState({ modalVisibility: false })}
          expandedPaneVisibility={this.state.expandedPaneVisibility}
          selectedPane={this.state.selectedPane}
          showExpandModal={() => this.setState({ expandedPaneVisibility: true })}
          hideExpandModal={() => this.setState({ expandedPaneVisibility: false })}
          selectSourceLanguage={this.selectSourceLanguage.bind(this)}
          addPane={this.addPane.bind(this)}
        />
      </MuiThemeProvider>
    );
  }
}

module.exports = {
  name: NAMESPACE,
  container: ScripturePane
};
