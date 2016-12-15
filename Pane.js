
const api = window.ModuleApi;
const React = api.React;
const RB = api.ReactBootstrap;
const {Col, Well, Glyphicon} = RB;
const style = require('./Style');
const VerseDisplay = require('./VerseDisplay');

class Pane extends React.Component {
    constructor() {
        super();
        this.state = {
          chapter: null,
          verse: null
        }
        this.contentStyle = style.pane.content;
        this.headerStyle = style.pane.title;
    }

    componentWillMount(){
      this.getCurrentCheck();
    }
    /**
     * @description This gets the current checks chapter number and verse Number
     * @return {state} chapter # and verse # is saved in the state of the Component
    *******************************************************************************/
    getCurrentCheck() {
      var currentNamespace = api.getCurrentCheckNamespace();
      //TODO: dont forget to remove the temporary dynamic namespaces below
      var currentGroupIndex = api.getDataFromCheckStore('TranslationWordsChecker', 'currentGroupIndex');
      var currentCheckIndex = api.getDataFromCheckStore('TranslationWordsChecker', 'currentCheckIndex');
      var currentCheck = api.getDataFromCheckStore('TranslationWordsChecker', 'groups')[currentGroupIndex]['checks'][currentCheckIndex];
      this.setState({
        chapter: currentCheck.chapter,
        verse: currentCheck.verse
      });
    }

    render() {
      if(this.props.dir == 'ltr'){
        this.contentStyle.direction = 'ltr';
      }else{
        this.contentStyle.direction = 'rtl';
      }
      return (
          <Col md={3} sm={3} xs={3} lg={3}>
              <div style={{float: "right", cursor: "pointer"}} onClick={this.props.remove}>
                <Glyphicon glyph={"remove"} style={{color: "grey"}}/>
              </div>
              <span style={this.headerStyle}>{this.props.heading || ''}</span>
              <div style={this.contentStyle}>
                  <VerseDisplay chapter={this.state.chapter} verse={this.state.verse}
                                input={this.props.content} greek={this.props.greek} />
              </div>
          </Col>
      );
    }
}

module.exports = Pane;
