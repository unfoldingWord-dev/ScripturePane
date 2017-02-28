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
      staticPaneSettings: null,
      originalLanguageHeading: null,
      gatewayLanguageULBHeading: null,
      gatewayLanguageUDBHeading:null,
      targetLanguageHeading: null,
    };
  }

  componentWillMount() {
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
    this.setState({
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
    let originalLanguageName = "";
    let bookAbbr = "";
    var tcManifest = api.getDataFromCommon('tcManifest');
    let manifest = ModuleApi.getDataFromCommon("tcManifest");
    if (manifest && manifest.target_language){
      targetLanguageName = manifest.target_language.name;
    }
    if(manifest && (manifest.source_translations.length !== 0)){
      gatewayLanguageName = manifest.source_translations[0].language_id.toUpperCase();
      gatewayLanguageVersion = " (" + manifest.source_translations[0].resource_id.toUpperCase() + ")";
    }
    let gatewayLanguageULBHeading = {
      heading: gatewayLanguageName + " " + gatewayLanguageVersion,
      headingDescription: "Gateway Language"
    }
    let targetLanguageHeading = {
      heading: targetLanguageName + " (Draft)",
      headingDescription: "Target Language"
    }
    let gatewayLanguageUDBHeading = {
      heading: gatewayLanguageName + " (UDB)" ,
      headingDescription: "Gateway Language"
    }
    if (tcManifest.ts_project) {
      bookAbbr = tcManifest.ts_project.id;
    }
    else if (tcManifest.project) {
      bookAbbr = tcManifest.project.id;
    }
    else {
      bookAbbr = tcManifest.project_id;
    }

    if(this.isOldTestament(bookAbbr)){
      originalLanguageName = "Hebrew";
    } else {
      originalLanguageName = "Greek (UGNT)";
    }

    let originalLanguageHeading = {
      heading: originalLanguageName,
      headingDescription: "Original Language"
    }
    this.setState({originalLanguageHeading: originalLanguageHeading});
    this.setState({gatewayLanguageULBHeading: gatewayLanguageULBHeading});
    this.setState({targetLanguageHeading: targetLanguageHeading});
    this.setState({gatewayLanguageUDBHeading: gatewayLanguageUDBHeading});
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

  isOldTestament(projectBook) {
    var passedBook = false;
    for (var book in BooksOfBible) {
      if (book == projectBook) passedBook = true;
      if (BooksOfBible[book] == "Malachi" && passedBook) {
        return true;
      }
    }
    return false;
  }

  render() {
    var originalLanguage = api.getDataFromCheckStore(NAMESPACE, 'parsedGreek') ? api.getDataFromCheckStore(NAMESPACE, 'parsedGreek') : '';
    var targetLanguage = api.getDataFromCommon('targetLanguage') ? api.getDataFromCommon('targetLanguage') : '';
    var gatewayLanguageULB = api.getDataFromCommon('gatewayLanguageULB') ? api.getDataFromCommon('gatewayLanguageULB') : '';
    var gatewayLanguageUDB = api.getDataFromCommon('gatewayLanguageUDB') ? api.getDataFromCommon('gatewayLanguageUDB') : '';
    var tlDirection = api.getDataFromCommon('params').direction;
    return (
      <View
        currentPaneSettings={this.state.currentPaneSettings}
        currentCheck={this.props.currentCheck}
        originalLanguage={originalLanguage}
        targetLanguage={targetLanguage}
        gatewayLanguageULB={gatewayLanguageULB}
        gatewayLanguageUDB={gatewayLanguageUDB}
        removePane={this.removePane.bind(this)}
        modalVisibility={this.state.modalVisibility}
        showModal={() => this.setState({ modalVisibility: true })}
        hideModal={() => this.setState({ modalVisibility: false })}
        staticPaneSettings={this.state.staticPaneSettings}
        selectSourceLanguage={this.selectSourceLanguage.bind(this)}
        addPane={this.addPane.bind(this)}
        originalLanguageHeading={this.state.originalLanguageHeading}
        gatewayLanguageULBHeading={this.state.gatewayLanguageULBHeading}
        targetLanguageHeading={this.state.targetLanguageHeading}
        gatewayLanguageUDBHeading={this.state.gatewayLanguageUDBHeading}
        tlDirection={tlDirection}
      />
    );
  }
}

module.exports = {
  name: NAMESPACE,
  container: ScripturePane
}
