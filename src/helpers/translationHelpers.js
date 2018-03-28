import * as nonTranslatable from '../locale/nonTranslatable';
const translatable = require('../locale/English-en_US.json');

export const getTranslation = function (translate, text) {
  let key = text.toLowerCase();
  if (key && (key.indexOf(' ') >= 0)) { // replace spaces with _
    key = key.split(' ').join('_');
  }
  let translation = nonTranslatable[key]; // check for static translation
  if (!translation && translate) {
    const haveTranslation = translatable[key]; // if we should have a dynamic translation
    if (haveTranslation) { // if not found, try translation lookup
      translation = translate(key);
    }
  }
  if (!translation || (translation.indexOf("Missing translation key") >= 0)) { // if not translated, return original text
    translation = text;
  }
  return translation;
};

export const getLanguageTranslation = (translate, languageName, languageCode) => {
  let translation = getTranslation(translate, languageName);
  if (languageCode) {
    translation += " (" + languageCode + ")"; 
  }
  return translation
};
