/* eslint-env jest */
import React from 'react';
import jest from 'jest';
import fs from 'fs-extra';
// import consts from '../src/js/actions/ActionTypes';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import View from '../src/components/View';
import renderer from 'react-test-renderer';
const project = '__tests__/fixtures/project/loadedProjectShortened.json';

describe('View component Tests', () => {
  let mockStore;
  beforeEach(() => {
    // create a new store instance for each test
    const middlewares = [thunk];
    mockStore = configureMockStore(middlewares);
  });
  it('before Project Loaded', () => {
    let projectState = fs.readJSONSync(project);
    const store = mockStore({
      ...projectState,
      actions: {
        showPopover: () => jest.fn()
      }
    });
    let state = store.getState();
    const component = renderer.create(
      <View {...state} />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();


    // store.dispatch({
    //   type: consts.UPDATE_SOURCE_PROJECT_PATH,
    //   sourceProjectPath: project
    // });
    // store.dispatch({
    //   type: consts.UPDATE_SELECTED_PROJECT_FILENAME,
    //   selectedProjectFilename: "abu_tit_text_reg"
    // });

    // store.dispatch(LocalImportWorkflowActions.localImport());

    // tree = component.toJSON();
    // expect(tree).toMatchSnapshot();
  });
});