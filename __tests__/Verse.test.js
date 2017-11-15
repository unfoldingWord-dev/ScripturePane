/* eslint-env jest */

import React from 'react';
import Verse, {PLACE_HOLDER_TEXT} from '../src/components/Verse';
import {mount} from 'enzyme';

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
});

function validateVerse(enzymeWrapper, expectedText) {
  const verseDiv = enzymeWrapper.find('div');
  expect(verseDiv.length).toEqual(1);
  expect(verseDiv.text()).toEqual(expectedText);
}
