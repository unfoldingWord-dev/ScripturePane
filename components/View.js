
const api = window.ModuleApi;
const React = api.React;
const RB = api.ReactBootstrap;
const {Row, Glyphicon, Col} = RB;
const Pane = require('./Pane');
const AddPaneModal = require('./AddPaneModal');
const ExpandedPanesModal = require('./ExpandedPanesModal');
const style = require('../css/Style');
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
const AddBible = require('./AddBible');

class View extends React.Component {
  render() {
    let { showExpandModal, currentPaneSettings, currentCheck, showModal } = this.props;
    let pane = currentPaneSettings;
    let scripturePane = [];
    let greek = false;
    let isGatewayLanguage = false;
    for (let key in pane) {
      let content = pane[key].content
      let heading = pane[key].heading
      if (pane[key].sourceName === "originalLanguage") {
        greek = true;
      }
        if (pane[key].sourceName === "gatewayLanguage") {
          isGatewayLanguage = true;
        }
       var dir = pane[key].dir || "ltr";
        if (scripturePane.length <= 3) {
          scripturePane.push(
            <Pane
              currentCheck={currentCheck}
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
          //will prompt user that only 4 scripture sources can be loaded at once
          console.warn("Only 4 scripture sources can be loaded at once");
        }
      }
      /**
      * @description This will add/push an array element to the scripturePane array
      * only when the length of the array is less than or equal to 3. this element
      * being added is the button to open the modal that adds more resources to
      * the scripturePane component.
      *******************************************************************************/
      for(let index = scripturePane.length + 1;  scripturePane.length <= 2; index++ ){
        scripturePane.push(
          <AddBible
            key={index}
            id={index}
            scripturePane={scripturePane}
            showModal={this.props.showModal}
          />
        );
      }
      const title = (
        <div style={{'fontSize':'16px', 'fontWeight':'bold', color: '#ffffff', margin: "0px"}}>
          <span>Step 1. Read</span>
          <Glyphicon
            onClick={showExpandModal}
            glyph={"fullscreen"}
            style={{cursor: "pointer", fontSize: "20px", float: "right"}}
          />
        </div>
      );
      return (
        <div style={{ margin: '10px' }}>
        <Card zDepth={2}>
          <CardHeader
            style={{ background: '#2196F3', padding: "10px"}}
            textStyle={{display: "block"}}
            children={title}
          />
          <Row style={{marginLeft: '0px', marginRight: '0px', height: "100%"}}>
            {scripturePane}
          </Row>
        </Card>
        <AddPaneModal
          show={this.props.modalVisibility}
          onHide={this.props.hideModal}
          staticPaneSettings={this.props.staticPaneSettings}
          selectSourceLanguage={this.props.selectSourceLanguage}
          addPane={this.props.addPane}
        />
        <ExpandedPanesModal
          show={this.props.expandedPaneVisibility}
          onHide={this.props.hideExpandModal}
          currentPaneSettings={currentPaneSettings}
          currentCheck={currentCheck}
          showModal={showModal}
        />
        </div>
      );
    }
  }

module.exports = View;
