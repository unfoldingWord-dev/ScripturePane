/**
 * @description: This Component generates the current verse to be displayed
 * and updates on to 'goToVerse' event
 */
import React from 'react'
import XRegExp from 'xregexp'

class VerseDisplay extends React.Component {
  /**
   * @description - This handles the verse that will be display in the pane in
   * the greek language. it generates Popover with Lexicon info about eahc word.
   * @param {Object} text - The current verse.
   * @return {String} - The current verse.
   */
  displayGreek(text = []) {
    let i = 0;
    let {
      actions
    } = this.props;
    let {
      showPopover
    } = actions;
    return text.map(word => {
      const PopoverTitle = (
        <span>
          {word.word}
        </span>
      );
      return (
        <span
          key={i++}
          style={{cursor: 'pointer'}}
          onClick={
            (e) => {
              let positionCoord = e.target;
              showPopover(PopoverTitle, word.brief, positionCoord);
            }
          }>
            {word.word + " "}
          </span>
      );
    });
  }

  render() {
    let content = "";
    let {chapter, verse} = this.props;
    let quote = this.props.contextIdReducer.contextId.quote;
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
        let regex = XRegExp('(?:^|\\PL)' + quote + '(?:$|\\PL)', 'g') // use a regexp to capture the surrounding characters to use in rebuilding the verse
        let contentArray = XRegExp.split(content, regex) // split the verse into all of the pieces
        let {occurrence} = this.props.contextIdReducer.contextId
        let aroundQuote = [] // store all of the characters surrounding the quote here
        XRegExp.forEach(content, regex, function (match, i) {
          aroundQuote[i] = match[0].split(quote) // store all of the characters surrounding the matches
        })
        let aroundQuoteIndex = occurrence - 1 // this ensures we can find the characters around the highlighted quote
        // for all of the content before the current quote
        // append the split quotes with their associated characters
        let beforeTextArray = contentArray.slice(0,occurrence).map( (text, i) => {
          if (i < occurrence-1) {   // if not the last one
            text = text + aroundQuote[i][0] + quote + aroundQuote[i][1] // append the quote with the surrounding character
          }
          return text
        })
        let beforeText = beforeTextArray.join('') // join the pieces
        beforeText = beforeText + aroundQuote[aroundQuoteIndex][0] // append the current quote's preceding char
        // for all of the content after the current quote
        // append the split quotes with their associated characters
        let afterTextArray = contentArray.slice(occurrence).map( (text, i) => {
          if (i < contentArray.length - occurrence - 1) { // if not the last one
            text = text + aroundQuote[i + occurrence][0] + quote + aroundQuote[i + occurrence][1] // append the quote with the surrounding character
          }
          return text
        })
        let afterText = afterTextArray.join('')  // join the pieces
        afterText = aroundQuote[aroundQuoteIndex][1] + afterText  // prepend the current quote's preceding char
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
        <div style={{direction: this.props.dir}}>
          <b>{chapter + ":" + verse + " "}</b>
          {newContent}
        </div>
      )
    }
    return (
      <div style={{direction: this.props.dir}}>
        <b>{chapter + ":" + verse + " "}</b>
        {content}
      </div>
    );
  }
}

 module.exports = VerseDisplay;
