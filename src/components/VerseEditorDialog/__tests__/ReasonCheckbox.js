/* eslint-env jest */
import React from 'react';
import ReasonCheckbox from '../ReasonCheckbox';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {render} from 'enzyme';

describe('<ReasonCheckbox/>', () => {

  it('unselected', () => {
    const wrapper = render(
      <MuiThemeProvider>
        <ReasonCheckbox label="Label" onCheck={jest.fn()} reason="reason"/>
      </MuiThemeProvider>
    );
    expect(wrapper).toMatchSnapshot();
  });

});
