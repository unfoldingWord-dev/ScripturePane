import * as stringHelpers from '../src/helpers/stringHelpers';
// constants
const expectedNestedChildren = [
  {
    "text": "good",
    "tag": "w",
    "type": "word",
    "occurrence": 1,
    "occurrences": 1
  },
  {
    "text": "for",
    "tag": "w",
    "type": "word",
    "occurrence": 1,
    "occurrences": 1
  },
  {
    "text": "him",
    "tag": "w",
    "type": "word",
    "occurrence": 2,
    "occurrences": 2
  }
];
const deepNestedMilestone = [[expectedNestedChildren]];
const notTooDeepNestedMilestone = [expectedNestedChildren];

describe('isWord()', () => {
  test('Returns true if given a word object', () => {
    const isWord = stringHelpers.isWord(
      {
        "text": "good",
        "tag": "w",
        "type": "word",
        "occurrence": 1,
        "occurrences": 1
      }
    );
    expect(isWord).toBeTruthy();
  });
  test('Returns false if given a string', () => {
    const isWord = stringHelpers.isWord('string');
    expect(isWord).toBeFalsy();
  });
});

describe('isNestedMilestone()', () => {
  test('Returns true if given deep nested milestone array', () => {
    const isNestedMilestone = stringHelpers.isNestedMilestone(notTooDeepNestedMilestone);
    expect(isNestedMilestone).toBeTruthy();
  });
  test('Returns false if given the wrong data array', () => {
    const isNestedMilestone = stringHelpers.isNestedMilestone([]);
    expect(isNestedMilestone).toBeFalsy();
  });
});

describe('isDeepNestedChild()', () => {
  test('Returns true if given deep nested milestone array', () => {
    const isDeepNestedChild = stringHelpers.isDeepNestedChild(deepNestedMilestone);
    expect(isDeepNestedChild).toBeTruthy();
  });
  test('Returns false if given the wrong data array', () => {
    const isDeepNestedChild = stringHelpers.isDeepNestedChild([]);
    expect(isDeepNestedChild).toBeFalsy();
  });
});

describe('punctuationWordSpacing()', () => {
  test('Supports hyphenated words (-)', () => {
    const punctuation = {
      "type": "text",
      "text": "-"
    };
    expect(stringHelpers.punctuationWordSpacing(punctuation)).toEqual('');
  });

  test('Supports commas (,)', () => {
    const punctuation = {
      "type": "text",
      "text": ","
    };
    expect(stringHelpers.punctuationWordSpacing(punctuation)).toEqual(' ');
  });

  test('Supports periods (.)', () => {
    const punctuation = {
      "type": "text",
      "text": "."
    };
    expect(stringHelpers.punctuationWordSpacing(punctuation)).toEqual(' ');
  });

  test("Supports apostrophes (')", () => {
    const punctuation = {
      "type": "text",
      "text": "'"
    };
    expect(stringHelpers.punctuationWordSpacing(punctuation)).toEqual('');
  });
});
