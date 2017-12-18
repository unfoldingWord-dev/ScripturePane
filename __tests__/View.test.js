/* eslint-env jest */
import React from 'react';
import fs from 'fs-extra';
import View from '../src/components/View';
import renderer from 'react-test-renderer';
const project = '__tests__/fixtures/project/loadedProjectShortened.json';
jest.mock('react-dom', () => ({
  findDOMNode: () => {
    return {
      parentNode: {
          getBoundingClientRect: () => jest.fn()
      }
    };
  }
}));

describe('View component Tests', () => {
  it('before Project Loaded', () => {
    let projectState = fs.readJSONSync(project);
    const component = renderer.create(
      <View {...projectState} />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});