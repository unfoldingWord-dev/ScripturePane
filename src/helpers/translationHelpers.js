export const getTranslation = (translate, text) => {
  let text_lc = text.toLowerCase();
  switch (text_lc) {
    case "greek": // languages to localize
      break;
      
    default: // other languages look for static translation
      text_lc = '_.' + text_lc.replace(' ', '_');
  }
  let translation = translate(text_lc);
  if (translation.indexOf("Missing translation key") >= 0) { // if not translated, return original text
    translation = text;
  }
  return translation;
};
