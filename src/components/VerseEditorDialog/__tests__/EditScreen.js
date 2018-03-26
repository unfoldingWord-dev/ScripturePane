/* eslint-env jest */

import React from 'react';
import renderer from 'react-test-renderer';
import EditScreen from '../EditScreen';

describe('<EditScreen/>', () => {

  it('has text', () => {
    const wrapper = renderer.create(
      <EditScreen onChange={jest.fn()} verseText="verse text"/>
    );
    expect(wrapper).toMatchSnapshot();
  });

});
