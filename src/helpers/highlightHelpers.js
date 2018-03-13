import React from 'react';
import isEqual from 'lodash/isEqual';
import { isWord } from './stringHelpers';

export function isWordArrayMatch(word, contextId) {
  let isMatch = false;
  if (word && word.content && contextId && contextId.quote) {
    isMatch = word.content.some(wordItem => {
      let foundMatch = false;
      if (contextId.quote.split(' ').includes(wordItem.content)) {
        foundMatch = (contextId.occurrence === wordItem.occurrence);
      }
      return foundMatch;
    });
  }
  return isMatch;
}

export function isWordMatch(word, contextId, words, index) {
  let isMatch = false;
  if (word && word.text && contextId && contextId.quote) {
    if (contextId.quote.split(' ').includes(word.text)) {
      // get occurrence of word
      let occurrence = 0;
      for (let i = 0; i <= index; i++) {
        const wordItem = words[i];
        if (wordItem.text === word.text) {
          occurrence++;
        }
      }
      isMatch = (occurrence === contextId.occurrence);
    }
  }
  return isMatch;
}

export function getWordHighlightedDetails( contextId, previousWord, word) {
  const isHighlightedWord = isWordArrayMatch(word, contextId);
  const isBetweenHighlightedWord = isHighlightedWord && previousWord && !isEqual(previousWord, word) 
      && isWordArrayMatch(previousWord, contextId);
  return {
    isHighlightedWord,
    isBetweenHighlightedWord
  };
}

export function getWordsFromNestedMilestone(nestedWords, contextId, index, isGrayVerseRow) {
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
        contextId,
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
