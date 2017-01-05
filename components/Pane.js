
const api = window.ModuleApi;
const React = api.React;
const RB = api.ReactBootstrap;
const {Col, Well, Glyphicon} = RB;
const style = require('../css/Style');
const VerseDisplay = require('./VerseDisplay');

class Pane extends React.Component {
    render() {
      let { content, greek, removePane, heading, dir, currentCheck, id } = this.props;
      let { chapter, verse } = currentCheck;
      let headerStyle = style.pane.title;
      let contentStyle;
      if(dir == 'ltr'){
        contentStyle = style.pane.contentLTR;
      }else{
        contentStyle = style.pane.contentRTL;
      }
      return (
          <Col md={3} sm={3} xs={3} lg={3}>
              <div style={{float: "right", cursor: "pointer"}} onClick={() => removePane(id)}>
                <Glyphicon glyph={"remove"} style={{color: "grey"}}/>
              </div>
              <span style={headerStyle}>{heading || ''}</span>
              <div style={contentStyle}>
                  <VerseDisplay chapter={chapter} verse={verse}
                                input={content} greek={greek}
                  />
              </div>
          </Col>
      );
    }
}

module.exports = Pane;
