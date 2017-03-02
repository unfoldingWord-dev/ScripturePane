
const api = window.ModuleApi;
const React = api.React;
const RB = api.ReactBootstrap;
const {Row, Glyphicon, Col} = RB;
const Pane = require('./Pane');
const AddPaneModal = require('./AddPaneModal');
const style = require('../css/Style');

class View extends React.Component {
  render() {
    let pane = this.props.currentPaneSettings;
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
        if (scripturePane.length <= 4) {
          scripturePane.push(
            <Pane
              currentCheck={this.props.currentCheck}
              isGatewayLanguage={isGatewayLanguage}
              greek={greek}
              key={key}
              id={key}
              content={content}
              heading={heading}
              dir={dir}
              removePane={this.props.removePane}
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
      if (scripturePane.length <= 3) {
        scripturePane.push(
          <Col key={3} md={3} sm={3} xs={3} lg={3}
            style={{ width: "200px", height: "200px" }}>
            <div style={{ margin: "45px 60px 0px 60px", cursor: "pointer", width: "50px", height: "50px", border: "#0277BD dashed", padding: "12px" }}
              onClick={this.props.showModal}>
              <Glyphicon glyph={"plus"} style={{ color: "#0277BD", fontSize: "20px" }} />
            </div>
            <h6 style={{ textAlign: "center", color: "#0277BD" }}>Add Resources</h6>
            <AddPaneModal show={this.props.modalVisibility}
              onHide={this.props.hideModal}
              staticPaneSettings={this.props.staticPaneSettings}
              selectSourceLanguage={this.props.selectSourceLanguage}
              addPane={this.props.addPane}
            />
          </Col>
        );
      }
      return (
        <div style={{ marginTop: '0px' }}>
          <Row>
            {scripturePane}
          </Row>
        </div>
      );
    }
  }

module.exports = View;
