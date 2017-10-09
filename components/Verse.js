import React from 'react';
import XRegExp from 'xregexp';
import usfmjs from 'usfm-js';
// helpers
import * as highlightHelpers from '../helpers/highlightHelpers';
import * as lexiconHelpers from '../helpers/lexiconHelpers';
// components
import WordDetails from './WordDetails';

class Verse extends React.Component {

  componentWillMount() {
    const {verseText} = this.props;
    if (verseText.constructor == Array) {
      this.props.verseText.forEach((word) => {
        const {strongs} = word
        const entryId = lexiconHelpers.lexiconEntryIdFromStrongs(strongs);
        const lexiconId = lexiconHelpers.lexiconIdFromStrongs(strongs);
        this.props.actions.loadLexiconEntry(lexiconId, entryId);
      });
    }
  }

  onClick(e, word) {
    let positionCoord = e.target;
    const PopoverTitle = <strong style={{fontSize: '1.2em'}}>{word.word}</strong>;
    let { showPopover } = this.props.actions;
    const wordDetails = <WordDetails {...this.props} word={word} />;
    showPopover(PopoverTitle, wordDetails, positionCoord);
  }

  verseArray(verseText = []) {
    let verseSpan = verseText.map( (word, index) => {
      return (
        <span style={{cursor: 'pointer'}} onClick={(e)=>this.onClick(e, word)} key={index}>
          {word.word + " "}
        </span>
      );
    });

    return verseSpan;
  }

  highlightQuoteInVerse(content, quote, occurrence) {
    let verseSpan = [];
    let regex = XRegExp('(?:^|\\PL)' + quote + '(?:$|\\PL)', 'g'); // use a regexp to capture the surrounding characters to use in rebuilding the verse
    let contentArray = XRegExp.split(content, regex); // split the verse into all of the pieces
    let aroundQuote = []; // store all of the characters surrounding the quote here
    XRegExp.forEach(content, regex, function (match, i) {
      aroundQuote[i] = match[0].split(quote); // store all of the characters surrounding the matches
    })
    let aroundQuoteIndex = occurrence - 1; // this ensures we can find the characters around the highlighted quote
    // for all of the content before the current quote
    // append the split quotes with their associated characters
    let beforeTextArray = contentArray.slice(0,occurrence).map( (text, i) => {
      if (i < occurrence-1) {   // if not the last one
        text = text + aroundQuote[i][0] + quote + aroundQuote[i][1]; // append the quote with the surrounding character
      }
      return text;
    })
    let beforeText = beforeTextArray.join(''); // join the pieces
    beforeText = beforeText + aroundQuote[aroundQuoteIndex][0]; // append the current quote's preceding char
    // for all of the content after the current quote
    // append the split quotes with their associated characters
    let afterTextArray = contentArray.slice(occurrence).map( (text, i) => {
      if (i < contentArray.length - occurrence - 1) { // if not the last one
        text = text + aroundQuote[i + occurrence][0] + quote + aroundQuote[i + occurrence][1]; // append the quote with the surrounding character
      }
      return text;
    })
    let afterText = afterTextArray.join('');  // join the pieces
    afterText = aroundQuote[aroundQuoteIndex][1] + afterText;  // prepend the current quote's preceding char
    verseSpan.push(
      <span key={1}>
        <span>{usfmjs.removeMarker(beforeText)}</span>
        <span style={{backgroundColor: "var(--highlight-color)"}}>
          {quote}
        </span>
        <span>{usfmjs.removeMarker(afterText)}</span>
      </span>
    );
    return verseSpan;
  }

  render() {
    let verseSpan = <span/>;
    let { verseText, chapter, verse, direction, bibleId, isCurrent} = this.props;
    if (typeof verseText === 'string') {
      let {quote, occurrence} = this.props.contextIdReducer.contextId;
      const isQuoteInVerse = highlightHelpers.isQuoteInVerse(verseText, quote);
      if (quote && verseText && isCurrent && bibleId === 'ulb' && !quote.includes("...") && isQuoteInVerse) {
        verseSpan = this.highlightQuoteInVerse(verseText, quote, occurrence);
      } else {
        verseSpan = <span>{usfmjs.removeMarker(verseText)}</span>;
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
