import React from 'react';
import isEqual from 'lodash/isEqual';
import { isWord } from './stringHelpers';

export function getWordHighlightedDetails(isHighlightedWord, wordContents, quote, isBetweenHighlightedWord, previousWord, word) {
  isHighlightedWord = wordContents.some(wordContent => quote.split(' ').includes(wordContent));
  isBetweenHighlightedWord = previousWord && !isEqual(previousWord, word) && previousWord.content ?
    previousWord.content.some(wordContent => quote.split(' ').includes(wordContent)) && isHighlightedWord : false;
  return {
    isHighlightedWord,
    isBetweenHighlightedWord
  };
}

export function getWordsFromNestedMilestone(nestedWords, quote, index, isGrayVerseRow) {
  // if its an array of an array (nested nested milestone)
  if (Array.isArray(nestedWords[0])) nestedWords = nestedWords[0];
  let isHighlightedWord = false;
  let isBetweenHighlightedWord = false;
  let nestedPreviousWord = null;
  let wordSpacing = ' ';

  const wordSpans = nestedWords.map((nestedWord, nestedWordIndex) => {
    const nestedWordSpanIndex = `${index.toString()}_${nestedWordIndex.toString()}_${nestedWord.text}`;
    if (isWord(nestedWord)) {
      let padding = wordSpacing;
      if (nestedPreviousWord && isPuntuationAndNeedsNoSpace(nestedPreviousWord)) padding = '';
      const highlightedDetails = getWordHighlightedDetails(
        isHighlightedWord,
        nestedWord.content,
        quote,
        isBetweenHighlightedWord,
        nestedPreviousWord,
        nestedWord
      );
      isHighlightedWord = highlightedDetails.isHighlightedWord;
      isBetweenHighlightedWord = highlightedDetails.isBetweenHighlightedWord;
      nestedPreviousWord = nestedWord;
      const paddingSpanStyle = {
        backgroundColor: isBetweenHighlightedWord ? "var(--highlight-color)" :
          isGrayVerseRow ? 'var(--background-color-light)' : '#FFFFFF'
      };
      return (
        <span key={nestedWordSpanIndex.toString()}>
          <span style={paddingSpanStyle}>
            {padding}
          </span>
          <span style={{ backgroundColor: isHighlightedWord ? "var(--highlight-color)" : "" }}>
            {nestedWord.text}
          </span>
        </span>
      );
    } else if (nestedWord.text) {
      const lastChar = nestedWord.text.substr(nestedWord.text.length - 1);
      wordSpacing = ((lastChar === '"') || (lastChar === "'")) ? '' : ' '; // spacing before words
      return (
        <span key={nestedWordSpanIndex}>
          {nestedWord.text}
        </span>
      );
    }
  });
  return wordSpans;
}

/**
 * Determines if the revious word is a punctuation that
 * doesnt need spacing after it.
 * @param {Object} wordObject
 */
function isPuntuationAndNeedsNoSpace(wordObject) {
  return !isWord(wordObject) && (wordObject.text === '"') || (wordObject.text === "'");
}
