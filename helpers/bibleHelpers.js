
export const bibleIdFromSourceName = (sourceName) => {
  let bibleId;
  switch (sourceName) {
    case 'gatewayLanguage':
      bibleId = 'ulb-en';
      break;
    case 'originalLanguage':
      bibleId = 'ugnt';
      break;
    case 'UDB':
      bibleId = 'udb-en';
      break;
    default:
      bibleId = 'targetLanguage';
      break;
  }
  return bibleId
}
