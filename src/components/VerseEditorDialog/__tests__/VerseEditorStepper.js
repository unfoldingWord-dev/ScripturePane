/* eslint-env jest */

import React from 'react';
import VerseEditorStepper from '../VerseEditorStepper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {render} from 'enzyme';

describe('<VerseEditorStepper/>', () => {


  it('on first step', () => {
    const wrapper = render(
      <MuiThemeProvider>
        <VerseEditorStepper stepIndex={0} steps={['step 1', 'step 2']}/>
      </MuiThemeProvider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('on second step', () => {
    const wrapper = render(
      <MuiThemeProvider>
        <VerseEditorStepper stepIndex={1} steps={['step 1', 'step 2']}/>
      </MuiThemeProvider>
    );
    expect(wrapper).toMatchSnapshot();
  });

});
