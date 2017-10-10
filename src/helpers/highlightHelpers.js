import XRegExp from 'xregexp';
/**
 * @description - checks to see if the quote is in the verse
 * @param {String} verse - verse to look for the quote in
 * @param {String} quote - quote to look for in the verse
 */
export const isQuoteInVerse = (verse, quote) => {
  const regex = XRegExp('(?:^|\\PL)' + quote + '(?:$|\\PL)', 'g');
  const matches = verse.match(regex);
  return !!matches;
};
