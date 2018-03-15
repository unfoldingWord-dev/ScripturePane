import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'deep-equal';
import stringTokenizer from 'string-punctuation-tokenizer';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import IconButton from 'material-ui/IconButton';
// helpers
import * as lexiconHelpers from '../helpers/lexiconHelpers';
import * as highlightHelpers from '../helpers/highlightHelpers';
import {removeMarker} from '../helpers/UsfmHelpers';
import {isWord, isNestedMilestone} from '../helpers/stringHelpers';
// components
import WordDetails from './WordDetails';
// constants
const PLACE_HOLDER_TEXT = '[WARNING: This Bible version does not include text for this reference.]';

const makeStyles = (props) => {
  const { verseText, direction } = props;
  const verseIsPlaceHolder = !!verseText;

  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    },
    verse: {
      direction: direction,
      flex: 1,
      fontStyle: verseIsPlaceHolder ? 'italic' : 'normal'
    },
    edit: {
      textAlign: 'right'
    }
  };
};

class Verse extends React.Component {

  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
  }

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
    const {resourcesReducer} = this.props;
    if (word && word.strong) {
      let positionCoord = e.target;
      const PopoverTitle = <strong style={{fontSize: '1.2em'}}>{word.word}</strong>;
      let {showPopover} = this.props.actions;
      const wordDetails = <WordDetails resourcesReducer={resourcesReducer} word={word}/>;
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
    const verseSpan = [];

    words.forEach((word, index) => {
      if (isWord(word)) {
        const padding = wordSpacing;
        wordSpacing = ' '; // spacing between words
        const text = (word.word || word.text);
        let isHighlightedWord = false;
        let isBetweenHighlightedWord = false;

        if (bibleId === 'ugnt' && contextId.quote && word.text) {
          isHighlightedWord = highlightHelpers.isWordMatch(word, contextId, words, index);
          isBetweenHighlightedWord = previousWord && !isEqual(previousWord, word) &&
            highlightHelpers.isWordMatch(previousWord, contextId, words, index - 1) && isHighlightedWord;
        } else if (bibleId === 'ulb' && contextId.quote && word.content) {
          const highlightedDetails = highlightHelpers.getWordHighlightedDetails(contextId, previousWord, word);
          isHighlightedWord = highlightedDetails.isHighlightedWord;
          isBetweenHighlightedWord = highlightedDetails.isBetweenHighlightedWord;
        }
        // Save word to be used as previousWord in next word.
        previousWord = word;
        // if isGrayVerseRow is true then background is gray in the ChapterViewModal.
        const paddingSpanStyle = {
          backgroundColor: isBetweenHighlightedWord ? "var(--highlight-color)" :
            isGrayVerseRow ? 'var(--background-color-light)' : '#FFFFFF'
        };

        if (word.strong) { // if clickable
          verseSpan.push(
            <span
              key={index.toString()}
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
          verseSpan.push(this.createNonClickableSpan(index, paddingSpanStyle, padding, isHighlightedWord, text));
        }
      } else if (isNestedMilestone(word)) { // if nested milestone
        const nestedWordSpans = highlightHelpers.getWordsFromNestedMilestone(word, contextId, index, isGrayVerseRow);
        nestedWordSpans.forEach((nestedWordSpan) => verseSpan.push(nestedWordSpan));
        wordSpacing = ' ';
      } else if (word.text) { // if not word, show punctuation, etc. but not clickable
        const lastChar = word.text.substr(word.text.length - 1);
        wordSpacing = ((lastChar === '"') || (lastChar === "'")) ? '' : ' '; // spacing before words
        verseSpan.push(this.createTextSpan(index, word.text));
      }
    });

    return verseSpan;
  }

  createNonClickableSpan(index, paddingSpanStyle, padding, isHighlightedWord, text) {
    return (
      <span key={index.toString()}>
        <span style={paddingSpanStyle}>
          {padding}
        </span>
        <span style={{ backgroundColor: isHighlightedWord ? "var(--highlight-color)" : "" }}>
          {text}
        </span>
      </span>
    );
  }

  createTextSpan(index, text) {
    return (
      <span key={index}>
        {text}
      </span>
    );
  }

  handleEdit() {
    const {bibleId, chapter, verse, verseText, onEdit} = this.props;
    if(typeof onEdit === 'function') {
      onEdit(bibleId, chapter, verse, verseText);
    }
  }

  render() {
    let verseSpan = <span/>;
    const { bibleId, verseText, chapter, verse, direction } = this.props;

    let text = verseText;
    if (!verseText) {
      text = PLACE_HOLDER_TEXT;
    }

    if (text && typeof text === 'string') { // if the verse content is string / text.
      verseSpan = this.verseString(text);
    } else { // then the verse content is an array / verse objects.
      verseSpan = this.verseArray(text);
    }

    const isEditable = bibleId === 'targetBible' && !!verseText;
    const chapterVerseContent = direction === 'rtl' ? `${verse}:${chapter} ` : `${chapter}:${verse} `;
    const chapterVerse = <strong>{chapterVerseContent}</strong>;
    const styles = makeStyles(this.props);

    let edit = null;
    if(isEditable) {
      edit = (
        <div style={styles.edit}>
          <IconButton onClick={this.handleEdit}>
            <EditIcon/>
          </IconButton>
        </div>
      );
    }

    return (
      <div style={styles.root}>
        <div style={styles.verse}>
          {chapterVerse}
          {verseSpan}
        </div>
        {edit}
      </div>
    );
  }
}

Verse.propTypes = {
  resourcesReducer: PropTypes.object.isRequired,
  actions: PropTypes.shape({
    setToolSettings: PropTypes.func.isRequired,
    getWordListForVerse: PropTypes.func.isRequired,
    loadLexiconEntry: PropTypes.func.isRequired,
    showPopover: PropTypes.func.isRequired
  }).isRequired,
  verseText: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.array.isRequired,
    PropTypes.object.isRequired
  ]).isRequired,
  chapter: PropTypes.number.isRequired,
  verse: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired
  ]).isRequired,
  direction: PropTypes.string.isRequired,
  bibleId: PropTypes.string,
  onEdit: PropTypes.func,
  isCurrent: PropTypes.bool.isRequired,
  contextIdReducer: PropTypes.object.isRequired,
  selectionsReducer: PropTypes.object.isRequired,
  isGrayVerseRow: PropTypes.bool
};

export default Verse;
export {PLACE_HOLDER_TEXT};
