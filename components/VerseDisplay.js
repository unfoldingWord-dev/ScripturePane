/**
 * @author: Manny Colon
 * @description: This Component generates the current verse to be displayed
 *               and updates on to 'goToVerse' event
 ******************************************************************************/

const api = window.ModuleApi
import React from 'react'
import XRegExp from 'xregexp'

class VerseDisplay extends React.Component {
  /**
   * @description - This handles the verse that will be display in the pane in
   * the greek language. it generates Popover with Lexicon info about eahc word.
   * @param {Object} text - The current verse.
   * @return {String} - The current verse.
   ******************************************************************************/
  displayGreek(text = []) {
    let i = 0;
    let { showPopover } = this.props;
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
                style={{cursor: 'pointer'}}
                onClick={function(e){
                  var x = e.target.getBoundingClientRect().left;
                  var y = e.target.getBoundingClientRect().bottom;
                  var positionCoord = [x, y];
                  showPopover(PopoverTitle, word.brief, positionCoord);
                }}>
                  {word.word + " "}
                </span>
              );
    });
  }

  render() {
    let content = "";
    let {chapter, verse} = this.props.contextId.reference
    let quote = this.props.contextId.quote;
    if(this.props.input){
      if(this.props.greek){
        var greekVerse =  this.props.input[chapter][verse];
        content = this.displayGreek(greekVerse);
      }else{
        var list = this.props.input;
        try {
          content = list[chapter][verse];
        } catch (err) {
          // Happens when the file is not complete
        }
      }
    }else {
      console.warn("The prop input is undefined");
    }
    if(this.props.isGatewayLanguage && !quote.includes("...") && content.includes(quote)){
        let regex = XRegExp('\\PL' + quote + '\\PL', 'g')
        let contentArray = XRegExp.split(content, regex)
        let {occurrence} = this.props.contextIdReducer.contextId
        let aroundQuote = []
        XRegExp.forEach(content, regex, function (match, i) {
          if (i == occurrence-1) aroundQuote = match[0].split(quote)
        })
        let beforeText = contentArray.splice(0,occurrence).join(quote) + aroundQuote[0]
        let afterText = aroundQuote[1] + contentArray.splice(occurrence-1).join(quote)
        let newContent = [];
        newContent.push(
          <span key={1}>
            <span>
              {beforeText}
            </span>
            <span style={{backgroundColor: "#FDD910"}}>
              {quote}
            </span>
            <span>
              {afterText}
            </span>
          </span>
        );
      return (
        <div>
          <b>{chapter + ":" + verse + " "}</b>
          {newContent}
        </div>
      )
    }
    return (
      <div>
        <b>{chapter + ":" + verse + " "}</b>
        {content}
      </div>
    );
  }
}

 module.exports = VerseDisplay;
