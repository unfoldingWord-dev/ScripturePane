  /**
  * @author Manny Colon
  * @description This component displays the Original Language, Gateway Language,
  * the Target Language and other Resources can be loaded in. It takes it's input
  * from uploads and from the scripture content manager.
  ******************************************************************************/
const api = window.ModuleApi;
const React = api.React;
const RB = api.ReactBootstrap;
const {Row, Well, Glyphicon, Col} = RB;
const Pane = require('./Pane');
const NAMESPACE = "ScripturePane";
const AddPaneModal = require('./AddPaneModal');
const style = require('./Style');

class ScripturePane extends React.Component {
  constructor() {
    super();
    this.state = {
      originalLanguage: null,
      targetLanguage: null,
      gatewayLanguage: null,
      tlDirection: null,
      currentPaneSettings: null,
      modalShow: false,
    };
  }

  componentWillMount() {
    //get default resources (originalLang, targetLang, gatewayLang) content
    this.getContentFromCheckStore();
    //get pane heading names
    this.getPaneHeadingName();
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
    let gatewayLanguageHeading = "Gateway Language: " + gatewayLanguageName + " " + gatewayLanguageVersion;
    let targetLanguageHeading = "Target Language: " + targetLanguageName + " (Draft)";
    //TODO: eventually we need to add the originalLanguage heading dynamically
    let originalLanguageHeading = "Original Language: " + "Greek " + "(UGNT)";
    this.setState({originalLanguageHeading: originalLanguageHeading});
    this.setState({gatewayLanguageHeading: gatewayLanguageHeading});
    this.setState({targetLanguageHeading: targetLanguageHeading});
  }
  /**
  * @description This displays, generates and maintains the array that holds all the
  * resource panes currently rendered on the screen.
  * @return {array} ScripturePane - an array of resource panes
  *******************************************************************************/
  displayPanes(){
    let pane = this.state.currentPaneSettings;
    let scripturePane = [];
    let greek;
    for(let key in pane){
      let content = this.state[pane[key].sourceName];
      let dir;
      //ex. heading = this.state.gatewayLanguageHeading = "gatewayLanguage" + "Heading"
      let heading = this.state[pane[key].sourceName + "Heading"];
      if(pane[key].sourceName === "targetLanguage"){
        dir =  this.targetLanguageDirection;
      }else if (pane[key].sourceName === "originalLanguage") {
        greek = true;
        dir = pane[key].dir;
      }else{
        dir = pane[key].dir;
      }
      if(scripturePane.length <= 4){
        scripturePane.push(
          <Pane
            greek={greek}
            key={key}
            content={content}
            heading={heading}
            dir={dir}
            remove={this.removePane.bind(this, key)}
          />
        );
        greek = false;
      }else{
        //will prompt user that only 4 scripture sources can be loaded at once
        console.warn("Only 4 scripture sources can be loaded at once");
      }
    }
    if(scripturePane.length <= 3){
      scripturePane = this.renderAddResourcesButton(scripturePane);
    }
    return scripturePane;
  }
  /**
  * @description This will add/push an array element to the scripturePane array
  * only when the length of the array is less than or equal to 3. this element
  * being added is a button to add more resources to the scripturePane component.
  * @param {Array} scripturePane - the array of panes currently being rendered.
  * @return {Array} scripturePane - array updated with add resources button.
  *******************************************************************************/
  renderAddResourcesButton(scripturePane){
    scripturePane.push(
      <Col key={3} md={3} sm={3} xs={3} lg={3}
           style={{width: "200px", height: "200px"}}>
        <div style={{margin: "45px 60px 0px 60px", cursor: "pointer", width: "50px", height: "50px", border: "#4BC7ED dashed", padding: "12px"}}
             onClick={()=>this.setState({ modalShow: true })}>
          <Glyphicon glyph={"plus"} style={{color: "#4BC7ED", fontSize: "20px"}}/>
        </div>
          <h6 style={{textAlign: "center", color: "#4BC7ED"}}>Add Resources</h6>
          <AddPaneModal show={this.state.modalShow}
                        onHide={() => this.setState({ modalShow: false })} />
      </Col>
    );
    return scripturePane;
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
    api.putDataInCheckStore('scripturePane', 'currentPaneSettings', paneSettings);
    api.saveProject();
  }
  render() {
    return (
      <div style={{marginTop: '15px'}}>
        <h3 style={style.pane.header}>Scriptural Context</h3>
        <Row>
          {this.displayPanes()}
        </Row>
      </div>
    );
  }
}

module.exports = ScripturePane;
