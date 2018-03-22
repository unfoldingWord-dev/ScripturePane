/* eslint-env jest */

import React from 'react';
import Pane from '../src/components/Pane';

// Tests for AddPanelModal React Component
describe('Test Pane behavior',()=>{
  test('Test book name and language layout.', () => {
    const props = {
      actions: {
        setToolSettings: () => {},
        getWordListForVerse: () => {},
        loadLexiconEntry: () => {},
        showPopover: () => {}
      },
      selectionsReducer: {},
      contextIdReducer: {
        "contextId":{
                "reference":{
                        "bookId":"mat","chapter":5,"verse":27},
                "tool":"translationWords",
                "groupId":"adultery",
                "quote":"adultery, adulterous, adulterer, adulteress, adulterers, adulteresses",
                "occurrence":1

        }
      },
      resourcesReducer: {
        "bibles":{
          "udt":{
            "1":{
              "1":"This is the record of the ancestors of Jesus the Messiah, " +
                  "the descendant of King David and of Abraham.",
              "2":"Abraham was the father of Isaac. " +
                  "Isaac was the father of Jacob. Jacob was the father of Judah and of his brothers."
            }
          }
        }
      },
      index: 2,
      bibleId: "udt",
      languageId: 'en',
      currentPaneSettings: ["targetLanguage","bhp","udt"],
      removePane: () => {}
    };
    let myPane = (
            <Pane {...props} />
    );
    expect(myPane).toMatchSnapshot();
  });
});
