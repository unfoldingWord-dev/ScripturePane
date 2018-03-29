import React from 'react';
import renderer from 'react-test-renderer';
// components
import WordDetails from '../src/components/WordDetails';

describe('WordDetails component', () => {
  const mock_translate = (text) => { return text; };
  test('renders correctly', () => {
    const props = {
      translate: mock_translate,
      word: {
        lemma: "καί",
        morph: "Gr,CC,,,,,,,,",
        strong: "G25320"
      },
      lexiconData: {
        'ugl': {
          '2532': {
            "brief": "and, even, also, namely",
            "long": "and, even, also, namely."
          }
        }
      }
    };
    const tree = renderer
      .create(<WordDetails {...props} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
