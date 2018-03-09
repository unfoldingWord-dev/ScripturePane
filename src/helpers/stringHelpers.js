
export const isWord = (word => {
  return (typeof word !== 'string') && (word.word || (word.type === 'word'));
});

export const isNestedMilestone = word => {
  let deepNestedChild = false;
  if (word[0] && word[0][0]) deepNestedChild = word[0][0].type === 'word';
  return Array.isArray(word) && word.length > 0 && word[0].type === 'word' || deepNestedChild;
};
