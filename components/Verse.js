import React from 'react';
import XRegExp from 'xregexp'

class Verse extends React.Component {

  verseArray(verseText = []) {
    let { showPopover } = this.props.actions;
    let verseSpan = verseText.map( (word, index) => {
      const PopoverTitle = <span>{word.word}</span>;
      let click = (e) => {
        let positionCoord = e.target;
        showPopover(PopoverTitle, word.brief, positionCoord);
      }

      return (
        <span style={{cursor: 'pointer'}} onClick={click} key={index}>
          {word.word + " "}
        </span>
      );
    });

    return verseSpan;
  }

  highlightQuoteInVerse(content, quote, occurrence) {
    let verseSpan = [];
    let regex = XRegExp('(?:^|\\PL)' + quote + '(?:$|\\PL)', 'g') // use a regexp to capture the surrounding characters to use in rebuilding the verse
    let contentArray = XRegExp.split(content, regex) // split the verse into all of the pieces
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
    verseSpan.push(
      <span key={1}>
        <span>{beforeText}</span>
        <span style={{backgroundColor: "var(--highlight-color)"}}>
          {quote}
        </span>
        <span>{afterText}</span>
      </span>
    );

    return verseSpan
  }

  render() {
    let verseSpan = <span/>;
    let { verseText, chapter, verse, direction, bibleId, isCurrent} = this.props;
    if (typeof verseText === 'string') {
      let {quote, occurrence} = this.props.contextIdReducer.contextId;
      if ( isCurrent && bibleId === 'ulb-en' && !quote.includes("...") && verseText.includes(quote)) {
        verseSpan = this.highlightQuoteInVerse(verseText, quote, occurrence);
      } else {
        verseSpan = <span>{verseText}</span>;
      }
    } else {
      verseSpan = this.verseArray(verseText);
    }

    let chapterVerse = <strong>{chapter}:{verse} </strong>;
    if (direction === 'rtl') chapterVerse = <strong>{verse}:{chapter} </strong>;
    let divStyle = {direction: direction};

    return (
      <div style={divStyle}>
        {chapterVerse}
        {verseSpan}
      </div>
    );
  }
}

export default Verse;
