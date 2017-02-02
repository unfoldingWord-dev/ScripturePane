
const api = window.ModuleApi;
const React = api.React;
const RB = api.ReactBootstrap;
const {Col, Well, Glyphicon} = RB;
const style = require('../css/Style');
const VerseDisplay = require('./VerseDisplay');
const CloseButton = require('./CloseButton');

class Pane extends React.Component {
    render() {
      let { content, greek, removePane, heading, dir, currentCheck, id, isGatewayLanguage } = this.props;
      let { chapter, verse } = currentCheck;
      let contentStyle;
      if(dir == 'ltr'){
        contentStyle = style.pane.contentLTR;
      }else{
        contentStyle = style.pane.contentRTL;
      }
      return (
          <Col md={3} sm={3} xs={3} lg={3}>
          <div style={style.removePane}
               onClick={() => removePane(id)}>
            <CloseButton />
          </div>
              <span style={style.pane.title}>
                {heading.heading || ''}
              </span>
              <span style={style.headingDescription}>
                {heading.headingDescription || ''}
              </span>

              <div style={contentStyle}>
                  <VerseDisplay chapter={chapter} verse={verse}
                                input={content} greek={greek}
                                isGatewayLanguage = {isGatewayLanguage}
                                phrase={this.props.currentCheck.phrase}
                  />
              </div>
          </Col>
      );
    }
}

module.exports = Pane;
