/* eslint-env jest */

import React from 'react';
import Verse from '../src/components/Verse';
import renderer from 'react-test-renderer';

// Tests for Verse React Component
describe('Test Verse component',()=>{
  test('Test when verse is null that the WARNING placeholder is displayed', () => {
    const props = {
      verseText: null,
      chapter: 1,
      translate: k=>k,
      verse: 1,
      resourcesReducer: {},
      direction: 'ltr',
      isCurrent: true,
      selectionsReducer: {
        selections: []
      },
      contextIdReducer: {
        contextId: {}
      },
      actions: {
        setToolSettings: () => {},
        getWordListForVerse: () => {},
        loadLexiconEntry: () => {},
        showPopover: () => {},
        getLexiconData: () => {}
      }
    };
    const wrapper = renderer.create(<Verse {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('Test when verse is empty string that the WARNING placeholder is displayed', () => {
    const props = {
      verseText: '',
      chapter: 1,
      verse: 1,
      translate: k=>k,
      resourcesReducer: {},
      direction: 'ltr',
      isCurrent: true,
      selectionsReducer: {
        selections: []
      },
      contextIdReducer: {
        contextId: {}
      },
      actions: {
        setToolSettings: () => {},
        getWordListForVerse: () => {},
        loadLexiconEntry: () => {},
        showPopover: () => {},
        getLexiconData: () => {}
      }
    };
    const wrapper = renderer.create(<Verse {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('Test when verse is not null that the verse is displayed', () => {
    const props = {
      verseText: 'Jesus wept',
      chapter: 11,
      verse: 35,
      translate: k=>k,
      resourcesReducer: {},
      direction: 'ltr',
      isCurrent: true,
      selectionsReducer: {
        selections: []
      },
      contextIdReducer: {
        contextId: {}
      },
      actions: {
        setToolSettings: () => {},
        getWordListForVerse: () => {},
        loadLexiconEntry: () => {},
        showPopover: () => {},
        getLexiconData: () => {}
      }
    };
    const wrapper = renderer.create(<Verse {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('Test that USFM is stripped out', () => {
    const props = {
      verseText: 'Also, we are writing these things to you so that our joy will be complete. \\f + \\ft Some older versions read, \\fqa And we are writing these things to you so that your joy will be complete \\fqa* . \\f*\n\n\\s5\n\\p\n\\q1\n',
      chapter: 1,
      verse: 1,
      translate: k=>k,
      resourcesReducer: {},
      direction: 'ltr',
      isCurrent: true,
      selectionsReducer: {
        selections: []
      },
      contextIdReducer: {
        contextId: {}
      },
      actions: {
        setToolSettings: () => {},
        getWordListForVerse: () => {},
        loadLexiconEntry: () => {},
        showPopover: () => {},
        getLexiconData: () => {}
      }
    };
    const wrapper = renderer.create(<Verse {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('Test when verse is verseObject that the verse is displayed', () => {
    const props = {
      verseText: [
        {
          type: 'text',
          text: 'Jesus wept.'
        }
      ],
      chapter: 11,
      verse: 35,
      translate: k=>k,
      direction: 'ltr',
      isCurrent: true,
      resourcesReducer: {},
      selectionsReducer: {
        selections: []
      },
      contextIdReducer: {
        contextId: {}
      },
      actions: {
        getWordListForVerse: mock_getWordListForVerse,
        setToolSettings: () => {},
        loadLexiconEntry: () => {},
        showPopover: () => {},
        getLexiconData: () => {}
      },
    };
    const wrapper = renderer.create(<Verse {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('Verse.js', () => {
  it('renders correctly', () => {
    const props = {
      verseText: 'Jesus wept',
      chapter: 11,
      verse: 35,
      translate: k=>k,
      direction: 'ltr',
      resourcesReducer: {},
      isCurrent: true,
      selectionsReducer: {
        selections: []
      },
      contextIdReducer: {
        contextId: {}
      },
      actions: {
        setToolSettings: () => {},
        getWordListForVerse: () => {},
        loadLexiconEntry: () => {},
        showPopover: () => {},
        getLexiconData: () => {}
      }
    };
    const tree = renderer
      .create(<Verse {...props} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

//
// helpers
//

export const mock_getWordListForVerse = (verse) => {
  return verse;
};
