/* eslint-env jest */

import React from 'react';
import AddPaneModal from '../src/components/AddPaneModal';
import {shallow} from 'enzyme';

// Tests for AddPanelModal React Component
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
          en: {
            ulb: {
              manifest: {
                language_name: 'English',
                resource_title: 'Unlocked Literal Bible'
              }
            }
          },
          targetLanguage: {
            targetBible: {
              manifest: {
                language_name: 'French',
                resource_title: 'My Bible'
              }
            }
          }
        }
      },
      currentPaneSettings: ['ulb']
    };
    const expectedOptions = ['Select', 'English (Unlocked Literal Bible)', 'French (Current project)']; // expect options to have in the language select
    const enzymeWrapper = shallow(<AddPaneModal {...props} />);
    validateSelectOptions(enzymeWrapper, expectedOptions);
  });

  test('Test source is disabled in AddPanelModal if already selected', () => {
    const props = {
      selectSourceLanguage: jest.fn(),
      addPane: jest.fn(),
      show: true,
      onHide: jest.fn(),
      selectedPane: false,
      resourcesReducer: {
        bibles: {
          en: {
            ulb: {
              manifest: {
                'language_name': 'English',
                'resource_title': 'Unlocked Literal Bible'
              }
            }
          },
          targetLanguage: {
            targetBible: {
              manifest: {
                language_name: 'French',
                resource_title: 'My Bible'
              }
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

function validateSelectOptions(enzymeWrapper, expectedOptions) {
  const options = enzymeWrapper.find('option');
  expect(options.length).toEqual(expectedOptions.length);
  for (let i = 0; i < options.length; i++) {
    const option = options.at(i);
    const optionText = option.text();
    expect(optionText).toEqual(expectedOptions[i]);
  }
}

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
