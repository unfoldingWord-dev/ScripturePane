  /**
  * @author Manny Colon
  * @description This component displays the Original Language, Gateway Language,
  * the Target Language and other Resources can be loaded in. It takes it's input
  * from uploads and from the scripture content manager.
  ******************************************************************************/
const api = window.ModuleApi;
const React = api.React;
const View = require('./components/View');

const NAMESPACE = "ScripturePane";

class ScripturePane extends React.Component {
  constructor() {
    super();
    this.state = {
      currentCheck: null,
      originalLanguage: null,
      targetLanguage: null,
      gatewayLanguage: null,
      tlDirection: null,
      currentPaneSettings: null,
      modalVisibility: false,
      staticPaneSettings: null,
      originalLanguageHeading: null,
      gatewayLanguageHeading: null,
      targetLanguageHeading: null,
    };
  }

  componentWillMount() {
    this.setState({currentCheck: this.props.currentCheck});
    //get default resources (originalLang, targetLang, gatewayLang) content
    this.getContentFromCheckStore();
    //get pane heading names
    this.getPaneHeadingName();
    //get all the static settings saved for all panes in the checkstore
    let staticPaneSettings = api.getDataFromCheckStore(NAMESPACE, 'staticSettings');
    //save static settings of all panes in state
    this.setState({staticPaneSettings: staticPaneSettings});
  }

  componentWillReceiveProps(nextProps) {
    this.setState({currentCheck: nextProps.currentCheck});
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
    var originalLanguage = api.getDataFromCheckStore(NAMESPACE, 'parsedGreek');
    var targetLanguage = api.getDataFromCommon('targetLanguage');
    var gatewayLanguage = api.getDataFromCommon('gatewayLanguage');
    this.targetLanguageDirection = api.getDataFromCommon('params').direction;
    let currentPaneSettings = api.getDataFromCheckStore(NAMESPACE, 'currentPaneSettings');
    this.setState({
      originalLanguage: !originalLanguage ? "" : originalLanguage,
      targetLanguage: !targetLanguage ? "" : targetLanguage,
      gatewayLanguage: !gatewayLanguage ? "" : gatewayLanguage,
      tlDirection: this.targetLanguageDirection,
      currentPaneSettings: currentPaneSettings,
    });
  }
  /**
  * @description This gets the pane heading names
  * @return{state} saves the heading names for (originalLang, targetLang,
  * gatewayLang) within the state of the ScripturePane component
  *******************************************************************************/
  getPaneHeadingName(){
    let targetLanguageName = "";
    let gatewayLanguageName = "";
    let gatewayLanguageVersion = "";
    let manifest = ModuleApi.getDataFromCommon("tcManifest");
    if (manifest && manifest.target_language){
      targetLanguageName = manifest.target_language.name;
    }
    if(manifest && (manifest.source_translations.length !== 0)){
      gatewayLanguageName = manifest.source_translations[0].language_id.toUpperCase();
      gatewayLanguageVersion = " (" + manifest.source_translations[0].resource_id.toUpperCase() + ")";
    }
    let gatewayLanguageHeading = {
      heading: gatewayLanguageName + " " + gatewayLanguageVersion,
      headingDescription: "Gateway Language"
    }
    let targetLanguageHeading = {
      heading: targetLanguageName + " (Draft)",
      headingDescription: "Target Language"
    }
    //TODO: eventually we need to add the originalLanguage heading dynamically
    let originalLanguageHeading = {
      heading: "Greek (UGNT)",
      headingDescription: "Original Language"
    }
    this.setState({originalLanguageHeading: originalLanguageHeading});
    this.setState({gatewayLanguageHeading: gatewayLanguageHeading});
    this.setState({targetLanguageHeading: targetLanguageHeading});
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
      let paneSettings = this.state.staticPaneSettings;
      let selectedPane = {};
      for(let key in paneSettings){
        if(paneSettings[key].sourceName === sourceLanguageName){
          selectedPane = paneSettings[key];
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
      this.setState({ modalVisibility: false });
    }
  }

  render() {
    return (
      <View
        currentPaneSettings={this.state.currentPaneSettings}
        currentCheck={this.state.currentCheck}
        originalLanguage={this.state.originalLanguage}
        targetLanguage={this.state.targetLanguage}
        gatewayLanguage={this.state.gatewayLanguage}
        removePane={this.removePane.bind(this)}
        modalVisibility={this.state.modalVisibility}
        showModal={() => this.setState({ modalVisibility: true })}
        hideModal={() => this.setState({ modalVisibility: false })}
        staticPaneSettings={this.state.staticPaneSettings}
        selectSourceLanguage={this.selectSourceLanguage.bind(this)}
        addPane={this.addPane.bind(this)}
        originalLanguageHeading={this.state.originalLanguageHeading}
        gatewayLanguageHeading={this.state.gatewayLanguageHeading}
        targetLanguageHeading={this.state.targetLanguageHeading}
        tlDirection={this.state.tlDirection}
      />
    );
  }
}

module.exports = {
  name: NAMESPACE,
  container: ScripturePane
}
