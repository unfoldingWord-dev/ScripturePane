/**
 * @author: Manny Colon
 * @description: This Component generates the current verse to be displayed
 *               and updates on to 'goToVerse' event
 ******************************************************************************/

const api = window.ModuleApi;
const React = api.React;

class VerseDisplay extends React.Component {
  constructor() {
    super();
    this.state = {
      chapter: null,
      verse: null,
    }
    this.goToVerseListener = this.goToVerseListener.bind(this);
  }

  componentWillMount() {
    //set the state of chapte and verse from the props
    this.setState({
      chapter:this.props.chapter,
      verse: this.props.verse
    })
    //listen for 'goToVerse' event to update the current chapt and verse
    api.registerEventListener('goToVerse', this.goToVerseListener);
  }

  componentWillUnmount() {
    api.removeEventListener('goToVerse', this.goToVerseListener);
  }
  /**
   * @description - This updates the state of the current chapter and verse so
   * that the panes display the current verse based on an event.
   * @param {Object} params - The current chapter and verse.
   ******************************************************************************/
  goToVerseListener(params) {
    this.setState({
      chapter: params.chapterNumber,
      verse: params.verseNumber
    });
  }
  /**
   * @description - This handles the verse that will be display in the pane
   * that the panes display the current verse based on an event.
   * @return {String} content - The current verse.
   ******************************************************************************/
  displayVerse(){
    var content = "";
    if(this.props.input){
      if(this.props.greek){
        var greekVerse =  this.props.input[this.state.chapter][this.state.verse];
        content = this.displayGreek(greekVerse);
      }else{
        var list = this.props.input;
        content = list[this.state.chapter][this.state.verse];
      }
    }else {
      console.warn("The prop input is undefined");
    }
    return content;
  }
  /**
   * @description - This handles the verse that will be display in the pane in
   * the greek language. it generates Popover with Lexicon info about eahc word.
   * @param {Object} text - The current verse.
   * @return {String} - The current verse.
   ******************************************************************************/
  displayGreek(text = []) {
    let i = 0;
    return text.map((word) => {
      var PopoverTitle = <span>
                           {word.word + " | "}
                           <a href={'http://studybible.info/mac/' + word.speech} target="_blank">
                             <b>
                              {word.speech}
                             </b>
                           </a>
                         </span>
      return (<span
                key={i++}
                strong={word.strong}
                style={{cursor: 'pointer'}}
                speech={word.speech}
                onClick={function(e){
                  var x = e.target.getBoundingClientRect().left;
                  var y = e.target.getBoundingClientRect().bottom;
                  api.Popover(true, PopoverTitle, word.brief, x, y);
                }}>
                  {word.word + " "}
                </span>
              );
    });
  }

  render() {
    //this gets the book name which isnt being rendered currenlty
    //TODO: find out if we want to render the book name to the panes since it
    //wasnt requred based on the new mock ups.
    var title = "";
    if (this.props.input !== undefined) {
      if (this.props.input.hasOwnProperty('title')) {
        title = this.props.input.title;
      }
    }

    return (
      <div>
        <b>{this.state.verse + " "}</b>{this.displayVerse()}
      </div>
    );
  }
}

 module.exports = VerseDisplay;
