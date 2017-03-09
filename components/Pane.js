
const api = window.ModuleApi;
const React = api.React;
const RB = api.ReactBootstrap;
const {Col, Well, Glyphicon} = RB;
const style = require('../css/Style');
const VerseDisplay = require('./VerseDisplay');
const CloseButton = require('./CloseButton');

class Pane extends React.Component {
    render() {
      let {
        content,
        greek,
        removePane,
        heading,
        dir,
        currentCheck,
        id,
        isGatewayLanguage,
        arrayLength,
        showPopover } = this.props;
      let { chapter, verse } = currentCheck;
      let contentStyle;
      if(dir == 'ltr'){
        contentStyle = style.pane.contentLTR;
      }else{
        contentStyle = style.pane.contentRTL;
      }
      return (
          <Col md={4} sm={4} xs={4} lg={4} style={id < 2 ? {borderRight: '1px solid #95989A'} : {} }>
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
                  <VerseDisplay
                    chapter={chapter}
                    verse={verse}
                    input={content}
                    greek={greek}
                    isGatewayLanguage = {isGatewayLanguage}
                    currentCheck={this.props.currentCheck}
                    showPopover={showPopover}
                  />
              </div>
          </Col>
      );
    }
}

module.exports = Pane;
