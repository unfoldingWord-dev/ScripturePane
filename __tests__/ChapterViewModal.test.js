/* eslint-env jest */

import React from 'react';
import ChapterViewModal from '../src/components/ChapterViewModal';
import {shallow} from 'enzyme';
import {Modal} from 'react-bootstrap';

// Tests for ChapterViewModal React Component
describe('Test ChapterViewModal component',()=>{
  test('Tests that the modal\'s title is displayed', () => {
    const props = {
      onHide: jest.fn(),
      projectDetailsReducer: {
        manifest: {
          project: {
            name: 'My Book'
          }
        }
      }
    };
    const expectedTitle = props['projectDetailsReducer']['manifest']['project']['name'];
    const enzymeWrapper = shallow(<ChapterViewModal {...props} />);
    validateModalTitle(enzymeWrapper, expectedTitle);
  });
});

function validateModalTitle(enzymeWrapper, expectedTitle) {
  const titleHeader = enzymeWrapper.find(Modal.Title).render().find('h4');
  expect(titleHeader.length).toEqual(1);
  expect(titleHeader.html()).toContain(expectedTitle);
}
