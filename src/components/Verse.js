import React from 'react';
import PropTypes from 'prop-types';
import XRegExp from 'xregexp';
import {removeMarker} from '../helpers/UsfmHelpers';

// helpers
import * as highlightHelpers from '../helpers/highlightHelpers';
import * as lexiconHelpers from '../helpers/lexiconHelpers';
// components
import WordDetails from './WordDetails';
const PLACE_HOLDER_TEXT = '[WARNING: This Bible version does not include text for this reference.]';

class Verse extends React.Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.verseText && this.props.verseText !== nextProps.verseText) {
      if (nextProps.verseText.constructor === Array) {
        const words = nextProps.actions.getWordListForVerse(nextProps.verseText);
        words.forEach((word) => {
          if (isWord(word)) {
            const {strong} = word;
            if (strong) {
              const entryId = lexiconHelpers.lexiconEntryIdFromStrongs(strong);
              const lexiconId = lexiconHelpers.lexiconIdFromStrongs(strong);
              nextProps.actions.loadLexiconEntry(lexiconId, entryId);
            }
          }
        });
      }
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
    const words = this.props.actions.getWordListForVerse(verseText);
    const verseSpan = words.map( (word, index) => {
      if (isWord(word)) {
        const isNextAword = (index < words.length - 1) && (isWord(words[index+1]));
        const padding = isNextAword ? ' ' : '';
        return (
          <span style={{cursor: 'pointer'}} onClick={(e)=>this.onClick(e, word)} key={index}>
            {(word.word || word.text) + padding}
          </span>
        );
      } else if (word.text) { // if not word, show punctuation, etc. but not clickable
        return (
          <span key={index}>
            {word.text}
          </span>
        );
      }
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
    });
    let aroundQuoteIndex = occurrence - 1; // this ensures we can find the characters around the highlighted quote
    // for all of the content before the current quote
    // append the split quotes with their associated characters
    let beforeTextArray = contentArray.slice(0,occurrence).map( (text, i) => {
      if (i < occurrence-1) {   // if not the last one
        text = text + aroundQuote[i][0] + quote + aroundQuote[i][1]; // append the quote with the surrounding character
      }
      return text;
    });
    let beforeText = beforeTextArray.join(''); // join the pieces
    beforeText = beforeText + aroundQuote[aroundQuoteIndex][0]; // append the current quote's preceding char
    // for all of the content after the current quote
    // append the split quotes with their associated characters
    let afterTextArray = contentArray.slice(occurrence).map( (text, i) => {
      if (i < contentArray.length - occurrence - 1) { // if not the last one
        text = text + aroundQuote[i + occurrence][0] + quote + aroundQuote[i + occurrence][1]; // append the quote with the surrounding character
      }
      return text;
    });
    let afterText = afterTextArray.join('');  // join the pieces
    afterText = aroundQuote[aroundQuoteIndex][1] + afterText;  // prepend the current quote's preceding char
    verseSpan.push(
      <span key={1}>
        <span>{removeMarker(beforeText)}</span>
        <span style={{backgroundColor: "var(--highlight-color)"}}>
          {quote}
        </span>
        <span>{removeMarker(afterText)}</span>
      </span>
    );
    return verseSpan;
  }

  render() {
    let verseSpan = <span/>;
    let {verseText, chapter, verse, direction, bibleId, isCurrent} = this.props;
    let verseIsPlaceHolder = false;
    if(!verseText) {
      verseText = PLACE_HOLDER_TEXT;
      verseIsPlaceHolder = true;
    }
    if (verseText && typeof verseText === 'string') {
      let {quote, occurrence} = this.props.contextIdReducer.contextId;
      const isQuoteInVerse = highlightHelpers.isQuoteInVerse(verseText, quote);
      if (quote && verseText && isCurrent && bibleId === 'ulb' && !quote.includes("...") && isQuoteInVerse) {
        verseSpan = this.highlightQuoteInVerse(verseText, quote, occurrence);
      } else {
        verseSpan = <span>{removeMarker(verseText)}</span>;
      }
    } else {
      verseSpan = this.verseArray(verseText);
    }

    let chapterVerse = <strong>{chapter}:{verse} </strong>;
    if (direction === 'rtl') chapterVerse = <strong>{verse}:{chapter} </strong>;
    let divStyle = {direction: direction};
    if (verseIsPlaceHolder) divStyle['fontStyle'] = 'italic';

    return (
      <div style={divStyle}>
        {chapterVerse}
        {verseSpan}
      </div>
    );
  }
}

const isWord = (word => {
  return (typeof word !== 'string') && (word.word || (word.type === 'word'));
});

Verse.propTypes = {
  actions: PropTypes.shape({
    setToolSettings: PropTypes.func.isRequired,
    getWordListForVerse: PropTypes.func.isRequired,
    loadLexiconEntry: PropTypes.func.isRequired,
    showPopover: PropTypes.func.isRequired,
  }),
  verseText: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.array.isRequired,
    PropTypes.object.isRequired
  ]),
  chapter: PropTypes.number.isRequired,
  verse: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
  direction: PropTypes.string.isRequired,
  bibleId: PropTypes.string,
  isCurrent: PropTypes.bool.isRequired,
  contextIdReducer: PropTypes.object.isRequired
};

export default Verse;
export {PLACE_HOLDER_TEXT};
