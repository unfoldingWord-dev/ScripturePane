
export const isWord = (word => {
  return (typeof word !== 'string') && (word.word || (word.type === 'word'));
});
