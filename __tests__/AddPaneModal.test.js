/* eslint-env jest */

import React from 'react';
import AddPaneModal from '../src/components/AddPaneModal';
import {mount, shallow} from 'enzyme';
import {Modal, FormControl} from 'react-bootstrap';

// Tests for ToolCardProgress React Component
describe('Test AddPaneModal component',()=>{
    test('Test "(Current project)" is in language select', () => {
      const props = {
        selectSourceLanguage: jest.fn(), 
        addPane: jest.fn(), 
        show: true, 
        onHide: jest.fn(), 
        selectedPane: false,
        resourcesReducer: {
            bibles: {
                'en_ulb': {
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
        }  
    };
    const expectedOptions = ['Select', 'English (Unlocked Literal Bible)', 'French (Current project)']; // expect options to have in the language select
    const enzymeWrapper = shallow(<AddPaneModal {...props} />);
    validateSelectOptions(enzymeWrapper, expectedOptions);
  });
});

function validateSelectOptions(enzymeWrapper, expectedOptions) {
    const options = enzymeWrapper.find('option');
    expect(options.length).toEqual(expectedOptions.length);
    for (let i = 0; i < options.length; i++) {
      const option = options.at(i);
      const optionText = option.text();
      expect(optionText).toEqual(expectedOptions[i]);
    }
  }
