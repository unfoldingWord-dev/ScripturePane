/* eslint-env jest */

import React from 'react';
import Verse, {PLACE_HOLDER_TEXT} from '../src/components/Verse';
import {mount} from 'enzyme';
import PropTypes from 'prop-types';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

// Tests for Verse React Component
describe('Test Verse component',()=>{
  test('Test when verse is null that the WARNING placeholder is displayed', () => {
    const props = {
      verseText: null,
      chapter: '1',
      verse: '1',
      contextIdReducer: {
        contextId: {}
      }
    };
    const expectedText = '1:1 '+PLACE_HOLDER_TEXT;
    const enzymeWrapper = mount(<Verse {...props} />);
    validateVerse(enzymeWrapper, expectedText);
  });

  test('Test when verse is empty string that the WARNING placeholder is displayed', () => {
    const props = {
      verseText: '',
      chapter: '1',
      verse: '1',
      contextIdReducer: {
        contextId: {}
      }
    };
    const expectedText = '1:1 '+PLACE_HOLDER_TEXT;
    const enzymeWrapper = mount(<Verse {...props} />);
    validateVerse(enzymeWrapper, expectedText);
  });

  test('Test when verse is not null that the verse is displayed', () => {
    const props = {
      verseText: 'Jesus wept',
      chapter: '11',
      verse: '35',
      contextIdReducer: {
        contextId: {}
      }
    };
    const expectedText = '11:35 Jesus wept';
    const enzymeWrapper = mount(<Verse {...props} />);
    validateVerse(enzymeWrapper, expectedText);
  });

  test('Test when verse is verseObject that the verse is displayed', () => {
    const props = {
      verseText: [
        {
          type: 'text',
          text: 'Jesus wept.'
        }
      ],
      chapter: '11',
      verse: '35',
      contextIdReducer: {
        contextId: {}
      },
      actions: {
        'getWordListForVerse': getWordListForVerse
      }
    };
    const expectedText = '11:35 Jesus wept.';
    const enzymeWrapper = mount(<Verse {...props} />);
    validateVerse(enzymeWrapper, expectedText);
  });
});

function validateVerse(enzymeWrapper, expectedText) {
  const verseDiv = enzymeWrapper.find('div');
  expect(verseDiv.length).toEqual(1);
  expect(verseDiv.text()).toEqual(expectedText);
}

describe('Test Verse.componentWillReceiveProps', ()=>{
  test('Test with two populated verses', () => {
    const props = {
      verseText: [{strong: "G38700"}],
      chapter: '1',
      verse: '1',
      contextIdReducer: {
        contextId: {}
      },
      actions: {
        'loadLexiconEntry': jest.fn(),
        'getWordListForVerse': getWordListForVerse
      }
    };
    const props2 = {
      verseText: [{strong: "G25320"}],
      chapter: '1',
      verse: '2',
      contextIdReducer: {
        contextId: {}
      },
      actions: {
        'loadLexiconEntry': jest.fn(),
        'getWordListForVerse': getWordListForVerse
      }
    };

    const wrapper = mount(
      <Verse {...props} />,
      {
        context: {
          muiTheme: getMuiTheme()
        },
        childContextTypes: {
          muiTheme: PropTypes.object.isRequired
        }
      }
    );
    expect(wrapper.find(Verse).props().verse).toEqual(props.verse);
    wrapper.setProps(props2);
    expect(wrapper.find(Verse).props().verse).toEqual(props2.verse);  
  });
});

//
// helpers
//

/**
 * @description returns a flat array of words (currently needed for UGNT since words may be nested in milestones)
 * @param {Object|Array} verse - verse data that may need to be flattened.
 * @return {array} wordlist - flat array of VerseObjects
 */
export const getWordListForVerse = (verse) => {
  let words = [];
  if (verse.verseObjects) {
    flattenVerseObjects(verse.verseObjects, words);
  } else { // already a flat word list
    words = verse;
  }
  return words;
};

/**
 * @description flatten verse objects from nested format to flat array
 * @param {array} verse - source array of nested verseObjects
 * @param {array} words - output array that will be filled with flattened verseObjects
 */
const flattenVerseObjects = (verse, words) => {
  for (let object of verse) {
    if (object) {
      if (object.type === 'word') {
        object.strong = object.strong || object.strongs;
        words.push(object);
      } else if (object.type === 'milestone') { // get children of milestone
        flattenVerseObjects(object.children, words);
      } else {
        words.push(object);
      }
    }
  }
};
