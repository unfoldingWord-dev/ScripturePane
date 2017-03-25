/**
* @author Manny Colon
* @description This component displays the Original Language, Gateway Language,
* the Target Language and other Resources can be loaded in. It takes it's input
* from uploads and from the scripture content manager.
******************************************************************************/
const api = window.ModuleApi;
const React = api.React;
const View = require('./components/View');
const BooksOfBible = require('./js/BooksOfBible.js');
const NAMESPACE = "ScripturePane";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class ScripturePane extends React.Component {
  constructor() {
    super();
    this.state = {
      currentPaneSettings: null,
      modalVisibility: false,
      expandedPaneVisibility: false,
      staticPaneSettings: null,
    };
  }
  /**
   * @description - This removes a scripture source from the scripture pane.
   * @param {number} key - position index of the scripture source language
   *        in the currentPaneSettings array.
   ******************************************************************************/
  removePane(key) {
    let paneSettings = JSON.parse(JSON.stringify(this.props.currentPaneSettings));
    paneSettings.splice(key, 1);
    this.props.addNewResource('currentPaneSettings', paneSettings);
    api.saveProject();
  }
  /**
   * @description this methos is called when an user selects a resource name to
   * be added to the scripture pane and it sets the state with this name in the
   * selectedPane property. it matches that name that was sleected with the
   * staticPaneSettings.
   * @param {object} event - An event object that we use to get the value
   * selected by the user from the select element
   * @return {state} This will set the state to the selectedPane object
  *******************************************************************************/
  selectSourceLanguage(event) {
    let sourceLanguageName = event.target.value;
    if (sourceLanguageName !== '') {
      let selectedPane = {};
      for (let key in this.props.staticPaneSettings) {
        if (this.props.staticPaneSettings[key].sourceName === sourceLanguageName) {
          selectedPane = this.props.staticPaneSettings[key];
        }
      }
      this.setState({ selectedPane: selectedPane });
    } else {
      this.setState({ selectedPane: null });
    }
  }
  /**
   * @description This handles loading a new resource to the scripture pane
   * it gets the currentPaneSettings array (the info of all the panes currently
   * rendered in the scripture pane component) from the checkstore. and then it
   * adds the new pane information and saves it in the checkstore. Finally, it
   * sets the modalVisibility to false to close the modal.
  *******************************************************************************/
  addPane() {
    let currentPaneSettings = this.props.currentPaneSettings;
    if (this.state.selectedPane) {
      currentPaneSettings.push(this.state.selectedPane);
      this.props.addNewResource('currentPaneSettings', currentPaneSettings);
      api.saveProject();
      this.setState({ modalVisibility: false });
    }
  }

  render() {
    var tlDirection = this.props.params.direction;
    return (
      <MuiThemeProvider>
        <View
          {...this.props}
          currentPaneSettings={this.props.currentPaneSettings}
          staticPaneSettings={this.props.staticPaneSettings}
          currentCheck={this.props.currentCheck}
          removePane={this.removePane.bind(this)}
          modalVisibility={this.state.modalVisibility}
          showModal={() => this.setState({ modalVisibility: true })}
          hideModal={() => this.setState({ modalVisibility: false })}
          expandedPaneVisibility={this.state.expandedPaneVisibility}
          showExpandModal={() => this.setState({ expandedPaneVisibility: true })}
          hideExpandModal={() => this.setState({ expandedPaneVisibility: false })}
          selectSourceLanguage={this.selectSourceLanguage.bind(this)}
          addPane={this.addPane.bind(this)}
          tlDirection={tlDirection}
        />
      </MuiThemeProvider>
    );
  }
}

module.exports = {
  name: NAMESPACE,
  container: ScripturePane
}
