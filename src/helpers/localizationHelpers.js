import * as nonTranslatable from '../locale/nonTranslatable';
const translatable = require('../locale/English-en_US.json');

/**
 * lookup translation for text or key.  First looks for a static translation and then tries a dynamic translation
 * @param {Function} translate - translation function
 * @param {String} text - string or key to translate
 * @return {String} translated text
 */
export const getTranslation = function (translate, text) {
  let key = text.toLowerCase();
  if (key && (key.indexOf(' ') >= 0)) { // replace spaces with _
    key = key.split(' ').join('_');
  }
  let translation = nonTranslatable[key]; // check for static translation
  if (!translation && translate) { // if not found, try translation lookup
    const shouldHaveTranslation = translatable[key]; // if we should have a dynamic translation
    if (shouldHaveTranslation) {
      translation = translate(key);
    }
  }
  if (!translation || (translation.indexOf("Missing translation key") >= 0)) { // if not translated, return original text
    translation = text;
  }
  return translation;
};

/**
 * lookup translation for language.  Appends language code to translation to make it easier to identify
 * @param {Function} translate
 * @param {String} languageName
 * @param {String} languageCode
 * @return {String}
 */
export const getLanguageTranslation = (translate, languageName, languageCode) => {
  let translation = getTranslation(translate, languageName);
  if (languageCode) {
    translation += " (" + languageCode + ")"; 
  }
  return translation;
};
