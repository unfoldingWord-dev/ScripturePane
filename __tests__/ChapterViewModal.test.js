/* eslint-env jest */

import React from 'react';
import ChapterViewModal from '../src/components/ChapterViewModal';
import { shallow } from 'enzyme';
import { Modal } from 'react-bootstrap';

// Tests for ChapterViewModal React Component
describe('Test ChapterViewModal component', () => {
  test('Tests that the modal\'s title is displayed', () => {
    const props = {
      show: true,
      onHide: jest.fn(),
      show: true,
      projectDetailsReducer: {
        manifest: {
          project: {
            name: 'My Book'
          }
        }
      },
      contextIdReducer: {},
      resourcesReducer: {},
    };
    const expectedTitle = props['projectDetailsReducer']['manifest']['project']['name'];
    const enzymeWrapper = shallow(<ChapterViewModal {...props} />);
    validateModalTitle(enzymeWrapper, expectedTitle);
  });
});

function validateModalTitle(enzymeWrapper, expectedTitle) {
  let titleHeader = enzymeWrapper.find(Modal.Title);
  expect(titleHeader.length).toEqual(1);
  expect(enzymeWrapper.find(Modal.Title).props().children[0]).toEqual(expectedTitle);
}
