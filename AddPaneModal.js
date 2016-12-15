/**
  * @author      Manny Colon
  * @description This component displays a modal when the user clicks add resources
  *              on the scripture pane
******************************************************************************/
const api = window.ModuleApi;
const React = api.React;
const RB = api.ReactBootstrap;
const {Modal, Button, FormControl} = RB;

class AddPaneModal extends React.Component {
  constructor() {
    super();
    this.state = {
      file: "",
      sourceLanguageName: null,
      staticPaneSettings: null,
      selectedPane: null,
    };
  }

  componentWillMount(){
    //get all the static settings saved for all panes in the checkstore
    let staticPaneSettings = api.getDataFromCheckStore('ScripturePane', 'staticSettings');
    //save static settings of all panes in state
    this.setState({staticPaneSettings: staticPaneSettings});
  }
  /**
   * @description This handles loading a new resource to the scripture pane
   * it gets the currentPaneSettings array (the info of all the panes currently
   * rendered in the scripture pane component) from the checkstore. and then it
   * adds the new pane information and saves it in the checkstore. Finally, it
   * uses the onHide prop to close the modal.
  *******************************************************************************/
  handleLoad(){
    let currentPaneSettings = api.getDataFromCheckStore('ScripturePane', 'currentPaneSettings');
    let newPane = this.state.selectedPane;
    if(newPane){
      currentPaneSettings.push(newPane)
      api.putDataInCheckStore("ScripturePane", 'currentPaneSettings', currentPaneSettings);
      api.saveProject();
      this.props.onHide();
    }
  }
  /**
   * @description This generates a list of resource names and saves it in option
   * elements for the user to select from an select element or dropdown list.
   * @return {array} paneNames - An array of option elements with all resources
   * names that are vailable to be added to the scripture paneNames containing
   * information of the upload event.
  *******************************************************************************/
  generateNameOptions(){
    let paneSettings = this.state.staticPaneSettings;
    let paneNames = [];
    for(let key in paneSettings){
      paneNames.push(
        <option key={key} value={paneSettings[key].sourceName.toString()}>
          {paneSettings[key].sourceName}
        </option>
      );
    }
    return paneNames;
  }
  /**
   * @description This hanldes file upload. It gets the file name, path etc.
   * @param {object} event - A object containing information of the upload event
   *        event.target.files[0] returns the file object hwihc holds name, path
  *******************************************************************************/
  handleFile(event){
    const file = event.target.files[0];
    console.log(file);
    /*
    File {name: "Untitled.txt",
    path: "/Users/mannycolon/Desktop/Untitled.txt",
    lastModified: 1481700747000,
    lastModifiedDate: Wed Dec 14 2016 02:32:27 GMT-0500 (EST),
    webkitRelativePath: ""…}
    */
  }
  /**
   * @description this methos is called when an user selects a resource name to
   * be added to the scripture pane and it sets the state with this name in the
   * selectedPane property. it matches that name that was sleected with the
   * staticPaneSettings that was prevously set in the state before the component
   * mounted (componentWillMount).
   * @param {object} event - An event object that we use to get the value
   * selected by the user from the select element
   * @return {state} This will set the state to the selectedPane object
  *******************************************************************************/
  selectOption(event){
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

  render() {
    return (
      <Modal {...this.props} bsSize="lg" aria-labelledby="contained-modal-title-sm">
        <Modal.Header style={{backgroundColor: "#333333"}} closeButton>
          <Modal.Title id="contained-modal-title-sm"
                      style={{textAlign: "center", color: "#FFFFFF"}}>
              Add Resources
          </Modal.Title>
        </Modal.Header>
          <Modal.Body style={{backgroundColor: "#333333", color: "#FFFFFF", padding: "45px 80px"}}>
            <h4 style={{textAlign:"center", marginBottom: "45px"}}>
                Select the settings for the scripture source you want
                to load in to the scripture pane
            </h4>
            {/*
             <input type="file" name="file" ref="file"
                    onChange={this.handleFile.bind(this)}
             /><br />
             Under construction for content manager
             */}
             <label>Select source language name</label>
             <FormControl componentClass="select" style={{width: "20%"}}
                          onChange={this.selectOption.bind(this)}>
               <option value=""></option>
               {this.generateNameOptions()}
             </FormControl>
          </Modal.Body>
        <Modal.Footer style={{backgroundColor: "#333333"}}>
          <Button bsStyle="success" onClick={this.handleLoad.bind(this)}>Load</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

module.exports = AddPaneModal;
