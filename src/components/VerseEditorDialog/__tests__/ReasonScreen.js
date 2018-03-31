/* eslint-env jest */

jest.mock('../ReasonCheckbox');
import React from 'react';
import ReasonScreen, {updateReasons} from '../ReasonScreen';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {render} from 'enzyme';

describe('<ReasonScreen/>', () => {
  it('has no selections', () => {
    const wrapper = render(
      <MuiThemeProvider>
        <ReasonScreen selectedReasons={[]} onChange={jest.fn()} translate={k=>k}/>
      </MuiThemeProvider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('has selections', () => {
    const wrapper = render(
      <MuiThemeProvider>
        <ReasonScreen selectedReasons={['spelling']} onChange={jest.fn()} translate={k=>k}/>
      </MuiThemeProvider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});

describe('updateReasons',  () => {
  it('is newly checked', () => {
    const reasons = updateReasons('spelling', true, ['context']);
    expect(reasons).toEqual(['context', 'spelling']);
  });
  it('is already checked', () => {
    const reasons = updateReasons('spelling', true, ['context', 'spelling']);
    expect(reasons).toEqual(['context', 'spelling']);
  });
  it('is newly un-checked', () => {
    const reasons = updateReasons('spelling', false, ['spelling', 'context']);
    expect(reasons).toEqual(['context']);
  });
  it('is already un-checked', () => {
    const reasons = updateReasons('spelling', false, ['context']);
    expect(reasons).toEqual(['context']);
  });
  it('is the only checked', () => {
    const reasons = updateReasons('spelling', true, []);
    expect(reasons).toEqual(['spelling']);
  });
  it('is completely un-checked', () => {
    const reasons = updateReasons('spelling', false, []);
    expect(reasons).toEqual([]);
  });
});
