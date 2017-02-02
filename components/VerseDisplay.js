/**
 * @author: Manny Colon
 * @description: This Component generates the current verse to be displayed
 *               and updates on to 'goToVerse' event
 ******************************************************************************/

const api = window.ModuleApi;
const React = api.React;

class VerseDisplay extends React.Component {
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
                           <a href={'http://studybible.info/mac/' + word.speech}
                              target="_blank">
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
    let content = "";
    if(this.props.input){
      if(this.props.greek){
        var greekVerse =  this.props.input[this.props.chapter][this.props.verse];
        content = this.displayGreek(greekVerse);
      }else{
        var list = this.props.input;
        content = list[this.props.chapter][this.props.verse];
      }
    }else {
      console.warn("The prop input is undefined");
    }
    console.log(this.props);
    if(!this.props.greek){
      let contentArray = content.split(this.props.phrase);
      return (
        <div>
        <b>{this.props.verse + " "}</b>
        {contentArray[0]}
        <span style={{backgroundColor: "#FDD910"}}>
        {this.props.phrase}
        </span>
        {contentArray[1]}
        </div>
      )
    }
    return (
      <div>
        <b>{this.props.verse + " "}</b>
        {content}
      </div>
    );
  }
}

 module.exports = VerseDisplay;
