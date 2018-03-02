import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import stringTokenizer from 'string-punctuation-tokenizer';
// helpers
import * as lexiconHelpers from '../helpers/lexiconHelpers';
import {removeMarker} from '../helpers/UsfmHelpers';
import {isWord} from '../helpers/stringHelpers';
// components
import WordDetails from './WordDetails';
// constants
const PLACE_HOLDER_TEXT = '[WARNING: This Bible version does not include text for this reference.]';

class Verse extends React.Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.verseText && this.props.verseText !== nextProps.verseText) {
      if ((nextProps.verseText.constructor === Array) || (nextProps.verseText.verseObjects)) {
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

  onWordClick(e, word) {
    if (word && word.strong) {
      let positionCoord = e.target;
      const PopoverTitle = <strong style={{fontSize: '1.2em'}}>{word.word}</strong>;
      let {showPopover} = this.props.actions;
      const wordDetails = <WordDetails {...this.props} word={word}/>;
      showPopover(PopoverTitle, wordDetails, positionCoord);
    }
  }

  verseString(verseText) {
    verseText = removeMarker(verseText);
    verseText = verseText.replace(/\s+/g, ' ');
    const selections= this.props.selectionsReducer.selections;
    let verseTextSpans = <span>{verseText}</span>;

    if (selections && selections.length > 0) {
      let _selectionArray = stringTokenizer.selectionArray(verseText, selections);

      verseTextSpans = _selectionArray.map((selection, index) => {
        return (
          <span key={index} style={{ backgroundColor: selection.selected ? 'var(--highlight-color)' : '' }}>
            {selection.text}
          </span>
        );
      });
    }

    return verseTextSpans;
  }

  verseArray(verseText = []) {
    const { bibleId, contextIdReducer: { contextId }, isGrayVerseRow } = this.props;
    const words = this.props.actions.getWordListForVerse(verseText);
    let wordSpacing = '';
    let previousWord = null;
    const verseSpan = words.map((word, index) => {
      if (isWord(word)) {
        const padding = wordSpacing;
        wordSpacing = ' '; // spacing between words
        const text = (word.word || word.text);
        let isHighlightedWord = false;
        let isBetweenHighlightedWord = false;

        if (bibleId === 'ugnt' && contextId.quote) {
          isHighlightedWord = contextId.quote.split(' ').includes(word.text);
          isBetweenHighlightedWord = previousWord && !isEqual(previousWord, word) ?
            contextId.quote.split(' ').includes(previousWord.text) && isHighlightedWord : false;
        } else if (bibleId === 'ulb' && contextId.quote && word.content) {
          isHighlightedWord = word.content.some(wordContent => contextId.quote.split(' ').includes(wordContent));
          isBetweenHighlightedWord = previousWord && !isEqual(previousWord, word) && previousWord.content ?
            previousWord.content.some(wordContent => contextId.quote.split(' ').includes(wordContent)) && isHighlightedWord : false;
        }
        // Save word to be used as previousWord in next word.
        previousWord = word;
        // if isGrayVerseRow is true then background is gray in the ChapterViewModal.
        const paddingSpanStyle = {
          backgroundColor: isBetweenHighlightedWord ? "var(--highlight-color)" :
            isGrayVerseRow ? 'var(--background-color-light)' : '#FFFFFF'
        };

        if (word.strong) { // if clickable
          return (
            <span
              key={index}
              onClick={(e) => this.onWordClick(e, word)}
              style={{ cursor: 'pointer' }}
            >
              <span style={paddingSpanStyle}>
                {padding}
              </span>
              <span style={{ backgroundColor: isHighlightedWord ? "var(--highlight-color)" : "" }}>
                {text}
              </span>
            </span>
          );
        } else {
          return (
            <span key={index}>
              <span style={paddingSpanStyle}>
                {padding}
              </span>
              <span style={{ backgroundColor: isHighlightedWord ? "var(--highlight-color)" : "" }}>
                {text}
              </span>
            </span>
          );
        }
      } else if (word.text) { // if not word, show punctuation, etc. but not clickable
        const lastChar = word.text.substr(word.text.length - 1);
        wordSpacing = ((lastChar === '"') || (lastChar === "'")) ? '' : ' '; // spacing before words
        return this.createTextSpan(index, word.text);
      }
    });

    return verseSpan;
  }

  createTextSpan(index, text) {
    return (
      <span key={index}>
        {text}
      </span>
    );
  }

  render() {
    let verseSpan = <span/>;
    let { verseText, chapter, verse, direction } = this.props;
    let verseIsPlaceHolder = false;

    if (!verseText) {
      verseText = PLACE_HOLDER_TEXT;
      verseIsPlaceHolder = true;
    }

    if (verseText && typeof verseText === 'string') { // if the verse content is string / text.
      verseSpan = this.verseString(verseText);
    } else { // then the verse content is an array / verse objects.
      verseSpan = this.verseArray(verseText);
    }

    const chapterVerseContent = direction === 'rtl' ? `${verse}:${chapter} ` : `${chapter}:${verse} `;
    const chapterVerse = <strong>{chapterVerseContent}</strong>;
    let divStyle = { direction: direction };
    if (verseIsPlaceHolder) divStyle['fontStyle'] = 'italic';

    return (
      <div style={divStyle}>
        {chapterVerse}
        {verseSpan}
      </div>
    );
  }
}

Verse.propTypes = {
  actions: PropTypes.shape({
    setToolSettings: PropTypes.func.isRequired,
    getWordListForVerse: PropTypes.func.isRequired,
    loadLexiconEntry: PropTypes.func.isRequired,
    showPopover: PropTypes.func.isRequired
  }),
  verseText: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.array.isRequired,
    PropTypes.object.isRequired
  ]),
  chapter: PropTypes.number.isRequired,
  verse: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired
  ]),
  direction: PropTypes.string.isRequired,
  bibleId: PropTypes.string,
  isCurrent: PropTypes.bool.isRequired,
  contextIdReducer: PropTypes.object.isRequired,
  selectionsReducer: PropTypes.object.isRequired,
  isGrayVerseRow: PropTypes.bool
};

export default Verse;
export {PLACE_HOLDER_TEXT};
