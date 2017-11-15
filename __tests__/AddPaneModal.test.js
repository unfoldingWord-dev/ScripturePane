/* eslint-env jest */

import React from 'react';
import AddPaneModal from '../src/components/AddPaneModal';
import {shallow} from 'enzyme';

// Tests for AddPanelModal React Component
describe('Test AddPaneModal component',()=>{
  test('Test source is disabled in AddPanelModal if already selected', () => {
    const props = {
      selectSourceLanguage: jest.fn(), 
      addPane: jest.fn(), 
      show: true, 
      onHide: jest.fn(), 
      selectedPane: false,
      resourcesReducer: {
        bibles: {
          'ulb': {
            'manifest': {
              'language_name': 'English',
              'resource_title': 'Unlocked Literal Bible'
            }
          },
          'targetLanguage': {
            'manifest': {
              'language_name': 'French',
              'resource_title': 'My Bible'
            }
          }
        }
      },
      currentPaneSettings: ['ulb']
    };
    const expectedDisabled = props.currentPaneSettings; // expect these options to be disabled
    const enzymeWrapper = shallow(<AddPaneModal {...props} />);
    validateDisabledOptions(enzymeWrapper, expectedDisabled);
  });
});

function validateDisabledOptions(enzymeWrapper, expectedDisabled) {
  const options = enzymeWrapper.find('option');
  for (let i = 0; i < options.length; i++) {
    const option = options.at(i);
    if(expectedDisabled.includes(option.props().value)){
      expect(option.props().disabled).toBeTruthy();
    } else {
      expect(option.props().disabled).not.toBeTruthy();
    }
  }
}
