/* eslint-env jest */

import React from 'react';
import VerseEditor, {isNextEnabled} from '../VerseEditor';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {render} from 'enzyme';

describe('<VerseEditor/>', () => {


  it('renders', () => {
    const wrapper = render(
      <MuiThemeProvider>
        <VerseEditor translate={k=>k}
                     onCancel={jest.fn()}
                     onSubmit={jest.fn()}
                     verseText="verse text" />
      </MuiThemeProvider>
    );
    expect(wrapper).toMatchSnapshot();
  });

});

describe('isNextEnabled', () => {
  it('is has not changed', () => {
    const state = {
      stepIndex: 0,
      verseChanged: false,
      newVerse: 'verse',
      reasons: ['reason']
    };
    const result = isNextEnabled(state);
    expect(result).toEqual(false);
  });

  it('has an empty verse', () => {
    const state = {
      stepIndex: 0,
      verseChanged: true,
      newVerse: '',
      reasons: ['reason']
    };
    const result = isNextEnabled(state);
    expect(result).toEqual(false);
  });

  it('has a null verse', () => {
    const state = {
      stepIndex: 0,
      verseChanged: true,
      newVerse: null,
      reasons: ['reason']
    };
    const result = isNextEnabled(state);
    expect(result).toEqual(false);
  });

  it('has no reasons on step 1', () => {
    const state = {
      stepIndex: 0,
      verseChanged: true,
      newVerse: 'verse',
      reasons: []
    };
    const result = isNextEnabled(state);
    expect(result).toEqual(true);
  });

  it('has no reasons on step 2', () => {
    const state = {
      stepIndex: 1,
      verseChanged: true,
      newVerse: 'verse',
      reasons: []
    };
    const result = isNextEnabled(state);
    expect(result).toEqual(false);
  });

  it('has unknown step index', () => {
    const state = {
      stepIndex: 8,
      verseChanged: true,
      newVerse: 'verse',
      reasons: ['reason']
    };
    const result = isNextEnabled(state);
    expect(result).toEqual(false);
  });

});
