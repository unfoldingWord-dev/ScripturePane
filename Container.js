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

class ScripturePane extends React.Component {
  constructor() {
    super();
    this.state = {
      currentPaneSettings: null,
      modalVisibility: false,
      staticPaneSettings:null
    };
  }

  componentWillMount() {
    //get default resources (originalLang, targetLang, gatewayLang) content
    this.getContentFromCheckStore();
  }

  componentWillReceiveProps(nextProps) {
    this.getContentFromCheckStore();
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Stops ScripturePane from re-rendering when the check module changes state
    return nextState !== this.state;
  }
  /**
  * @description This gets the default panes' Content From CheckStore, and target
  * lang direction as well as the the settings for the current resources in the
  * scripture pane.
  * @return {state} panes' content, target lang direction and currentPaneSettings.
  *******************************************************************************/
  getContentFromCheckStore(){
    let currentPaneSettings = api.getDataFromCheckStore(NAMESPACE, 'currentPaneSettings');
    let staticPaneSettings = api.getDataFromCheckStore(NAMESPACE, 'staticPaneSettings');
    this.setState({
      currentPaneSettings: currentPaneSettings,
      staticPaneSettings:staticPaneSettings
    });
  }
  /**
   * @description - This removes a scripture source from the scripture pane.
   * @param {number} key - position index of the scripture source language
   *        in the currentPaneSettings array.
   ******************************************************************************/
  removePane(key){
    let paneSettings = this.state.currentPaneSettings;
    paneSettings.splice(key, 1);
    this.setState({currentPaneSettings: paneSettings});
    api.putDataInCheckStore(NAMESPACE, 'currentPaneSettings', paneSettings);
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
  selectSourceLanguage(event){
    let sourceLanguageName = event.target.value;
    if(sourceLanguageName !== ''){
      let selectedPane = {};
      for(let key in this.state.staticPaneSettings){
        if(this.state.staticPaneSettings[key].sourceName === sourceLanguageName){
          selectedPane = this.state.staticPaneSettings[key];
        }
      }
      this.setState({selectedPane: selectedPane});
    }else {
      this.setState({selectedPane: null});
    }
  }
  /**
   * @description This handles loading a new resource to the scripture pane
   * it gets the currentPaneSettings array (the info of all the panes currently
   * rendered in the scripture pane component) from the checkstore. and then it
   * adds the new pane information and saves it in the checkstore. Finally, it
   * sets the modalVisibility to false to close the modal.
  *******************************************************************************/
  addPane(){
    let currentPaneSettings = api.getDataFromCheckStore(NAMESPACE, 'currentPaneSettings');
    if(this.state.selectedPane){
      currentPaneSettings.push(this.state.selectedPane);
      api.putDataInCheckStore(NAMESPACE, 'currentPaneSettings', currentPaneSettings);
      api.saveProject();
      this.setState({ modalVisibility: false, currentPaneSettings:currentPaneSettings });
    }
  }

  render() {
    var tlDirection = api.getDataFromCommon('params').direction;
    return (
      <View
        currentPaneSettings={this.state.currentPaneSettings}
        staticPaneSettings={this.state.staticPaneSettings}
        currentCheck={this.props.currentCheck}
        removePane={this.removePane.bind(this)}
        modalVisibility={this.state.modalVisibility}
        showModal={() => this.setState({ modalVisibility: true })}
        hideModal={() => this.setState({ modalVisibility: false })}
        selectSourceLanguage={this.selectSourceLanguage.bind(this)}
        addPane={this.addPane.bind(this)}
        tlDirection={tlDirection}
      />
    );
  }
}

module.exports = {
  name: NAMESPACE,
  container: ScripturePane
}
