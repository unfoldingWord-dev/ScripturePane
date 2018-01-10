
export const bibleIdFromSourceName = (sourceName) => {
  let bibleId;
  switch (sourceName) {
    case 'gatewayLanguage':
      bibleId = 'ulb';
      break;
    case 'originalLanguage':
      bibleId = 'ugnt';
      break;
    case 'UDB':
      bibleId = 'udb';
      break;
    default:
      bibleId = 'targetLanguage';
      break;
  }
  return bibleId;
};
